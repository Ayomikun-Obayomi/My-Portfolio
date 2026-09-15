// Image Modal Functionality
function openImageModal(imageElement) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    modal.style.display = 'block';
    document.body.classList.add('image-modal-open');
    modalImg.src = imageElement.src;
    modalImg.alt = imageElement.alt;
    
    // Show caption if it exists in data-caption attribute
    const caption = imageElement.getAttribute('data-caption');
    if (caption && modalCaption) {
        modalCaption.textContent = caption;
        modalCaption.style.display = 'block';
    } else if (modalCaption) {
        modalCaption.style.display = 'none';
    }
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.classList.remove('image-modal-open');
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the image
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeImageModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal && modal.style.display === 'block') {
            closeImageModal();
        }
    });

    // Home: smooth-scroll from hero to #work (instant if reduced motion)
    const homeWorkSection = document.getElementById('work');

    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function scrollToWork() {
        if (!homeWorkSection) return;
        const behavior = prefersReducedMotion() ? 'auto' : 'smooth';
        const margin = parseFloat(getComputedStyle(homeWorkSection).scrollMarginTop) || 0;
        const top = homeWorkSection.getBoundingClientRect().top + window.pageYOffset - margin;
        window.scrollTo({ top: Math.max(0, top), behavior });
    }

    function linkTargetsHomeWork(anchor) {
        const href = anchor.getAttribute('href') || '';
        if (href === '#work') return true;
        try {
            const url = new URL(href, window.location.href);
            return url.hash === '#work' && url.origin === window.location.origin;
        } catch (err) {
            return /#work$/.test(href);
        }
    }

    if (homeWorkSection) {
        const workFilter = homeWorkSection.querySelector('.work-filter');
        const workFilterTabs = workFilter
            ? Array.from(workFilter.querySelectorAll('[role="tab"]'))
            : [];
        const workCards = Array.from(homeWorkSection.querySelectorAll('.project-card'));
        const workFilterStatus = document.getElementById('work-filter-status');
        const workFilterLabels = {
            all: 'Showing all work.',
            product: 'Showing product design work.',
            brand: 'Showing brand and web design work.'
        };

        function selectWorkFilter(tab, { focus } = {}) {
            if (!tab || !workFilterTabs.length) return;
            const filter = tab.getAttribute('data-work-filter') || 'all';

            workFilterTabs.forEach((item) => {
                const on = item === tab;
                item.setAttribute('aria-selected', on ? 'true' : 'false');
                item.tabIndex = on ? 0 : -1;
            });

            workCards.forEach((card) => {
                const group = card.getAttribute('data-work-group');
                card.hidden = !(filter === 'all' || group === filter);
            });

            if (workFilterStatus) {
                workFilterStatus.textContent = workFilterLabels[filter] || workFilterLabels.all;
            }

            if (focus) tab.focus();
        }

        if (workFilter && workFilterTabs.length) {
            workFilter.addEventListener('click', (event) => {
                const tab = event.target.closest('[role="tab"]');
                if (!tab || !workFilter.contains(tab)) return;
                selectWorkFilter(tab);
            });

            workFilter.addEventListener('keydown', (event) => {
                const tab = event.target.closest('[role="tab"]');
                if (!tab || !workFilter.contains(tab)) return;
                const index = workFilterTabs.indexOf(tab);
                if (index === -1) return;

                let next = null;
                if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                    next = workFilterTabs[(index + 1) % workFilterTabs.length];
                } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                    next = workFilterTabs[(index - 1 + workFilterTabs.length) % workFilterTabs.length];
                } else if (event.key === 'Home') {
                    next = workFilterTabs[0];
                } else if (event.key === 'End') {
                    next = workFilterTabs[workFilterTabs.length - 1];
                }

                if (!next) return;
                event.preventDefault();
                selectWorkFilter(next, { focus: true });
            });
        }

        document.addEventListener('click', (event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            const anchor = event.target.closest && event.target.closest('a[href]');
            if (!anchor || !linkTargetsHomeWork(anchor)) return;
            event.preventDefault();
            if (window.location.hash !== '#work') {
                history.pushState(null, '', '#work');
            }
            scrollToWork();
        });

        window.addEventListener('hashchange', () => {
            if (window.location.hash === '#work') scrollToWork();
        });

        if (window.__homeScrollToWork || window.location.hash === '#work') {
            window.__homeScrollToWork = false;
            if (window.location.hash !== '#work') {
                history.replaceState(null, '', '#work');
            }
            window.scrollTo(0, 0);
            requestAnimationFrame(function () {
                requestAnimationFrame(scrollToWork);
            });
        }
    }
    
    // Ayo — inline pronunciation + meaning panel
    const ayoListenBtn = document.querySelector('.hero__ayo-btn--listen');
    const ayoMeaningBtn = document.getElementById('hero-ayo-meaning-btn');
    const ayoMeaningPanel = document.getElementById('hero-ayo-meaning');
    const ayoWrap = document.querySelector('.hero__ayo');
    const ayoAudioClip = document.querySelector('.hero-ayo-pop__clip');

    function playAyoPronunciation() {
        if (!ayoAudioClip) return;
        ayoAudioClip.currentTime = 0;
        const playPromise = ayoAudioClip.play();
        if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => {});
        }
    }

    function setAyoMeaningOpen(open) {
        if (!ayoMeaningPanel || !ayoMeaningBtn) return;
        ayoMeaningPanel.hidden = !open;
        ayoMeaningBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    if (ayoListenBtn && ayoAudioClip) {
        ayoListenBtn.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            playAyoPronunciation();
        });

        ayoAudioClip.addEventListener('play', () => {
            ayoListenBtn.classList.add('is-playing');
        });

        ayoAudioClip.addEventListener('ended', () => {
            ayoListenBtn.classList.remove('is-playing');
        });

        ayoAudioClip.addEventListener('pause', () => {
            if (ayoAudioClip.currentTime === 0 || ayoAudioClip.ended) {
                ayoListenBtn.classList.remove('is-playing');
            }
        });
    }

    if (ayoMeaningBtn && ayoMeaningPanel) {
        ayoMeaningBtn.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            setAyoMeaningOpen(ayoMeaningPanel.hidden);
        });
    }

    document.addEventListener('click', (event) => {
        if (!ayoMeaningPanel || ayoMeaningPanel.hidden || !ayoWrap) return;
        if (!ayoWrap.contains(event.target)) {
            setAyoMeaningOpen(false);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && ayoMeaningPanel && !ayoMeaningPanel.hidden) {
            setAyoMeaningOpen(false);
            ayoMeaningBtn?.focus();
        }
    });

    // Hero 3D scene — subtle mouse parallax (desktop only)
    const heroSection = document.getElementById('hero');
    const heroSceneStage = document.getElementById('heroSceneStage');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (heroSection && heroSceneStage && !prefersReducedMotion() && finePointer) {
        heroSection.addEventListener('mousemove', (event) => {
            const rect = heroSection.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            heroSceneStage.style.transform =
                `rotateY(${x * 14}deg) rotateX(${y * -10}deg)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            heroSceneStage.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    }
    
});

// Before/After Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.before-after-container');
    if (!slider) return;

    const afterImage = slider.querySelector('.slider-after');
    const sliderHandle = slider.querySelector('.slider-handle');
    let isDragging = false;

    // Initialize slider to show both images split 50/50
    // Exploration 2 (before) on left, Exploration 3 (after) on right
    if (afterImage && sliderHandle) {
        afterImage.style.clipPath = `polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)`;
        sliderHandle.style.left = '50%';
    }

    function updateSlider(x) {
        const rect = slider.getBoundingClientRect();
        const percentage = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
        
        // Simple logic: afterImage clip-path follows the slider position
        // 0% = no after image visible (only before), 100% = full after image visible
        afterImage.style.clipPath = `polygon(${percentage}% 0%, 100% 0%, 100% 100%, ${percentage}% 100%)`;
        sliderHandle.style.left = percentage + '%';
    }

    // Mouse events
    slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        slider.style.cursor = 'grabbing';
        updateSlider(e.clientX);
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            requestAnimationFrame(() => updateSlider(e.clientX));
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        slider.style.cursor = 'ew-resize';
    });

    // Touch events for mobile
    slider.addEventListener('touchstart', (e) => {
        isDragging = true;
        updateSlider(e.touches[0].clientX);
        e.preventDefault();
    });

    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            requestAnimationFrame(() => updateSlider(e.touches[0].clientX));
            e.preventDefault();
        }
    });

    document.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Click to move slider
    slider.addEventListener('click', (e) => {
        if (!isDragging) {
            updateSlider(e.clientX);
        }
    });
});

// In-page case study TOC — scroll-spy + smooth scroll
(function initCaseStudyOutline() {
    function hashId(href) {
        if (!href) return '';
        const idx = href.lastIndexOf('#');
        return idx === -1 ? '' : href.slice(idx + 1);
    }

    function start() {
        if (window.__csOutlineInit) return;
        if (!document.querySelector('.cs-toc, .cs-outline')) return;
        window.__csOutlineInit = true;

        const outlineLinks = Array.from(document.querySelectorAll('.cs-toc__link, .cs-outline__link'));
        const seenIds = new Set();
        const outlineTargets = [];

        outlineLinks.forEach((link) => {
            const id = hashId(link.getAttribute('href'));
            if (!id || seenIds.has(id)) return;
            const el = document.getElementById(id);
            if (!el) return;
            seenIds.add(id);
            outlineTargets.push({ id, el });
        });

        if (!outlineTargets.length) return;

        const marker = 112;
        const tiePx = 56;
        let outlineTicking = false;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function setOutlineActive(id) {
            outlineLinks.forEach((link) => {
                const on = hashId(link.getAttribute('href')) === id;
                link.classList.toggle('is-active', on);
                if (on) {
                    link.setAttribute('aria-current', 'location');
                } else {
                    link.removeAttribute('aria-current');
                }
            });
        }

        function updateOutlineActive() {
            let current = outlineTargets[0];
            let currentDocTop = -Infinity;
            outlineTargets.forEach((item) => {
                const rect = item.el.getBoundingClientRect();
                const docTop = rect.top + window.pageYOffset;
                if (rect.top <= marker && docTop > currentDocTop + tiePx) {
                    current = item;
                    currentDocTop = docTop;
                }
            });
            setOutlineActive(current.id);
        }

        function onOutlineScroll() {
            if (outlineTicking) return;
            outlineTicking = true;
            requestAnimationFrame(function () {
                updateOutlineActive();
                outlineTicking = false;
            });
        }

        window.addEventListener('scroll', onOutlineScroll, { passive: true });
        window.addEventListener('resize', onOutlineScroll);
        updateOutlineActive();

        outlineLinks.forEach((link) => {
            link.addEventListener('click', function (event) {
                const id = hashId(link.getAttribute('href'));
                const target = id ? document.getElementById(id) : null;
                if (!target) return;
                event.preventDefault();
                target.scrollIntoView({
                    behavior: reduceMotion ? 'auto' : 'smooth',
                    block: 'start'
                });
                try {
                    history.replaceState(null, '', window.location.href.split('#')[0] + '#' + id);
                } catch (err) { /* ignore */ }
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();

(function scaleJqMotion() {
    var STAGE_W = 1440;
    /* Homepage: keep natural 1440 stage; AI panel uses --jq-ai-home-scale. */
    var HOME_STAGE_W = 1440;

    function applyScale() {
        document.querySelectorAll('[data-jq-motion]').forEach(function (root) {
            var width = root.clientWidth;
            if (width < 1) return;
            var stageW = root.closest('.hb-card--jq, .hb-card__media--jq, .hp-stage__panel--jq, .hp-item__media--jq') ? HOME_STAGE_W : STAGE_W;
            root.style.setProperty('--jq-scale', String(width / stageW));
        });
    }

    function bind() {
        applyScale();
        window.addEventListener('resize', applyScale);
        if (typeof ResizeObserver === 'undefined') return;
        var observer = new ResizeObserver(applyScale);
        document.querySelectorAll('[data-jq-motion]').forEach(function (root) {
            observer.observe(root);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bind);
    } else {
        bind();
    }
})();

(function caseStudyHeroVideo() {
    function videos() {
        return Array.prototype.slice.call(
            document.querySelectorAll('.case-study__hero-banner video, .cc-app video, .home-bento video, .home-desk video, .home-classic video')
        );
    }

    function bind() {
        var nodes = videos();
        if (!nodes.length) return;

        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        nodes.forEach(function (video) {
            video.muted = true;
            video.setAttribute('playsinline', '');
            if (reduce) {
                video.removeAttribute('autoplay');
                video.pause();
            }
        });
        if (reduce) return;

        function play(video) {
            if (!video) return;
            video.muted = true;
            video.defaultMuted = true;
            video.setAttribute('muted', '');
            video.setAttribute('playsinline', '');
            video.playsInline = true;
            var p = video.play();
            if (p && typeof p.catch === 'function') {
                p.catch(function () {
                    if (video.readyState < 2) {
                        video.addEventListener('loadeddata', function () {
                            video.play().catch(function () {});
                        }, { once: true });
                        try {
                            video.load();
                        } catch (e) {}
                    }
                });
            }
        }

        function inView(video) {
            var r = video.getBoundingClientRect();
            return r.height > 0 && r.bottom > 0 && r.top < window.innerHeight;
        }

        if (!('IntersectionObserver' in window)) {
            nodes.forEach(play);
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) play(entry.target);
                else entry.target.pause();
            });
        }, { threshold: 0.01 });

        nodes.forEach(function (video) {
            observer.observe(video);
            if (inView(video)) play(video);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bind);
    } else {
        bind();
    }
})();

(function () {
    var CASE_PAGES = {
        'guildgaming.html': true,
        'jobquest.html': true,
        'baseballlittleleague.html': true,
        'secondwindpro.html': true,
        'swpsandbox.html': true
    };

    var ICONS = {
        home: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 10.75 12 4.25l7.5 6.5V20a1.5 1.5 0 0 1-1.5 1.5h-4.25v-6.25h-3.5V21.5H6A1.5 1.5 0 0 1 4.5 20V10.75Z" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/></svg>',
        sideprojects: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 2.75h6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/><path d="M10.25 2.75v6.85c0 .4-.12.79-.35 1.12L5.4 18.55A1.65 1.65 0 0 0 6.78 21.1h10.44a1.65 1.65 0 0 0 1.38-2.55l-4.5-7.83a2 2 0 0 1-.35-1.12V2.75" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.15 15.35h7.7" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/><circle cx="11.15" cy="17.85" r="0.85" fill="currentColor"/><circle cx="13.35" cy="18.55" r="0.55" fill="currentColor"/></svg>',
        about: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="3.15" stroke="currentColor" stroke-width="1.75"/><path d="M5.4 19.4c.75-3.05 3.25-4.9 6.6-4.9s5.85 1.85 6.6 4.9" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg>',
        resume: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 3.5h7.25L19 8.25V20A1.5 1.5 0 0 1 17.5 21.5h-10A1.5 1.5 0 0 1 6 20V5A1.5 1.5 0 0 1 7 3.5Z" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/><path d="M14.25 3.5V8.25H19" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/><path d="M9 12.25h6M9 15.75h6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg>'
    };

    function pageFile() {
        var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
        if (!path || path === 'playground') return 'index.html';
        return path;
    }

    function currentKey(file) {
        if (file === 'about.html') return 'about';
        if (file === 'sideprojects.html') return 'sideprojects';
        return 'home';
    }

    function itemHtml(item, current) {
        var on = item.key === current;
        var extra = item.blank
            ? ' target="_blank" rel="noopener noreferrer"'
            : '';
        var currentAttr = on ? ' aria-current="page"' : '';
        return (
            '<li class="side-rail__item">' +
                '<a class="side-rail__btn' + (on ? ' is-current' : '') + '" href="' + item.href + '"' + extra +
                    ' aria-label="' + item.label + '"' + currentAttr + '>' +
                    ICONS[item.key] +
                '</a>' +
            '</li>'
        );
    }

    function ready(fn) {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
        else fn();
    }

    function injectCaseStudyBack(file) {
        if (!CASE_PAGES[file] || document.querySelector('.case-study__back')) return;
        var study = document.querySelector('.case-study');
        if (!study) return;

        var back = document.createElement('a');
        back.className = 'case-study__back';
        back.href = 'index.html';
        back.setAttribute('aria-label', 'Back to home');
        back.innerHTML =
            '<svg class="case-study__back-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
                '<path d="M10 3.25 5.25 8 10 12.75" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>' +
            '</svg>' +
            '<span>Back</span>';

        var article = study.querySelector('.cs-toc-article');
        if (article) {
            article.insertBefore(back, article.firstChild);
            return;
        }

        study.insertBefore(back, study.firstChild);
    }

    ready(function () {
        var file = pageFile();
        injectCaseStudyBack(file);

        if (document.querySelector('.side-rail')) return;
        if (document.body.classList.contains('work-page')) return;

        var onHome = file === 'index.html';
        var current = currentKey(file);
        var items = [
            { key: 'home', label: 'Home', href: onHome ? '#page' : 'index.html' },
            { key: 'sideprojects', label: 'Side projects', href: 'sideprojects.html' },
            { key: 'about', label: 'About', href: 'about.html' },
            {
                key: 'resume',
                label: 'Resume',
                href: "Ayomikun-Ayo+Obayomi's Resume.pdf",
                blank: true
            }
        ];

        var nav = document.createElement('nav');
        nav.className = 'side-rail';
        nav.setAttribute('aria-label', 'Page');
        nav.innerHTML =
            '<ul class="side-rail__list">' +
                items.map(function (item) { return itemHtml(item, current); }).join('') +
            '</ul>';
        document.body.appendChild(nav);
    });
})();

(function () {
    var PAGE_PROJECTS = {
        'index.html': null,
        'about.html': null,
        'sideprojects.html': null,
        'guildgaming.html': 'Guild Gaming',
        'jobquest.html': 'Job Quest',
        'baseballlittleleague.html': 'Baseball Little League',
        'secondwindpro.html': 'Second Wind Pro',
        'swpsandbox.html': 'SWP Sandbox'
    };

    function pageFile() {
        var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
        if (!path || path === 'playground') return 'index.html';
        return path;
    }

    function currentProject() {
        return PAGE_PROJECTS[pageFile()] || null;
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function renderText(value) {
        var html = escapeHtml(value)
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
            .replace(/\n\n+/g, '</p><p>')
            .replace(/\n/g, '<br>');
        return '<p>' + html + '</p>';
    }

    function ready(fn) {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
        else fn();
    }

    ready(function () {
        var file = pageFile();
        if (document.body.classList.contains('work-page') ||
            document.body.classList.contains('home-page') ||
            file === 'index.html') {
            return;
        }

        var root = document.createElement('div');
        root.className = 'ayo-llm';
        root.dataset.open = 'false';
        root.innerHTML =
            '<button type="button" class="ayo-llm__launch" aria-label="AyoLLM" aria-expanded="false" aria-controls="ayo-llm-panel">' +
                '<img src="ayo-ice-diamond-purple.png?v=6" alt="" width="26" height="26" decoding="async" aria-hidden="true">' +
            '</button>' +
            '<section class="ayo-llm__panel" id="ayo-llm-panel" role="dialog" aria-modal="true" aria-label="AyoLLM" hidden>' +
                '<div class="ayo-llm__top">' +
                    '<div class="ayo-llm__brand">' +
                        '<img src="ayo-ice-diamond-purple.png?v=6" alt="" width="28" height="28" decoding="async" aria-hidden="true">' +
                    '</div>' +
                    '<div class="ayo-llm__top-actions">' +
                        '<button type="button" class="ayo-llm__icon-btn" data-ayo-reset aria-label="Reset chat">' +
                            '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13.25 8A5.25 5.25 0 1 1 11.72 4.22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M13.25 2.75v2.9h-2.9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
                        '</button>' +
                        '<button type="button" class="ayo-llm__icon-btn" data-ayo-close aria-label="Close chat">' +
                            '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4.25 4.25l7.5 7.5M11.75 4.25l-7.5 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>' +
                        '</button>' +
                    '</div>' +
                '</div>' +
                '<div class="ayo-llm__log" data-ayo-log></div>' +
                '<form class="ayo-llm__form" data-ayo-form>' +
                    '<textarea class="ayo-llm__input" data-ayo-input rows="1" placeholder="Ask about Ayo’s projects…"></textarea>' +
                    '<button type="submit" class="ayo-llm__send" data-ayo-send aria-label="Send" disabled>' +
                        '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 13.25V2.75M8 2.75L3.5 7.25M8 2.75L12.5 7.25" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
                    '</button>' +
                '</form>' +
            '</section>';

        document.body.appendChild(root);
        document.body.classList.add('has-ayo-llm');

        var launch = root.querySelector('.ayo-llm__launch');
        var panel = root.querySelector('.ayo-llm__panel');
        var logEl = root.querySelector('[data-ayo-log]');
        var form = root.querySelector('[data-ayo-form]');
        var input = root.querySelector('[data-ayo-input]');
        var sendBtn = root.querySelector('[data-ayo-send]');
        var closeBtn = root.querySelector('[data-ayo-close]');
        var resetBtn = root.querySelector('[data-ayo-reset]');
        var messages = [];
        var busy = false;

        function chipsForPage() {
            var project = currentProject();
            if (project) {
                return [
                    {
                        label: 'Summarize Ayo’s project',
                        ask: 'Summarize Ayo’s ' + project + ' project.'
                    },
                    {
                        label: 'What did Ayo contribute here?',
                        ask: 'What did Ayo contribute to ' + project + '?'
                    }
                ];
            }
            return [
                { label: 'Summarize Ayo’s projects', ask: 'Summarize Ayo’s projects.' },
                { label: 'What did Ayo contribute?', ask: 'What did Ayo contribute across these projects?' }
            ];
        }

        function paintHello() {
            messages = [];
            var chips = chipsForPage().map(function (chip) {
                return '<button type="button" class="ayo-llm__chip" data-ayo-chip="' + escapeHtml(chip.ask) + '">' +
                    '<span class="ayo-llm__chip-label">' + escapeHtml(chip.label) + '</span>' +
                    '<svg class="ayo-llm__chip-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
                    '</button>';
            }).join('');
            logEl.innerHTML =
                '<div class="ayo-llm__hello">' +
                    '<div class="ayo-llm__hello-info">' +
                        '<h3 class="ayo-llm__hello-title">Hey, ask away.</h3>' +
                        '<p class="ayo-llm__hello-copy">I can summarize Ayo’s projects and talk through what he actually contributed.</p>' +
                    '</div>' +
                    '<div class="ayo-llm__chips" role="group" aria-label="Suggested questions">' + chips + '</div>' +
                '</div>';
        }

        function setOpen(open) {
            root.dataset.open = open ? 'true' : 'false';
            launch.setAttribute('aria-expanded', open ? 'true' : 'false');
            panel.hidden = !open;
            document.body.classList.toggle('ayo-llm-open', open);
            if (open) input.focus();
        }

        function appendMsg(role, text, extraClass) {
            var el = document.createElement('div');
            el.className = 'ayo-llm__msg ayo-llm__msg--' + role + (extraClass ? ' ' + extraClass : '');
            el.innerHTML = renderText(text);
            var hello = logEl.querySelector('.ayo-llm__hello');
            if (hello) hello.remove();
            logEl.appendChild(el);
            logEl.scrollTop = logEl.scrollHeight;
            return el;
        }

        function syncSend() {
            sendBtn.disabled = busy || !input.value.trim();
        }

        async function send(text) {
            var content = (text || '').trim();
            if (!content || busy) return;
            busy = true;
            syncSend();
            appendMsg('user', content);
            messages.push({ role: 'user', content: content });
            input.value = '';
            syncSend();

            var botEl = appendMsg('bot', '');
            botEl.textContent = 'Thinking…';

            var controller = new AbortController();
            var timeout = window.setTimeout(function () { controller.abort(); }, 18000);

            try {
                var res = await fetch('/api/ayo-llm', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    signal: controller.signal,
                    body: JSON.stringify({
                        messages: messages,
                        page: pageFile()
                    })
                });
                window.clearTimeout(timeout);

                if (!res.ok) {
                    var errBody = {};
                    if ((res.headers.get('content-type') || '').indexOf('application/json') !== -1) {
                        try { errBody = await res.json(); } catch (e) {}
                    }
                    if (res.status === 404 || res.status === 503) {
                        throw new Error(errBody.error || 'AyoLLM needs the live Netlify site to talk. Until then, the case studies have the full write-up.');
                    }
                    throw new Error(errBody.error || 'AyoLLM could not answer just then.');
                }

                var reader = res.body.getReader();
                var decoder = new TextDecoder();
                var buffer = '';
                var reply = '';
                botEl.innerHTML = '';

                while (true) {
                    var chunk = await reader.read();
                    if (chunk.done) break;
                    buffer += decoder.decode(chunk.value, { stream: true });
                    var parts = buffer.split('\n');
                    buffer = parts.pop();
                    parts.forEach(function (line) {
                        var trimmed = line.trim();
                        if (trimmed.indexOf('data:') !== 0) return;
                        var payload = trimmed.slice(5).trim();
                        if (!payload || payload === '[DONE]') return;
                        try {
                            var json = JSON.parse(payload);
                            var delta = json.choices && json.choices[0] && json.choices[0].delta
                                ? (json.choices[0].delta.content || '')
                                : '';
                            if (delta) {
                                reply += delta;
                                botEl.innerHTML = renderText(reply);
                                logEl.scrollTop = logEl.scrollHeight;
                            }
                        } catch (e) {}
                    });
                }

                if (!reply) throw new Error('AyoLLM returned an empty answer.');
                messages.push({ role: 'assistant', content: reply });
            } catch (err) {
                window.clearTimeout(timeout);
                var fallback = (err && err.name === 'AbortError')
                    ? 'AyoLLM needs the live Netlify site to talk. Until then, the case studies have the full write-up.'
                    : (err.message || 'AyoLLM could not answer just then.');
                botEl.classList.add('ayo-llm__msg--error');
                botEl.innerHTML = renderText(fallback);
                messages.pop();
            } finally {
                busy = false;
                syncSend();
            }
        }

        paintHello();

        launch.addEventListener('click', function () { setOpen(true); });
        closeBtn.addEventListener('click', function () { setOpen(false); });
        resetBtn.addEventListener('click', function () {
            paintHello();
            input.focus();
        });
        logEl.addEventListener('click', function (event) {
            var chip = event.target.closest('[data-ayo-chip]');
            if (!chip) return;
            chip.classList.add('ayo-llm__chip--picked');
            var siblings = logEl.querySelectorAll('.ayo-llm__chip');
            for (var i = 0; i < siblings.length; i++) {
                if (siblings[i] !== chip) siblings[i].classList.add('ayo-llm__chip--idle');
            }
            send(chip.getAttribute('data-ayo-chip'));
        });
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            send(input.value);
        });
        input.addEventListener('input', syncSend);
        input.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                send(input.value);
            }
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && root.dataset.open === 'true') {
                setOpen(false);
            }
        });

        window.openAyoLLM = function (prompt) {
            setOpen(true);
            if (prompt) send(prompt);
            else paintHello();
        };
    });
})();

(function () {
    var btn = null;
    var ticking = false;

    function update() {
        ticking = false;
        if (!btn) return;
        var el = document.scrollingElement || document.documentElement;
        var view = window.innerHeight;
        var max = el.scrollHeight;
        var y = window.scrollY || el.scrollTop || 0;
        var canScroll = max > view + 24;
        var atBottom = canScroll && (y + view >= max - 96);
        btn.classList.toggle('is-at-bottom', atBottom);
        btn.setAttribute('aria-hidden', atBottom ? 'false' : 'true');
    }

    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
    }

    function start() {
        btn = document.getElementById('back-to-top');
        if (!btn) return;
        btn.setAttribute('aria-hidden', 'true');
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        update();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
})();

(function localTimeClock() {
    var TZ = 'America/Indiana/Indianapolis';
    var nodes = [];
    var timer = null;

    function formatNow() {
        try {
            return new Intl.DateTimeFormat('en-US', {
                timeZone: TZ,
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            }).format(new Date());
        } catch (err) {
            return new Date().toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        }
    }

    function tick() {
        var stamp = formatNow();
        nodes.forEach(function (el) {
            el.textContent = stamp;
        });
    }

    function start() {
        nodes = Array.prototype.slice.call(document.querySelectorAll('[data-local-time]'));
        if (!nodes.length) return;
        tick();
        timer = window.setInterval(tick, 30000);
        document.addEventListener('visibilitychange', function () {
            if (document.visibilityState === 'visible') tick();
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
})();

(function homeClassicPreview() {
    var CYCLE_MS = 5000;
    var RESUME_DELAY_MS = 1200;

    function ready(fn) {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
        else fn();
    }

    ready(function () {
        var root = document.querySelector('.home-classic');
        if (!root) return;

        var list = root.querySelector('.hp-list');
        var items = Array.prototype.slice.call(root.querySelectorAll('.hp-item[data-project]'));
        var panels = Array.prototype.slice.call(root.querySelectorAll('.hp-stage__panel[data-preview]'));
        if (!list || !items.length || !panels.length) return;

        var ids = items.map(function (item) {
            return item.getAttribute('data-project');
        });
        var index = 0;
        var locked = false;
        var cycleTimer = null;
        var resumeTimer = null;
        var desktopMq = window.matchMedia('(min-width: 821px)');
        var reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');

        function setActive(id) {
            if (!id) return;
            var next = ids.indexOf(id);
            if (next >= 0) index = next;

            items.forEach(function (item) {
                var on = item.getAttribute('data-project') === id;
                item.classList.toggle('is-active', on);
                item.setAttribute('data-state', on ? 'active' : 'idle');
            });
            panels.forEach(function (panel) {
                var on = panel.getAttribute('data-preview') === id;
                panel.classList.toggle('is-active', on);
                var video = panel.querySelector('video');
                if (!video) return;
                if (on) {
                    ensureVideoPlaying(video);
                } else {
                    video.pause();
                }
            });
        }

        function ensureVideoPlaying(video) {
            if (!video || reduceMq.matches) return;
            video.muted = true;
            video.defaultMuted = true;
            video.setAttribute('muted', '');
            video.setAttribute('playsinline', '');
            video.playsInline = true;
            video.loop = true;

            function tryPlay() {
                var play = video.play();
                if (play && typeof play.catch === 'function') {
                    play.catch(function () {
                        // Autoplay can fail before media is ready; retry once loaded.
                        if (video.readyState < 2) {
                            video.addEventListener('loadeddata', tryPlay, { once: true });
                            try {
                                video.load();
                            } catch (e) {}
                        }
                    });
                }
            }

            if (video.error || video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
                try {
                    video.load();
                } catch (e) {}
            }
            tryPlay();
        }

        function clearCycle() {
            if (cycleTimer) {
                window.clearInterval(cycleTimer);
                cycleTimer = null;
            }
        }

        function clearResume() {
            if (resumeTimer) {
                window.clearTimeout(resumeTimer);
                resumeTimer = null;
            }
        }

        function step() {
            if (locked || !desktopMq.matches || reduceMq.matches) return;
            index = (index + 1) % ids.length;
            setActive(ids[index]);
        }

        function startCycle() {
            clearCycle();
            if (!desktopMq.matches || reduceMq.matches || locked) return;
            cycleTimer = window.setInterval(step, CYCLE_MS);
        }

        function pauseCycle() {
            locked = true;
            clearCycle();
            clearResume();
        }

        function scheduleResume() {
            locked = false;
            clearResume();
            if (!desktopMq.matches || reduceMq.matches) return;
            resumeTimer = window.setTimeout(function () {
                resumeTimer = null;
                if (locked) return;
                startCycle();
            }, RESUME_DELAY_MS);
        }

        items.forEach(function (item) {
            var id = item.getAttribute('data-project');
            item.addEventListener('mouseenter', function () {
                if (!desktopMq.matches) return;
                pauseCycle();
                setActive(id);
            });
            item.addEventListener('focusin', function () {
                if (!desktopMq.matches) return;
                pauseCycle();
                setActive(id);
            });
        });

        list.addEventListener('mouseleave', function () {
            if (!desktopMq.matches) return;
            scheduleResume();
        });

        list.addEventListener('focusout', function (event) {
            if (!desktopMq.matches) return;
            var next = event.relatedTarget;
            if (next && list.contains(next)) return;
            scheduleResume();
        });

        function onViewportChange() {
            clearCycle();
            clearResume();
            locked = false;
            if (desktopMq.matches && !reduceMq.matches) startCycle();
        }

        if (typeof desktopMq.addEventListener === 'function') {
            desktopMq.addEventListener('change', onViewportChange);
        } else if (typeof desktopMq.addListener === 'function') {
            desktopMq.addListener(onViewportChange);
        }

        document.addEventListener('visibilitychange', function () {
            if (document.visibilityState === 'hidden') {
                clearCycle();
                clearResume();
            } else if (!locked && desktopMq.matches && !reduceMq.matches) {
                startCycle();
            }
        });

        setActive(ids[0]);
        if (desktopMq.matches && !reduceMq.matches) startCycle();
    });
})();

(function aboutWatchedCarousel() {
    var CYCLE_MS = 3000;
    var RESUME_DELAY_MS = 1200;

    function ready(fn) {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
        else fn();
    }

    ready(function () {
        var root = document.querySelector('[data-watched-carousel]');
        if (!root) return;

        var track = root.querySelector('.about-watched-carousel__track');
        var slides = Array.prototype.slice.call(root.querySelectorAll('.about-watched-carousel__slide'));
        var prevBtn = root.querySelector('[data-watched-prev]');
        var nextBtn = root.querySelector('[data-watched-next]');
        var dotsHost = root.querySelector('[data-watched-dots]');
        if (!track || !slides.length || !prevBtn || !nextBtn || !dotsHost) return;

        var index = 0;
        var locked = false;
        var cycleTimer = null;
        var resumeTimer = null;
        var reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');

        slides.forEach(function (_, i) {
            var dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'about-watched-carousel__dot';
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
            dot.addEventListener('click', function () {
                pauseCycle();
                goTo(i);
                scheduleResume();
            });
            dotsHost.appendChild(dot);
        });

        var dots = Array.prototype.slice.call(dotsHost.querySelectorAll('.about-watched-carousel__dot'));

        function syncFigcaptionAlt() {
            slides.forEach(function (slide) {
                var fig = slide.querySelector('figcaption');
                var img = slide.querySelector('img');
                if (fig && img && !img.getAttribute('alt')) {
                    img.setAttribute('alt', fig.textContent.trim() + ' cover');
                }
            });
        }

        function goTo(nextIndex) {
            index = (nextIndex + slides.length) % slides.length;
            track.style.transform = 'translateX(-' + index * 100 + '%)';
            dots.forEach(function (dot, i) {
                var on = i === index;
                dot.classList.toggle('is-active', on);
                dot.setAttribute('aria-selected', on ? 'true' : 'false');
            });
        }

        function clearCycle() {
            if (cycleTimer) {
                clearInterval(cycleTimer);
                cycleTimer = null;
            }
        }

        function clearResume() {
            if (resumeTimer) {
                clearTimeout(resumeTimer);
                resumeTimer = null;
            }
        }

        function startCycle() {
            clearCycle();
            if (locked || reduceMq.matches) return;
            cycleTimer = setInterval(function () {
                goTo(index + 1);
            }, CYCLE_MS);
        }

        function pauseCycle() {
            locked = true;
            clearCycle();
            clearResume();
        }

        function scheduleResume() {
            clearResume();
            resumeTimer = setTimeout(function () {
                locked = false;
                startCycle();
            }, RESUME_DELAY_MS);
        }

        prevBtn.addEventListener('click', function () {
            pauseCycle();
            goTo(index - 1);
            scheduleResume();
        });

        nextBtn.addEventListener('click', function () {
            pauseCycle();
            goTo(index + 1);
            scheduleResume();
        });

        root.addEventListener('mouseenter', pauseCycle);
        root.addEventListener('mouseleave', scheduleResume);
        root.addEventListener('focusin', pauseCycle);
        root.addEventListener('focusout', function (event) {
            var next = event.relatedTarget;
            if (next && root.contains(next)) return;
            scheduleResume();
        });

        root.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                pauseCycle();
                goTo(index - 1);
                scheduleResume();
            } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                pauseCycle();
                goTo(index + 1);
                scheduleResume();
            }
        });

        var touchStartX = null;
        root.addEventListener('touchstart', function (event) {
            if (!event.touches || !event.touches.length) return;
            touchStartX = event.touches[0].clientX;
            pauseCycle();
        }, { passive: true });

        root.addEventListener('touchend', function (event) {
            if (touchStartX == null || !event.changedTouches || !event.changedTouches.length) return;
            var delta = event.changedTouches[0].clientX - touchStartX;
            touchStartX = null;
            if (Math.abs(delta) < 40) {
                scheduleResume();
                return;
            }
            goTo(delta > 0 ? index - 1 : index + 1);
            scheduleResume();
        }, { passive: true });

        document.addEventListener('visibilitychange', function () {
            if (document.visibilityState === 'hidden') {
                clearCycle();
                clearResume();
            } else if (!locked && !reduceMq.matches) {
                startCycle();
            }
        });

        syncFigcaptionAlt();
        goTo(0);
        startCycle();
    });
})();
