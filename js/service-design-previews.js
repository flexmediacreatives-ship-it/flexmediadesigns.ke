/* FLEX MEDIA DESIGNS — service design image previews
   Upload your own images to assets/images/services/ using the filenames below.
   This script adds blurred card backgrounds and a clear click-to-preview modal.
*/
(() => {
  "use strict";

  const services = [
    { match: ["flyer", "flyers"], file: "flyers.webp", label: "Flyers" },
    { match: ["banner", "banners"], file: "banners.webp", label: "Banners" },
    { match: ["poster", "posters"], file: "posters.webp", label: "Posters" },
    { match: ["logo design", "logos", "logo"], file: "logo-design.webp", label: "Logo Design" },
    { match: ["business card", "business cards"], file: "business-cards.webp", label: "Business Cards" },
    { match: ["label design", "label designs", "labels"], file: "label-designs.webp", label: "Label Designs" },
    { match: ["brochure", "brochures"], file: "brochures.webp", label: "Brochures" },
    { match: ["video editing", "video edit"], file: "video-editing.webp", label: "Video Editing" },
    { match: ["photo mounting", "photo mount", "retouching", "photo retouching"], file: "photo-mounting-retouching.webp", label: "Photo Mounting & Retouching" },
    { match: ["event photography", "photography"], file: "event-photography.webp", label: "Event Photography" },
    { match: ["event videography", "videography"], file: "event-videography.webp", label: "Event Videography" },
    { match: ["packaging design", "packaging designs", "packaging"], file: "packaging-designs.webp", label: "Packaging Designs" }
  ];

  const style = document.createElement("style");
  style.textContent = `
    #service-grid .service-design-card {
      position: relative !important;
      isolation: isolate;
      overflow: hidden;
      box-shadow: 0 7px 18px rgba(6, 20, 86, .18);
      transition: box-shadow .2s ease, transform .2s ease;
    }
    #service-grid .service-design-card:hover {
      box-shadow: 0 11px 25px rgba(6, 20, 86, .25);
    }
    #service-grid .service-design-card::before {
      content: "";
      position: absolute;
      inset: -5px;
      z-index: -2;
      background-image: var(--service-design-image);
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      filter: blur(4px);
      transform: scale(1.05);
      transition: filter .25s ease, transform .25s ease;
      pointer-events: none;
    }
    #service-grid .service-design-card::after {
      content: "";
      position: absolute;
      inset: 0;
      z-index: -1;
      background: linear-gradient(135deg, rgba(0, 8, 40, .78), rgba(10, 56, 181, .45));
      pointer-events: none;
    }
    #service-grid .service-design-card,
    #service-grid .service-design-card h2,
    #service-grid .service-design-card h3,
    #service-grid .service-design-card h4,
    #service-grid .service-design-card p,
    #service-grid .service-design-card span,
    #service-grid .service-design-card label {
      color: #fff;
      text-shadow: 0 1px 3px rgba(0,0,0,.35);
    }
    #service-grid .service-design-card .service-design-preview {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: .4rem;
      margin-top: .75rem;
      padding: .55rem .85rem;
      border: 1px solid rgba(255,255,255,.8);
      border-radius: 999px;
      background: rgba(6,20,86,.78);
      color: #fff;
      font: inherit;
      font-size: .88rem;
      font-weight: 800;
      line-height: 1.2;
      cursor: pointer;
      position: relative;
      z-index: 2;
      text-shadow: none;
      transition: background .2s ease, transform .2s ease;
    }
    #service-grid .service-design-card .service-design-preview:hover {
      background: #ff6900;
      border-color: #ff6900;
      transform: translateY(-1px);
    }
    .service-design-lightbox[hidden] { display: none !important; }
    .service-design-lightbox {
      position: fixed;
      inset: 0;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background: rgba(0,8,40,.92);
    }
    .service-design-lightbox .service-design-dialog {
      position: relative;
      width: min(100%, 1100px);
      max-height: 94vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
    .service-design-lightbox img {
      display: block;
      max-width: 100%;
      max-height: 82vh;
      width: auto;
      height: auto;
      object-fit: contain;
      border-radius: 8px;
      box-shadow: 0 12px 50px rgba(0,0,0,.4);
      background: #fff;
    }
    .service-design-lightbox .service-design-caption {
      color: #fff;
      font-weight: 800;
      text-align: center;
      margin: 0;
    }
    .service-design-lightbox .service-design-close {
      position: absolute;
      top: -10px;
      right: -10px;
      width: 44px;
      height: 44px;
      border: 0;
      border-radius: 50%;
      background: #ff6900;
      color: #fff;
      font-size: 30px;
      line-height: 1;
      cursor: pointer;
      z-index: 1;
    }
    @media (max-width: 600px) {
      .service-design-lightbox { padding: 14px; }
      .service-design-lightbox .service-design-close { top: -8px; right: -5px; }
    }
  `;
  document.head.appendChild(style);

  const modal = document.createElement("div");
  modal.className = "service-design-lightbox";
  modal.hidden = true;
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Service design preview");
  modal.innerHTML = `
    <div class="service-design-dialog">
      <button class="service-design-close" type="button" aria-label="Close design preview">&times;</button>
      <img alt="" />
      <p class="service-design-caption"></p>
    </div>`;
  document.body.appendChild(modal);

  const modalImage = modal.querySelector("img");
  const caption = modal.querySelector(".service-design-caption");
  const closeButton = modal.querySelector(".service-design-close");
  let previouslyFocused = null;

  function openPreview(service, card) {
    const imageUrl = new URL(`assets/images/services/${service.file}`, document.baseURI).href;
    previouslyFocused = document.activeElement;
    modalImage.src = imageUrl;
    modalImage.alt = `${service.label} design by FLEX MEDIA DESIGNS`;
    caption.textContent = service.label;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    closeButton.focus();
    modalImage.onerror = () => {
      caption.textContent = `${service.label} — add your image at assets/images/services/${service.file}`;
    };
  }

  function closePreview() {
    modal.hidden = true;
    modalImage.removeAttribute("src");
    document.body.style.overflow = "";
    if (previouslyFocused && typeof previouslyFocused.focus === "function") {
      previouslyFocused.focus();
    }
  }

  closeButton.addEventListener("click", closePreview);
  modal.addEventListener("click", event => {
    if (event.target === modal) closePreview();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !modal.hidden) closePreview();
  });

  function identifyService(card) {
    const text = (card.innerText || card.textContent || "").toLowerCase().replace(/\s+/g, " ").trim();
    // More specific categories are checked first to avoid "photography" matching videography.
    const ordered = [...services].sort((a, b) => Math.max(...b.match.map(s => s.length)) - Math.max(...a.match.map(s => s.length)));
    return ordered.find(service => service.match.some(term => text.includes(term))) || null;
  }

  function decorateCard(card) {
    if (!(card instanceof HTMLElement) || card.dataset.servicePreviewReady === "true") return;
    const service = identifyService(card);
    if (!service) return;

    card.dataset.servicePreviewReady = "true";
    card.classList.add("service-design-card");
    card.style.setProperty("--service-design-image", `url("${new URL(`assets/images/services/${service.file}`, document.baseURI).href}")`);

    const preview = document.createElement("button");
    preview.type = "button";
    preview.className = "service-design-preview";
    preview.textContent = "View design";
    preview.setAttribute("aria-label", `View ${service.label} design clearly`);
    preview.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      openPreview(service, card);
    });
    card.appendChild(preview);
  }

  function scanServices() {
    const grid = document.getElementById("service-grid");
    if (!grid) return;
    Array.from(grid.children).forEach(decorateCard);
    // Also handle cards nested in a wrapper, if the existing service renderer uses one.
    grid.querySelectorAll("article, .service-card, .service-item, [data-service]").forEach(decorateCard);
  }

  function start() {
    const grid = document.getElementById("service-grid");
    if (!grid) return;
    scanServices();
    const observer = new MutationObserver(scanServices);
    observer.observe(grid, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
