(() => {
  const close = () => {
    const nav = document.querySelector('[data-mobile-nav]');
    const button = document.querySelector('[data-menu-toggle]');
    nav?.classList.remove('is-open');
    button?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-is-open');
  };
  document.addEventListener('click', (event) => {
    const el = event.target;
    if (!(el instanceof Element)) return;
    const button = el.closest('[data-menu-toggle]');
    if (button) {
      const nav = document.querySelector('[data-mobile-nav]');
      const isOpen = !nav?.classList.contains('is-open');
      nav?.classList.toggle('is-open', isOpen);
      button.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('nav-is-open', isOpen);
      return;
    }
    if (el.closest('a[href]')) close();
    else if (!el.closest('[data-mobile-nav]')) close();
  });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 920) close(); });
  document.addEventListener('error', (event) => {
    const el = event.target;
    if (el instanceof HTMLImageElement && el.matches('.image-frame img')) {
      el.hidden = true;
      el.parentElement?.classList.add('no-image');
    }
  }, true);
})();
