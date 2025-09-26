// Image Modal Functionality
function openImageModal(imageElement) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    modal.style.display = 'block';
    modalImg.src = imageElement.src;
    modalImg.alt = imageElement.alt;
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    
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
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeImageModal();
        }
    });
    
    // Navbar transparency on scroll
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    if (header) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.classList.add('header--transparent');
            } else {
                header.classList.remove('header--transparent');
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.nav__hamburger');
    const navMenu = document.querySelector('.nav__menu');
    
    if (hamburger && navMenu) {
        console.log('Hamburger and nav menu found');
        hamburger.addEventListener('click', function() {
            console.log('Hamburger clicked');
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('nav__menu--mobile');
            console.log('Nav menu classes:', navMenu.className);
            console.log('Nav menu display:', window.getComputedStyle(navMenu).display);
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('nav__menu--mobile');
            });
        });
    }
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        // Show button when scrolling down
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        // Smooth scroll to top when clicked
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Table of Contents functionality - HIDDEN
    /*
    const tocLinks = document.querySelectorAll('.case-study__toc-link');
    const sections = document.querySelectorAll('[id]');
    
    // Handle TOC link clicks with proper offset
    tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Calculate offset to show the header properly
                const headerHeight = 80; // Account for fixed navbar
                const additionalOffset = 40; // Extra space to show the full header
                const targetPosition = targetSection.offsetTop - headerHeight - additionalOffset;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active TOC link based on scroll position
    function updateActiveTocLink() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 120; // Offset for better detection
        const discoverySection = document.getElementById('discovery');
        
        // If we're at or past Discovery section, ensure proper detection
        if (discoverySection && scrollPosition >= discoverySection.offsetTop - 200) {
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.id;
                }
            });
            
            // If no section detected but we're past Discovery, default to Discovery
            if (!currentSection && scrollPosition >= discoverySection.offsetTop - 200) {
                currentSection = 'discovery';
            }
        }
        
        // Update active states
        tocLinks.forEach(link => {
            link.classList.remove('case-study__toc-link--active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('case-study__toc-link--active');
            }
        });
    }
    
    // Listen for scroll events to update active link
    if (tocLinks.length > 0) {
        window.addEventListener('scroll', updateActiveTocLink);
        // Set initial active state
        updateActiveTocLink();
    }
    
    // Smart TOC visibility - hide during banner, show at Discovery
    const toc = document.querySelector('.case-study__toc');
    
    function handleTocVisibility() {
        if (!toc) return;
        
        const discoverySection = document.getElementById('discovery');
        if (!discoverySection) return;
        
        const scrollPosition = window.scrollY;
        const discoveryTop = discoverySection.offsetTop;
        const shouldShow = scrollPosition >= discoveryTop - 200;
        
        if (shouldShow) {
            // Show TOC when Discovery is reached
            toc.style.opacity = '1';
            toc.style.pointerEvents = 'auto';
        } else {
            // Hide TOC when above Discovery section
            toc.style.opacity = '0';
            toc.style.pointerEvents = 'none';
        }
    }
    
    // Listen for scroll events to handle TOC visibility
    if (toc) {
        window.addEventListener('scroll', handleTocVisibility);
        // Set initial visibility state
        handleTocVisibility();
    }
    */
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
