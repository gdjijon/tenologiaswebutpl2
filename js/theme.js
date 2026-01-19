// Theme toggle using Bootstrap 5.3 color modes (no custom CSS)
(function () {
  const storageKey = 'bs-theme';
  const root = document.documentElement;

  function removeClasses(el, classes) {
    classes.forEach((c) => el.classList.remove(c));
  }

  function addClasses(el, classes) {
    classes.forEach((c) => el.classList.add(c));
  }

  function updateNavButtons(theme) {
    const t = theme === 'dark' ? 'dark' : 'light';

    const navLinks = document.querySelectorAll('header nav a.btn');
    navLinks.forEach((a) => {
      const isActive = a.getAttribute('aria-current') === 'page';
      if (t === 'dark') {
        // Remove light look
        removeClasses(a, ['bg-white','bg-opacity-50','text-primary-emphasis','border-primary-subtle']);
        removeClasses(a, ['btn-light','text-dark','shadow-sm','fw-semibold']);
        removeClasses(a, ['btn-outline-light','text-light','border-light-subtle']);
        if (isActive) {
          addClasses(a, ['btn-light','text-dark','fw-semibold','shadow-sm']);
        } else {
          addClasses(a, ['btn-outline-light','text-light','border','border-light-subtle']);
        }
      } else {
        // Remove dark look
        removeClasses(a, ['btn-outline-light','text-light','border-light-subtle','btn-light','text-dark']);
        if (isActive) {
          addClasses(a, ['bg-white','text-primary-emphasis','border','border-primary-subtle','fw-semibold','shadow-sm']);
          removeClasses(a, ['bg-opacity-50']);
        } else {
          addClasses(a, ['bg-white','bg-opacity-50','text-primary-emphasis','border','border-primary-subtle']);
          removeClasses(a, ['fw-semibold','shadow-sm']);
        }
      }
    });

    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
      if (t === 'dark') {
        removeClasses(themeBtn, ['bg-white','bg-opacity-50','text-body','border','border-secondary-subtle']);
        removeClasses(themeBtn, ['btn-light','text-dark']);
        addClasses(themeBtn, ['btn-outline-light','text-light']);
      } else {
        removeClasses(themeBtn, ['btn-outline-light','text-light']);
        addClasses(themeBtn, ['border','border-secondary-subtle','bg-white','bg-opacity-50','text-body']);
      }
    }
  }

  function apply(theme) {
    const t = theme === 'dark' ? 'dark' : 'light';
    root.setAttribute('data-bs-theme', t);
    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
      btn.textContent = t === 'dark' ? 'Modo oscuro' : 'Modo claro';
    }
    updateNavButtons(t);
  }

  const saved = localStorage.getItem(storageKey);
  apply(saved || 'light');

  window.addEventListener('DOMContentLoaded', () => {
    updateNavButtons(root.getAttribute('data-bs-theme') || 'light');
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-bs-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem(storageKey, next);
      apply(next);
    });
  });
})();