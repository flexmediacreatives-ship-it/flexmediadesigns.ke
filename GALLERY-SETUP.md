# Customers Gallery — how to add your designs you feel me..

The gallery appears on the homepage (with a "Gallery" link in the menu) as soon as
you add at least one image. Until then it stays hidden, so there is no empty gap.
Every image keeps its own original shape (nothing is cropped), gets rounded corners,
and the site arranges them neatly in columns. Clicking one opens it full size, with
next / previous arrows a caption and a close button (Esc also closes it).

## Easiest way — the Gallery Manager page
Open `yourwebsite.com/gallery-manager.html` (the file `gallery-manager.html` in the project root).
1. **Connect (one time):** enter your GitHub repository (`owner/name`), branch (usually `main`) and an
   access token (the page explains how to create one). Skip this if you prefer downloading files.
2. **Add designs:** choose images, type a title for each.
3. **Publish:** "Publish to website" sends them live (newest first). Or "Download files instead" gives a
   `gallery-update.zip` to unzip into your project and upload.
**On Vercel:** Vercel redeploys your site automatically each time your GitHub repository changes.
"Publish to website" sends all the new designs as ONE commit, so you get ONE deployment per publish
(about a minute). If you deploy by uploading/dragging files or with the Vercel CLI instead of GitHub,
use "Download files instead", then redeploy your project as usual.
You can also edit titles or remove designs in the "Your gallery right now" list, then press Publish.

## Option A — manual (no tools needed)
1. Copy your design images into `assets/images/gallery/`.
   - Use simple names with no spaces: `wedding-poster.jpg`, `shop-banner.png`
   - Formats: .jpg  .png  .webp
   - Keep each file under about 1 MB (compress at squoosh.app or tinypng.com first)
2. Open `gallery.json` in the project root and list them, one per line:

```json
{
  "images": [
    { "src": "wedding-poster.jpg", "title": "Wedding poster" },
    { "src": "shop-banner.png",    "title": "Shop banner" },
    { "src": "business-card.jpg" }
  ]
}
```
   - `title` is optional; it shows under the image in the full-size view.
   - **Newest design shows first.** Add each new design as the LAST line of the list and it
     appears at the top of the gallery. (Optional: add `"date": "2026-10-19"` to a line to
     control the order yourself — the latest date always shows first.)
   - Every line except the last needs a comma at the end.
3. Upload/deploy the updated folder. Hard-refresh the site.

## Sharing and downloading
Clicking a design opens it full size with three buttons:
- **Share link** – gives that exact design its own link (e.g. `yoursite.com/#design-wedding-poster-jpg`).
  On a phone it opens the share sheet; on a computer it copies the link. Anyone who opens the
  link lands on your site with that design already open.
- **WhatsApp** – opens WhatsApp with the link ready to send.
- **Download** – saves the original image file to the visitor's device.

## Notes
- The gallery reads `gallery.json`, so test locally with a server
  (`python -m http.server`), not by double-clicking index.html.
- A file name that is listed but missing from the folder is simply skipped.
