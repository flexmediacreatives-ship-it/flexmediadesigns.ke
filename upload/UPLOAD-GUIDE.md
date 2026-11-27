# Gallery Uploader — setup and daily use

This adds one page to your website, at **yoursite.com/upload/**. On that page you pick
images, type a title for each, press **Upload**, and the design appears in your Customers
Gallery about a minute later. You never edit `gallery.json` by hand again.

Behind the scenes the page saves your image into `assets/images/gallery/` and updates
`gallery.json` in your GitHub repository. Your host (Netlify, Vercel, GitHub Pages or
Cloudflare Pages) then republishes the site automatically.

**This only works if your live site is deployed from a GitHub repository.**
If you publish by dragging a zip file into a host, it will not work.

---

## Part 1 — Add the page to your website (once)

The only new file is `upload/index.html`.

1. Open your repository on **github.com**.
2. Click **Add file → Upload files**.
3. Drag the whole **`upload`** folder from your computer into the box
   (keep the folder, so the file ends up at `upload/index.html`).
4. Click **Commit changes**.
5. Wait about a minute, then open `https://YOUR-SITE/upload/` — you should see the uploader.

## Part 2 — Create your access token (once)

The token is a password that lets the uploader save files to your repository.

1. On github.com click your profile picture → **Settings**.
2. Scroll down → **Developer settings** → **Personal access tokens** → **Fine-grained tokens**.
3. Click **Generate new token**.
4. Name: `Gallery uploader`. Expiration: choose a long period (for example 1 year).
5. **Repository access** → **Only select repositories** → pick your website repository.
6. **Permissions → Repository permissions → Contents → Read and write**. Leave everything else off.
7. Click **Generate token** and **copy it now** (GitHub shows it only once).
   Keep a copy in a safe place, such as a password manager.

## Part 3 — Connect the uploader (once per phone or computer)

1. Open `https://YOUR-SITE/upload/`.
2. In **Connection settings** fill in:
   - **GitHub repository**: `your-github-username/your-repo-name`
   - **Branch**: `main` (change it only if your repository uses another branch)
   - **Access token**: paste the token from Part 2
3. Press **Save & test connection**. You should see "Connected to …".

The details are saved in that browser only. Do not do this on a shared or public computer.
If you ever use one by mistake, press **Forget this device** and delete the token on GitHub.

---

## Daily use

1. Open `https://YOUR-SITE/upload/`.
2. Tap **Tap to choose images** (you can select many at once).
3. Type a **title** for each image. The title appears under the design when a visitor opens it.
4. Press **Upload to gallery** and keep the page open until you see **Done**.
5. After about a minute, refresh your website. Newest designs show first.

Under **Current gallery** you can **Rename** a title or **Remove** a design
(this also deletes the image file).

Large images are shrunk automatically (longest side 2000 px, about 1 MB) so the site stays
fast. Untick that box if you want the original file uploaded exactly as it is.

---

## If something goes wrong

| Message | What to do |
|---|---|
| "GitHub rejected the token" | The token is wrong or expired. Create a new one (Part 2) and save it again. |
| "Not found…" | Check the repository name (`username/repo`), the branch, and that the token was given access to that repository. |
| "does not have permission to write" | Edit the token on GitHub and set **Contents** to **Read and write**. |
| Uploaded but the site did not change | Wait 1–2 minutes for the host to redeploy, then hard-refresh. Check your host's deploy list for errors. |
| A photo is refused | Only JPG, PNG and WEBP work. iPhone HEIC photos must be converted first (or set the iPhone camera to "Most Compatible"). |

## Good to know

- The `/upload/` page is visible to anyone who knows the link, but it cannot change anything
  without your token. Never share the token or put it inside any file in the repository.
- Your existing `/admin` page (Decap CMS) is separate and needs Netlify Identity and Git Gateway.
  Netlify has called Git Gateway deprecated, so this uploader is the simpler route. You can ignore `/admin`.
- Manual fallback: copy images into `assets/images/gallery/` on GitHub and add a line to
  `gallery.json`, as described in `GALLERY-SETUP.md`.
