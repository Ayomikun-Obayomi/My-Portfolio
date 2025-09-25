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
});

// Before/After Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.before-after-container');
    if (!slider) return;

    const afterImage = slider.querySelector('.slider-after');
    const sliderHandle = slider.querySelector('.slider-handle');
    let isDragging = false;

    function updateSlider(x) {
        const rect = slider.getBoundingClientRect();
        const percentage = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
        
        // Use clip-path to reveal the after image
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
            updateSlider(e.clientX);
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        slider.style.cursor = 'grab';
    });

    // Touch events for mobile
    slider.addEventListener('touchstart', (e) => {
        isDragging = true;
        updateSlider(e.touches[0].clientX);
        e.preventDefault();
    });

    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            updateSlider(e.touches[0].clientX);
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
