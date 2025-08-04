// Timeline Animation Controller
class TimelineAnimator {
  constructor() {
    this.timelineItems = [];
    this.init();
  }

  init() {
    // Wait a bit for WordPress blocks to fully render
    setTimeout(() => {
      this.timelineItems = document.querySelectorAll('.timeline-item');
      
      if (this.timelineItems.length === 0) {
        console.log('No timeline items found');
        return;
      }
      
      console.log(`Found ${this.timelineItems.length} timeline items`);
      this.setupIntersectionObserver();
      this.addScrollAnimations();
    }, 100);
  }

  setupIntersectionObserver() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      console.log('IntersectionObserver not supported, adding fallback');
      // Fallback: just add the animate-in class immediately
      this.timelineItems.forEach(item => {
        item.classList.add('animate-in');
      });
      return;
    }

    const options = {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    this.timelineItems.forEach(item => {
      observer.observe(item);
    });
  }

  addScrollAnimations() {
    // Add subtle parallax effect to timeline line
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;

    let ticking = false;

    const updateTimelineProgress = () => {
      const rect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const timelineHeight = timeline.offsetHeight;
      
      // Calculate progress based on viewport position
      const progress = Math.max(0, Math.min(1, 
        (windowHeight - rect.top) / (windowHeight + timelineHeight)
      ));
      
      // Update CSS custom property for potential gradient animations
      timeline.style.setProperty('--timeline-progress', progress);
      
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateTimelineProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick, { passive: true });
    
    // Initial call
    updateTimelineProgress();
  }

  // Method to add new timeline items dynamically
  addTimelineItem(element) {
    if (element.classList.contains('timeline-item')) {
      this.timelineItems = document.querySelectorAll('.timeline-item');
      this.setupIntersectionObserver();
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('Timeline script loaded');
  new TimelineAnimator();
});

// Also try on window load as fallback for WordPress
window.addEventListener('load', () => {
  // Only initialize if not already done
  if (document.querySelectorAll('.timeline-item.animate-in').length === 0) {
    console.log('Timeline script loaded on window load');
    new TimelineAnimator();
  }
});

// Smooth scroll for internal timeline links
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#timeline"]');
  if (link) {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }
});
