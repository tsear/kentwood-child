document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.rss-wrapper');
  if (!wrapper) return;

  const slider = wrapper.querySelector('.rss-slider');
  const items = wrapper.querySelectorAll('.rss-item');
  const btnLeft = wrapper.querySelector('.rss-nav-left');
  const btnRight = wrapper.querySelector('.rss-nav-right');

  let index = 0;
  let autoScroll;
  const gap = 32; // 2rem gap as defined in CSS

  const getSteps = () => {
    if (!items.length) return [0];
  
    const itemWidth = items[0].offsetWidth;
    const isMobile = window.innerWidth <= 768;
  
    if (isMobile) {
      return Array.from(items).map((_, i) => i * (itemWidth + gap));
    } else {
      return [
        0,
        1 * (itemWidth + gap),
        2 * (itemWidth + gap)
      ];
    }
  };

  let steps = getSteps();

  const scrollToStep = (i) => {
    slider.scrollTo({ left: steps[i], behavior: 'smooth' });
  };

  const scrollNext = () => {
    index = (index + 1) % steps.length;
    scrollToStep(index);
  };

  const scrollPrev = () => {
    index = (index - 1 + steps.length) % steps.length;
    scrollToStep(index);
  };

  btnLeft.addEventListener('click', () => {
    stopAutoScroll();
    scrollPrev();
  });

  btnRight.addEventListener('click', () => {
    stopAutoScroll();
    scrollNext();
  });

  const startAutoScroll = () => {
    autoScroll = setInterval(scrollNext, 3000);
  };

  const stopAutoScroll = () => {
    clearInterval(autoScroll);
  };

  slider.addEventListener('mouseenter', stopAutoScroll);
  slider.addEventListener('mouseleave', startAutoScroll);

  window.addEventListener('resize', () => {
    steps = getSteps();
  });

  startAutoScroll();
});