// Experience Page Carousel Functionality
// Swiss design inspired carousel with 2-second intervals

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all carousels on the page
    const carousels = document.querySelectorAll('.experience-carousel');
    
    carousels.forEach(carousel => {
        initializeCarousel(carousel);
    });
});

function initializeCarousel(carousel) {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const indicators = carousel.querySelectorAll('.indicator');
    let currentSlide = 0;
    let intervalId;
    
    if (slides.length <= 1) return; // No need for carousel with 1 or fewer slides
    
    // Start the carousel
    startCarousel();
    
    // Add click handlers to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Pause on hover, resume on mouse leave
    carousel.addEventListener('mouseenter', () => {
        clearInterval(intervalId);
    });
    
    carousel.addEventListener('mouseleave', () => {
        startCarousel();
    });
    
    function startCarousel() {
        intervalId = setInterval(() => {
            nextSlide();
        }, 2000); // 2-second intervals like the timeline
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateSlide();
        
        // Restart the interval
        clearInterval(intervalId);
        startCarousel();
    }
    
    function updateSlide() {
        // Update slides
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
}
