import type { Config, Context } from "@netlify/edge-functions";

const EMBEDS: Record<string, string> = {
  "/embed/swp-v1/services": "https://second-wind-pro.netlify.app",
  "/embed/swp-v2/services": "https://second-wind-pro-v2.netlify.app",
};

function isolateCss(isV2: boolean) {
  // Hide page-level chrome only. Never display:none descendants of #services —
  // v2 tabs/panels toggle hidden/is-active themselves, and JS may move nodes.
  const hidePageSiblings = `
body > header,
body > footer,
body > .skip-link,
body > .nav-header,
body > .modal-overlay,
body > #modal {
  display: none !important;
}
main > *:not(#services) {
  display: none !important;
}
#services {
  display: block !important;
  visibility: visible !important;
  border: 0 !important;
  --svc-nav-offset: 0px;
  --svc-nav-height: 0px;
  --svc-nav-gap: 0px;
}
`;

  if (isV2) {
    return `
html {
  margin: 0 !important;
  padding: 0 !important;
  background: #0d0e1a;
  overflow-x: clip;
}
body {
  margin: 0 !important;
  padding: 0 !important;
  min-height: 0 !important;
  background: #0d0e1a;
}
main {
  padding: 0 !important;
  margin: 0 !important;
  overflow: visible !important;
  height: auto !important;
}
${hidePageSiblings}
#services {
  padding: 24px var(--gutter, 40px) 0 !important;
  margin: 0 !important;
  width: 100% !important;
  max-width: none !important;
}
#services .section-head {
  display: block !important;
  visibility: visible !important;
}
.svc-stack-inner {
  top: 0 !important;
}
`;
  }

  return `
html, body {
  margin: 0 !important;
  padding: 0 !important;
  height: 100% !important;
  min-height: 0 !important;
  overflow: hidden !important;
  overscroll-behavior: none;
  background: #0c0814;
}
main {
  height: 100% !important;
  overflow: hidden !important;
  padding: 0 !important;
  margin: 0 !important;
}
${hidePageSiblings}
#services,
#services.services {
  height: 100% !important;
  min-height: 100% !important;
  width: 100% !important;
  max-width: none !important;
  overflow: hidden !important;
  padding: 0 !important;
  margin: 0 !important;
  position: relative !important;
}
.services-head {
  display: flex !important;
  top: 20px !important;
  left: 28px !important;
  right: 28px !important;
}
.services-track,
#servicesTrack {
  display: flex !important;
  padding: 72px 28px 36px !important;
  gap: 28px !important;
}
.service-card {
  width: 520px !important;
  height: min(600px, calc(100% - 96px)) !important;
}
.services-progress {
  display: block !important;
  left: 28px !important;
  right: 28px !important;
  bottom: 24px !important;
}
`;
}

function isolateLiveSection(html: string, origin: string) {
  const originUrl = origin.replace(/\/$/, "");
  const isV2 = /second-wind-pro-v2/.test(originUrl);
  let out = html;

  out = out.replace(
    /(href|src|action|poster)=(["'])\/(?!\/)/gi,
    `$1=$2${originUrl}/`,
  );
  out = out.replace(/(\ssrcset=["'])([^"']*)(["'])/gi, (_m, pre, value, post) => {
    return pre + value.replace(/(^|,\s*)\//g, `$1${originUrl}/`) + post;
  });

  const baseTag = `<base href="${originUrl}/">`;
  if (/<base\s/i.test(out)) {
    out = out.replace(/<base\s[^>]*>/gi, baseTag);
  } else {
    out = out.replace(/<head([^>]*)>/i, `<head$1>\n  ${baseTag}`);
  }

  const rootSel = "#services";
  const inject = `<style id="swp-embed-isolate">${isolateCss(isV2)}</style>
<script id="swp-embed-lock">
(function () {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  function pin() {
    if (${isV2 ? "true" : "false"}) window.scrollTo(0, 0);
    document.querySelectorAll('video').forEach(function (v) {
      if (v.closest('${rootSel}')) return;
      try { v.pause(); } catch (e) {}
      v.removeAttribute('autoplay');
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', pin);
  } else {
    pin();
  }
  window.addEventListener('click', function (e) {
    var a = e.target && e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href === '#' || href.indexOf('javascript:') === 0) return;
    if (href.charAt(0) === '#') {
      var el = document.getElementById(href.slice(1));
      if (el && el.closest('${rootSel}')) return;
    }
    e.preventDefault();
    e.stopPropagation();
  }, true);
})();
</script>`;

  if (/<\/head>/i.test(out)) {
    out = out.replace(/<\/head>/i, `${inject}</head>`);
  } else {
    out = inject + out;
  }
  return out;
}

export default async (req: Request, _context: Context) => {
  const url = new URL(req.url);
  const origin = EMBEDS[url.pathname];
  if (!origin) {
    return new Response("Not found", { status: 404 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${origin}/`, {
      headers: {
        Accept: "text/html",
        "User-Agent": req.headers.get("user-agent") || "SWP-Services-Embed",
      },
      redirect: "follow",
    });
  } catch {
    return new Response("Upstream unavailable", { status: 502 });
  }

  if (!upstream.ok) {
    return new Response("Upstream error", { status: 502 });
  }

  const html = isolateLiveSection(await upstream.text(), origin);
  const headers = new Headers({
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "public, max-age=60",
    "X-Robots-Tag": "noindex",
  });

  return new Response(html, { status: 200, headers });
};

export const config: Config = {
  path: ["/embed/swp-v1/services", "/embed/swp-v2/services"],
  cache: "manual",
};
