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
    if (!items[0]) return [0, 0, 0];
    const itemWidth = items[0].offsetWidth;
    return [
      0,                              // Scroll to item 0
      1 * (itemWidth + gap),         // Scroll to item 1
      2 * (itemWidth + gap)          // Scroll to item 2
    ];
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