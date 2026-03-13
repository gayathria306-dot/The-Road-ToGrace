function updateYear() {
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

function setupScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver(
    (entries, watcher) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          watcher.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

window.addEventListener('site:fragments-ready', () => {
  updateYear();
  setupScrollAnimations();
});

updateYear();
setupScrollAnimations();
