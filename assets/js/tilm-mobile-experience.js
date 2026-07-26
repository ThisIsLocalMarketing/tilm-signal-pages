(() => {
  const body = document.body;
  const themeButton = document.getElementById('modeToggle');
  const themeKey = 'tilm-theme';
  const sunIcon = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="3.7"></circle><path d="M12 1.5v2.2M12 20.3v2.2M1.5 12h2.2M20.3 12h2.2M4.58 4.58l1.56 1.56M17.86 17.86l1.56 1.56M19.42 4.58l-1.56 1.56M6.14 17.86l-1.56 1.56"></path></svg>';
  const moonIcon = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.35 15.15A8.45 8.45 0 0 1 8.85 3.65 8.45 8.45 0 1 0 20.35 15.15Z"></path></svg>';

  const syncThemeButton = () => {
    if (!themeButton) return;
    const light = body.classList.contains('light');
    themeButton.innerHTML = '<span class="mode-icon mode-icon-svg" aria-hidden="true">' + (light ? moonIcon : sunIcon) + '</span>';
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
