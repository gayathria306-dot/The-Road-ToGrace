async function includeFragment(type) {
  const placeholder = document.querySelector(`[data-include="${type}"]`);
  if (!placeholder) return;

  const base = document.body.dataset.base || '.';
  const response = await fetch(`${base}/templates/${type}.html`);
  if (!response.ok) return;

  placeholder.outerHTML = await response.text();

  document.querySelectorAll('[data-nav-link]').forEach((link) => {
    const target = link.getAttribute('data-nav-link');
    link.setAttribute('href', `${base}${target}`.replace('//', '/'));
  });

  const current = window.location.pathname.replace(/index\.html$/, '');
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href').replace(/index\.html$/, '');
    if (current === href || (href !== '/' && current.startsWith(href))) {
      link.classList.add('is-active');
    }
  });
}

Promise.all([includeFragment('header'), includeFragment('footer')]).then(() => {
  const event = new Event('site:fragments-ready');
  window.dispatchEvent(event);
});
