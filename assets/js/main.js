/**
 * Gaia Terisacco — Portfolio
 * JavaScript vanilla (ES2020+), nessuna dipendenza. Ogni funzione è un miglioramento progressivo:
 * senza JS il sito resta completo e navigabile.
 */
(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hasObserver = 'IntersectionObserver' in window;

  /* ------------------------------------------------------------------
     Navigazione: barra fissa in alto con menu a comparsa su mobile
     ------------------------------------------------------------------ */
  const initNav = () => {
    const nav = document.querySelector('[data-nav]');
    if (!nav) return;

    const toggle = nav.querySelector('[data-nav-toggle]');
    const panel = nav.querySelector('[data-nav-panel]');

    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Chiudi menu' : 'Apri menu');
    };
    const isOpen = () => nav.classList.contains('is-open');

    toggle.addEventListener('click', () => setOpen(!isOpen()));
    panel.addEventListener('click', (event) => {
      if (event.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', (event) => {
      if (isOpen() && !nav.contains(event.target)) setOpen(false);
    });
    window.matchMedia('(min-width: 768px)').addEventListener('change', () => setOpen(false));

    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  };

  /* ------------------------------------------------------------------
     Evidenzia il link della sezione visibile
     ------------------------------------------------------------------ */
  const trackCurrent = (links, sections) => {
    if (!hasObserver || !sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach((section) => observer.observe(section));
  };

  const initCurrentSection = () => {
    const navLinks = [...document.querySelectorAll('[data-nav-panel] a[href^="#"]')];
    trackCurrent(navLinks, [...document.querySelectorAll('main > section[id]')]);

    const workLinks = [...document.querySelectorAll('.segmented a[href^="#"]')];
    trackCurrent(workLinks, [...document.querySelectorAll('.work-group[id]')]);
  };

  /* ------------------------------------------------------------------
     Striscia dei servizi: pausa / riproduci (WCAG 2.2.2)
     ------------------------------------------------------------------ */
  const initTicker = () => {
    const ticker = document.querySelector('[data-ticker]');
    const button = ticker?.querySelector('[data-ticker-toggle]');
    if (!button) return;

    button.addEventListener('click', () => {
      const paused = ticker.classList.toggle('is-paused');
      button.setAttribute('aria-pressed', String(paused));
    });
  };

  /* ------------------------------------------------------------------
     Comparsa allo scroll: si anima solo ciò che parte sotto la piega,
     così nulla lampeggia e senza JS tutto resta visibile.
     ------------------------------------------------------------------ */
  const initReveal = () => {
    if (reducedMotion.matches || !hasObserver) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.01 });

    const fold = window.innerHeight;
    document.querySelectorAll('.reveal').forEach((element) => {
      if (element.getBoundingClientRect().top > fold) {
        element.classList.add('is-pending');
        observer.observe(element);
      }
    });
  };

  /* ------------------------------------------------------------------
     Lightbox con <dialog> nativo (focus e tasto Esc gestiti dal browser)
     ------------------------------------------------------------------ */
  const initLightbox = () => {
    const dialog = document.querySelector('[data-lightbox-dialog]');
    if (!dialog || typeof dialog.showModal !== 'function') return;

    const image = dialog.querySelector('img');
    const caption = dialog.querySelector('figcaption');

    document.querySelectorAll('a[data-lightbox]').forEach((link) => {
      link.setAttribute('aria-haspopup', 'dialog');
    });

    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[data-lightbox]');
      if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      event.preventDefault();
      const thumb = link.querySelector('img');
      image.src = link.href;
      image.alt = thumb?.alt ?? '';
      caption.textContent = link.dataset.caption || '';
      dialog.showModal();
    });

    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.querySelector('[data-lightbox-close]')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => image.removeAttribute('src'));
  };

  initNav();
  initCurrentSection();
  initTicker();
  initReveal();
  initLightbox();
})();
