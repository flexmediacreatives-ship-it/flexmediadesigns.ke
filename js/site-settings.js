/* Loads public business contact settings edited through /admin. Falls back safely to config.js. */
(() => {
  'use strict';
  const fallback = window.FMD_CONFIG || {
    businessName: 'FLEX MEDIA DESIGNS',
    contactEmail: 'flexmediacreatives@gmail.com',
    whatsappNumber: '254724660864',
    displayPhone: '0724 660 864'
  };
  const apply = (settings) => {
    const email = String(settings.contactEmail || fallback.contactEmail || 'flexmediacreatives@gmail.com').trim();
    document.querySelectorAll('[data-business-email]').forEach((link) => {
      link.textContent = email;
      link.setAttribute('href', `mailto:${email}`);
    });
    document.querySelectorAll('[data-business-whatsapp]').forEach((link) => {
      const phone = String(settings.whatsappNumber || fallback.whatsappNumber || '254724660864').replace(/\D/g, '');
      link.setAttribute('href', `https://wa.me/${phone}`);
    });
    document.querySelectorAll('[data-business-name]').forEach((node) => {
      node.textContent = settings.businessName || fallback.businessName || 'FLEX MEDIA DESIGNS';
    });
    document.querySelectorAll('[data-contact-intro]').forEach((node) => {
      node.textContent = settings.contactIntro || 'For the most reliable contact route, start your inquiry directly on WhatsApp.';
    });
    document.querySelectorAll('[data-business-tagline]').forEach((node) => {
      node.textContent = settings.tagline || '';
    });
    window.FMD_PUBLIC_SETTINGS = { ...fallback, ...settings, contactEmail: email };
  };
  apply(fallback);
  const url = new URL('../site-settings.json', document.currentScript?.src || window.location.href);
  fetch(url, { cache: 'no-cache' })
    .then((response) => {
      if (!response.ok) throw new Error(`Settings request failed (${response.status})`);
      return response.json();
    })
    .then((settings) => {
      if (!settings || typeof settings !== 'object' || Array.isArray(settings)) throw new Error('Invalid settings format');
      apply(settings);
    })
    .catch(() => {
      /* Local file previews and temporary hosting failures use the safe defaults above. */
    });
})();
