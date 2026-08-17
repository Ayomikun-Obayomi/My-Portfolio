import type { Config, Context } from "@netlify/edge-functions";

const EMBEDS: Record<string, string> = {
  "/embed/swp-v1/home": "https://second-wind-pro.netlify.app",
  "/embed/swp-v1/services": "https://second-wind-pro.netlify.app",
  "/embed/swp-v2/services": "https://second-wind-pro-v2.netlify.app",
};

function isolateCss(isV2: boolean) {
  // Hide page-level chrome only. Never display:none descendants of #services —
  // v2 tabs/panels toggle hidden/is-active themselves, and JS may move nodes.
  // v1 keeps the live sticky `.nav` so the services crop matches visiting #services.
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
  ${isV2
    ? `--svc-nav-offset: 0px;
  --svc-nav-height: 0px;
  --svc-nav-gap: 0px;`
    : `--svc-nav-offset: 88px;
  --svc-nav-height: 76px;
  --svc-nav-gap: 12px;`}
}
`;

  // Desktop isolation keeps the laptop-crop layout. Below 981px (SWP's own
  // mobile breakpoint) leave live CSS alone so cards/tabs match the phone site.
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
@media (min-width: 981px) {
  #services {
    padding: 24px var(--gutter, 40px) 0 !important;
  }
}
`;
  }

  return `
html, body {
  margin: 0 !important;
  padding: 0 !important;
  min-height: 0 !important;
  overscroll-behavior: none;
  background: #0c0814;
}
main {
  padding: 0 !important;
  margin: 0 !important;
}
${hidePageSiblings}
#services,
#services.services {
  width: 100% !important;
  max-width: none !important;
  margin: 0 !important;
}
body > .nav {
  display: flex !important;
  visibility: visible !important;
}
@media (min-width: 981px) {
  html, body {
    height: 100% !important;
    overflow: hidden !important;
  }
  main {
    height: 100% !important;
    overflow: hidden !important;
  }
  #services,
  #services.services {
    height: 100% !important;
    min-height: 100% !important;
    overflow: hidden !important;
  }
}
@media (max-width: 980px) {
  html, body {
    overflow-x: clip !important;
  }
}
`;
}

function rewriteAssetUrls(html: string, originUrl: string) {
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
  return out;
}

function injectHead(html: string, inject: string) {
  if (/<\/head>/i.test(html)) {
    return html.replace(/<\/head>/i, `${inject}</head>`);
  }
  return inject + html;
}

const V1_MOBILE_CSS_FALLBACK = `
.skip-link { display: none !important; }
html { scroll-behavior: auto !important; }
.swp-embed-nav-toggle { display: none !important; }
html, body { overflow-x: clip; }
html.swp-embed-v1-services .nav {
  padding: 14px 40px;
  background: rgba(10, 7, 16, 0.92);
}
@media (min-width: 981px) {
  html.swp-embed-v1-services .services-head { top: 80px; }
}
`;

async function loadV1MobileCss(req: Request) {
  try {
    const cssUrl = new URL("/embed/swp-v1-mobile.css", req.url);
    const res = await fetch(cssUrl.toString(), { headers: { Accept: "text/css" } });
    if (res.ok) return await res.text();
  } catch {
    // Studio or a cold origin may not serve the file; use the compact fallback.
  }
  return V1_MOBILE_CSS_FALLBACK;
}

function v1HomeMobileScript() {
  return `<script id="swp-embed-home-lock">
(function () {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  function pin() {
    if (location.hash) {
      try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    }
    window.scrollTo(0, 0);
  }
  pin();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', pin);
  }
  window.addEventListener('load', pin);
  window.addEventListener('hashchange', pin);

  function lockServices() {
    if (window.innerWidth > 980) return;
    var track = document.getElementById('servicesTrack');
    if (track) {
      track.style.transform = 'none';
      track.style.willChange = 'auto';
    }
  }
  lockServices();
  window.addEventListener('resize', lockServices);
  setInterval(lockServices, 400);

  function mountNav() {
    var nav = document.querySelector('.nav');
    if (!nav || nav.querySelector('.swp-embed-nav-toggle')) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'swp-embed-nav-toggle';
    btn.setAttribute('aria-label', 'Open menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span></span><span></span><span></span>';
    nav.appendChild(btn);
    function close() {
      document.body.classList.remove('swp-embed-nav-open');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Open menu');
    }
    btn.addEventListener('click', function () {
      var open = document.body.classList.toggle('swp-embed-nav-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('ul a')) close();
    });
    if (window.matchMedia) {
      var mq = window.matchMedia('(max-width: 980px)');
      var onChange = function (e) { if (!e.matches) close(); };
      if (mq.addEventListener) mq.addEventListener('change', onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountNav);
  } else {
    mountNav();
  }
})();
</script>`;
}

function frameV1Home(html: string, origin: string, css: string) {
  const originUrl = origin.replace(/\/$/, "");
  // Desktop: laptop crop (~1440×800) so 100vh matches live composition.
  // Phone: overlay compact layout in the ~375px iframe only.
  const inject = `<style id="swp-embed-home">${css || V1_MOBILE_CSS_FALLBACK}</style>
${v1HomeMobileScript()}`;

  return injectHead(rewriteAssetUrls(html, originUrl), inject);
}

function isolateLiveSection(html: string, origin: string, extraCss = "", extraScript = "") {
  const originUrl = origin.replace(/\/$/, "");
  const isV2 = /second-wind-pro-v2/.test(originUrl);
  let out = rewriteAssetUrls(html, originUrl);

  const rootSel = "#services";
  const overlay = extraCss
    ? `<style id="swp-embed-home">${extraCss}</style>
<script>document.documentElement.classList.add('swp-embed-v1-services');</script>${extraScript}`
    : "";
  const inject = `<style id="swp-embed-isolate">${isolateCss(isV2)}</style>
${overlay}
<script id="swp-embed-lock">
(function () {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  function pin() {
    window.scrollTo(0, 0);
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

  return injectHead(out, inject);
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

  const source = await upstream.text();
  let html: string;
  if (url.pathname === "/embed/swp-v1/home") {
    html = frameV1Home(source, origin, await loadV1MobileCss(req));
  } else if (url.pathname === "/embed/swp-v1/services") {
    html = isolateLiveSection(
      source,
      origin,
      await loadV1MobileCss(req),
      v1HomeMobileScript(),
    );
  } else {
    html = isolateLiveSection(source, origin);
  }
  const headers = new Headers({
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "public, max-age=60",
    "X-Robots-Tag": "noindex",
  });

  return new Response(html, { status: 200, headers });
};

export const config: Config = {
  path: ["/embed/swp-v1/home", "/embed/swp-v1/services", "/embed/swp-v2/services"],
  cache: "manual",
};
