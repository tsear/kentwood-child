// assets/js/nav-home.js
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav-home');
  // collapse nav when scrolling past 60% viewport
  const collapseAt = window.innerHeight * 0.6;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('is-collapsed', window.scrollY > collapseAt);
  });

  // highlight current section
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      const link = document.querySelector(`.nav-home__item a[href="#${target.id}"]`);
      link?.classList.toggle('is-active', isIntersecting);
    });
  }, { rootMargin: '0px 0px -80% 0px' });

  document.querySelectorAll('main section[id]').forEach(s => observer.observe(s));
});