# Admin tool — how to use

Open `https://YOUR-SITE/admin-tool/` (not linked anywhere on the site, hidden from search engines).

## Connect (once per browser)
1. Repository: `your-username/your-repo`, branch `main`.
2. Token: GitHub > Settings > Developer settings > Fine-grained tokens > this repository only > **Contents: Read and write**.
3. Press **Connect and load the site**. Tick "Remember" only on your own device.

## Tabs
- **Upload designs**: pick the category first (Flyers, Campaign Flyers, Posters & Banners, Brand & Packaging), then choose images. Each can still be renamed or recategorized before publishing.
- **Recategorize designs**: filter by category, tick designs (or "Select all shown"), choose the new category, press **Move selected**. Titles and design type can also be edited per design.
- **Homepage pictures**: one picture each for Conceptualize, Design, Create, Deliver. Choose an existing picture or upload a new one.
- **Our Work pictures**: the picture on each of the four panels.

Nothing goes live until you press **Publish to GitHub** (one commit, one deployment).

## Images are always WebP
Every picture uploaded through the tool is converted in the browser to WebP (quality 80-92%, longest side max 2000 px for designs, 2200 px homepage, 1600 px panels) before it is sent to GitHub. The picture chooser only lists `.webp` files. Pictures you remove before publishing are never uploaded.
