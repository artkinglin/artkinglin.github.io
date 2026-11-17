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
  function closeMenu() { toggle.setAttribute('aria-expanded', 'false'); links.classList.remove('open'); }
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); } });
  document.addEventListener('click', event => { if (!event.target.closest('.nav')) closeMenu(); });
  links.addEventListener('click', event => {
    if (event.target.closest('a')) { closeMenu(); }
  });
  updateHeader();
})();
