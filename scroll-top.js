(function () {
    var HIDE_ON = ['home-page', 'backyard-page'];

    function shouldShow() {
        var body = document.body;
        if (!body) return false;
        for (var i = 0; i < HIDE_ON.length; i++) {
            if (body.classList.contains(HIDE_ON[i])) return false;
        }
        return true;
    }

    var BTN_STYLE =
        'position:fixed!important;bottom:30px!important;right:30px!important;' +
        'z-index:2147483647!important;display:flex!important;opacity:1!important;' +
        'visibility:visible!important;pointer-events:auto!important;width:60px;height:40px;' +
        'background:#fff;border:1px solid #e0e0e0;border-radius:8px;' +
        'box-shadow:0 4px 12px rgba(0,0,0,0.1);cursor:pointer;align-items:center;' +
        'justify-content:center;font-size:18px;line-height:1;margin:0;padding:0;font-family:inherit;';

    function cleanupLegacy() {
        var legacy = document.getElementById('back-to-top');
        if (legacy) legacy.remove();
        var sentinel = document.querySelector('.back-to-top-sentinel');
        if (sentinel) sentinel.remove();
    }

    function ensureScrollTop() {
        cleanupLegacy();
        if (!shouldShow()) {
            var existing = document.getElementById('scroll-top-btn');
            if (existing) existing.remove();
            return;
        }

        var btn = document.getElementById('scroll-top-btn');
        if (!btn) {
            btn = document.createElement('button');
            btn.id = 'scroll-top-btn';
            btn.className = 'scroll-top-btn';
            btn.type = 'button';
            btn.setAttribute('aria-label', 'Back to top');
            btn.textContent = '\u2B06\uFE0F';
            btn.addEventListener('click', function () {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        btn.style.cssText = BTN_STYLE;
        document.documentElement.appendChild(btn);
    }

    ensureScrollTop();
    document.addEventListener('DOMContentLoaded', ensureScrollTop);
    window.addEventListener('load', ensureScrollTop);
    setTimeout(ensureScrollTop, 0);
    setTimeout(ensureScrollTop, 100);
})();
