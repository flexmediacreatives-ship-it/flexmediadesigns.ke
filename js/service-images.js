(function () {
  const serviceGrid = document.getElementById('service-grid');
  const preview = document.getElementById('service-image-preview');
  const previewImage = document.getElementById('service-image-preview-img');
  const caption = document.getElementById('service-image-preview-caption');
  if (!serviceGrid || !preview || !previewImage || !caption) return;
  const closeButton = preview.querySelector('.service-image-preview-close');
  if (!closeButton) return;
  const serviceImages = [
    { keys: ['flyer'], label: 'Flyer Design', image: 'images/services/flyer-design.jpg' },
    { keys: ['poster'], label: 'Poster Design', image: 'images/services/poster-design.jpg' },
    { keys: ['branding', 'brand identity'], label: 'Branding & Identity', image: 'images/services/branding-design.jpg' },
    { keys: ['social media'], label: 'Social Media Designs', image: 'images/services/social-media-design.jpg' },
    { keys: ['print design', 'printing'], label: 'Print Design', image: 'images/services/print-design.jpg' },
    { keys: ['photography', 'photo'], label: 'Photography', image: 'images/services/photography.jpg' },
    { keys: ['video editing', 'video production', 'videography'], label: 'Video Editing', image: 'images/services/video-editing.jpg' },
    { keys: ['logo'], label: 'Logo Design', image: 'images/services/logo-design.jpg' },
    { keys: ['business card'], label: 'Business Cards', image: 'images/services/business-cards.jpg' },
    { keys: ['brochure', 'banner'], label: 'Banners & Brochures', image: 'images/services/banners-brochures.jpg' },
    { keys: ['event coverage', 'event photography'], label: 'Event Coverage', image: 'images/services/event-coverage.jpg' }
  ];
  let previousFocus = null;

  function openPreview(image, label, trigger) {
    previousFocus = trigger || document.activeElement;
    previewImage.src = image;
    previewImage.alt = label + ' design';
    caption.textContent = label;
    preview.hidden = false;
    closeButton.focus();
  }
  function closePreview() {
    preview.hidden = true;
    previewImage.src = '';
    if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
  }
  function decorateServiceCards() {
    Array.from(serviceGrid.children).forEach(function (card) {
      if (card.dataset.imageTileReady === 'true') return;
      const text = (card.innerText || card.textContent || '').toLowerCase().replace(/\s+/g, ' ').trim();
      const match = serviceImages.find(function (item) { return item.keys.some(function (key) { return text.includes(key); }); });
      if (!match) return;
      card.dataset.imageTileReady = 'true';
      card.classList.add('service-image-tile');
      card.style.setProperty('--service-image', 'url("' + match.image + '")');
      card.setAttribute('data-service-image-label', match.label);
      const trigger = document.createElement('span');
      trigger.className = 'service-image-preview-trigger';
      trigger.setAttribute('role', 'button');
      trigger.setAttribute('tabindex', '0');
      trigger.setAttribute('aria-label', 'Preview ' + match.label + ' design');
      trigger.setAttribute('title', 'Preview design');
      trigger.innerHTML = '&#x26F6;';
      trigger.addEventListener('click', function (event) {
        event.preventDefault(); event.stopPropagation();
        openPreview(match.image, match.label, trigger);
      });
      trigger.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault(); event.stopPropagation();
          openPreview(match.image, match.label, trigger);
        }
      });
      card.appendChild(trigger);
    });
  }
  decorateServiceCards();
  if (window.MutationObserver) {
    new MutationObserver(decorateServiceCards).observe(serviceGrid, { childList: true });
  }
  closeButton.addEventListener('click', closePreview);
  preview.addEventListener('click', function (event) { if (event.target === preview) closePreview(); });
  document.addEventListener('keydown', function (event) { if (event.key === 'Escape' && !preview.hidden) closePreview(); });
})();
