(() => {
  'use strict';
  const status = document.getElementById('copy-status');
  let statusTimer;
  const announce = message => {
    if (!status) return;
    clearTimeout(statusTimer);
    status.textContent = message;
    status.classList.add('visible');
    statusTimer = setTimeout(() => status.classList.remove('visible'), 4500);
  };
  document.querySelectorAll('[data-toggle]').forEach(button => {
    const closedLabel = button.textContent;
    const openLabel = button.dataset.openLabel || 'Ocultar texto';
    button.addEventListener('click', () => {
      const panel = document.getElementById(button.dataset.toggle);
      if (!panel) return;
      panel.hidden = !panel.hidden;
      button.setAttribute('aria-expanded', String(!panel.hidden));
      button.textContent = panel.hidden ? closedLabel : openLabel;
    });
  });
  document.querySelectorAll('[data-copy]').forEach(button => {
    button.addEventListener('click', async () => {
      const source = document.getElementById(button.dataset.copy);
      if (!source) return;
      const text = source.textContent;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          const input = document.createElement('textarea');
          input.value = text;
          input.setAttribute('readonly', '');
          input.style.cssText = 'position:fixed;opacity:0;left:0;top:0;';
          document.body.append(input);
          input.select();
          input.setSelectionRange(0, input.value.length);
          const ok = document.execCommand('copy');
          input.remove();
          button.focus();
          if (!ok) throw new Error('Clipboard unavailable');
        }
        announce('Texto copiado. Pégalo en tu asistente y completa tus datos.');
        const previous = button.innerHTML;
        button.textContent = '✓ Texto copiado';
        setTimeout(() => { button.innerHTML = previous; }, 2200);
      } catch (_) {
        const panel = source.closest('.prompt-content, .file-content');
        if (panel) {
          panel.hidden = false;
          const toggle = document.querySelector(`[data-toggle="${panel.id}"]`);
          if (toggle) {
            toggle.setAttribute('aria-expanded', 'true');
            toggle.textContent = toggle.dataset.openLabel || 'Ocultar texto';
          }
        } else {
          source.hidden = false;
          source.classList.add('manual-copy-content');
        }
        const range = document.createRange();
        range.selectNodeContents(source);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        announce('No se pudo copiar automáticamente. El texto está seleccionado: usa Copiar en tu dispositivo.');
      }
    });
  });
  document.querySelectorAll('[data-dialog]').forEach(button => {
    button.addEventListener('click', () => {
      const dialog = document.getElementById(button.dataset.dialog);
      if (!dialog) return;
      dialog.showModal();
      dialog.addEventListener('close', () => button.focus(), {once:true});
    });
  });
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.querySelector('[data-close-dialog]')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
  });
  const desktopIndex = document.querySelector('.step-index');
  const intro = document.querySelector('.itinerary-intro');
  if (desktopIndex && intro) {
    const mobileIndex = desktopIndex.cloneNode(true);
    mobileIndex.classList.add('mobile-step-index');
    mobileIndex.classList.remove('step-index');
    mobileIndex.removeAttribute('open');
    mobileIndex.querySelector('summary').textContent = 'Ver los 9 pasos del recorrido';
    intro.insertBefore(mobileIndex, intro.querySelector('.route-intro'));
    mobileIndex.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileIndex.removeAttribute('open')));
  }
  const setCurrent = id => {
    document.querySelectorAll('.itinerary-sidebar a[href^="#paso-"], .mobile-step-index a').forEach(a => {
      if (a.hash === '#' + id) a.setAttribute('aria-current', 'step');
      else a.removeAttribute('aria-current');
    });
  };
  if (desktopIndex) {
    setCurrent(location.hash.slice(1) || 'paso-1');
    addEventListener('hashchange', () => setCurrent(location.hash.slice(1)));
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        const visible = entries.filter(e => e.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setCurrent(visible[0].target.id);
      }, {rootMargin:'-12% 0px -65% 0px',threshold:0});
      document.querySelectorAll('.itinerary-step').forEach(section => observer.observe(section));
    }
  }
})();
