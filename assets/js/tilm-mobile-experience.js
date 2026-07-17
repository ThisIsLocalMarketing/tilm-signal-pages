(() => {
  const body = document.body;
  const themeButton = document.getElementById('modeToggle');
  const themeKey = 'tilm-theme';

  const syncThemeButton = () => {
    if (!themeButton) return;
    const light = body.classList.contains('light');
    themeButton.innerHTML = '<span class="mode-icon" aria-hidden="true"></span>';
    themeButton.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
    themeButton.title = light ? 'Switch to dark mode' : 'Switch to light mode';
  };

  syncThemeButton();
  themeButton?.addEventListener('click', () => {
    requestAnimationFrame(() => {
      const theme = body.classList.contains('light') ? 'light' : 'dark';
      try {
        localStorage.setItem(themeKey, theme);
      } catch (_) {
        // The theme still works when storage is unavailable.
      }
      syncThemeButton();
    });
  });

  const quickCta = document.querySelector('[data-mobile-cta]');
  const intro = document.querySelector('.hero-copy') || document.querySelector('.hero');
  const target = quickCta?.hash ? document.querySelector(quickCta.hash) : null;
  const mobileQuery = window.matchMedia('(max-width: 700px)');
  let updateQueued = false;

  const setQuickCtaVisible = visible => {
    if (!quickCta) return;
    quickCta.classList.toggle('is-visible', visible);
    quickCta.setAttribute('aria-hidden', visible ? 'false' : 'true');
    quickCta.tabIndex = visible ? 0 : -1;
  };

  const updateQuickCta = () => {
    updateQueued = false;
    if (!quickCta || !intro || !mobileQuery.matches) {
      setQuickCtaVisible(false);
      return;
    }

    const introBox = intro.getBoundingClientRect();
    const targetBox = target?.getBoundingClientRect();
    const introHasPassed = introBox.bottom < Math.min(window.innerHeight * .58, 470);
    const targetIsNear = Boolean(targetBox && targetBox.top < window.innerHeight * .9 && targetBox.bottom > 0);
    setQuickCtaVisible(introHasPassed && !targetIsNear);
  };

  const queueQuickCtaUpdate = () => {
    if (updateQueued) return;
    updateQueued = true;
    requestAnimationFrame(updateQuickCta);
  };

  window.addEventListener('scroll', queueQuickCtaUpdate, { passive: true });
  window.addEventListener('resize', queueQuickCtaUpdate, { passive: true });
  mobileQuery.addEventListener?.('change', queueQuickCtaUpdate);
  quickCta?.addEventListener('click', () => setQuickCtaVisible(false));
  updateQuickCta();
})();
