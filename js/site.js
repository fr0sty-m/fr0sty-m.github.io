document.addEventListener('DOMContentLoaded', () => {
  const currentURL = window.location.pathname.split('/').pop();
  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentURL) {
      link.classList.add('active');
    }
  });

  const revealElements = () => Array.from(document.querySelectorAll('.reveal'));

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements().forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < windowHeight - 50) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('reveal:update', revealOnScroll);
  revealOnScroll();
});