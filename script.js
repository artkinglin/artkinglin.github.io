(() => {
  const header = document.querySelector('[data-header]');
  const hero = document.querySelector('#surface');
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('#nav-links');
  const updateHeader = () => header.classList.toggle('is-visible', window.scrollY >= hero.offsetHeight - 80);
  window.addEventListener('scroll', updateHeader, { passive: true });
  window.addEventListener('resize', updateHeader);
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    links.classList.toggle('open', open);
  });
  links.addEventListener('click', event => {
    if (event.target.closest('a')) { toggle.setAttribute('aria-expanded', 'false'); links.classList.remove('open'); }
  });
  updateHeader();
})();
