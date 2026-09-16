const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

const closeMenu = ({ returnFocus = false } = {}) => {
  if (!menuButton || !nav) return;

  nav.classList.remove('nav-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');

  if (returnFocus) {
    menuButton.focus();
  }
};

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    const willExpand = !expanded;

    menuButton.setAttribute('aria-expanded', String(willExpand));
    menuButton.setAttribute('aria-label', willExpand ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('nav-open', willExpand);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closeMenu());
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('nav-open')) {
      closeMenu({ returnFocus: true });
    }
  });

  document.addEventListener('click', (event) => {
    if (!nav.classList.contains('nav-open')) return;
    if (header?.contains(event.target)) return;

    closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });
}

const updateHeaderState = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 14);
};

let scrollTicking = false;

window.addEventListener(
  'scroll',
  () => {
    if (scrollTicking) return;

    scrollTicking = true;
    window.requestAnimationFrame(() => {
      updateHeaderState();
      scrollTicking = false;
    });
  },
  { passive: true },
);

updateHeaderState();
