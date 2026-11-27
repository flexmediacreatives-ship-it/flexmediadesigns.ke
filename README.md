# FLEX MEDIA DESIGNS website (redesign)

Plain HTML, CSS and JavaScript. No build step, no install. Upload the folder contents to GitHub and deploy (Vercel / GitHub Pages / Netlify).

## Pages
| Page | File |
|---|---|
| Home (full-screen slider) | `index.html` |
| Our Services (all 12 services) | `our-services.html` |
| Our Work (4 slanted panels) | `our-work.html` |
| Gallery (opens from "View Gallery") | `gallery.html?cat=promo` etc. |
| Contact Us (WhatsApp / email brief) | `contact-us.html` |

## Things you can edit
- `gallery.json` – the design images. Keep using your existing gallery-manager / upload tools; new uploads appear automatically (newest first).
- `js/work-config.js` – which Our Work panel each design belongs to. Designs not listed are sorted by title (VOTE/ELECTION -> Campaign Flyers, BANNER/POSTER -> Posters & Banners, LOGO/PACKAGING -> Brand & Packaging, anything else -> Flyers). To pin one: `"file name.webp": ["posters","Posters"]`.
- `js/hero-config.js` – homepage slider pictures, big words and taglines (the bulk uploader still works with it).
- `js/site.js` (top line) – WhatsApp number and email.
- `css/site.css` – colours are at the top (`--orange`, `--deep`).

To change service names/descriptions, edit the `SERVICES` list in `build.py`, run `python3 build.py`, and upload the regenerated HTML. (Optional – the HTML is already generated.)

## Kept from your old site
`gallery-manager.html`, `upload/`, `bulk/`, `admin/`, `gallery.json`, `site-settings.json`, `vercel.json`, `netlify.toml` and all images.

## Admin tool
`/admin-tool/` (see `admin-tool/GUIDE.md`) uploads designs as compressed WebP, recategorizes existing designs, and chooses the homepage slider pictures and the four Our Work panel pictures.
