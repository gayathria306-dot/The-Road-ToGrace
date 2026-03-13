function updateYear() {
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

window.addEventListener('site:fragments-ready', updateYear);
updateYear();
