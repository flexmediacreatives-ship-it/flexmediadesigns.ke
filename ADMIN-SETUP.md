# FLEX MEDIA DESIGNS — easy website editor and email setup

## Primary email
The business contact email is set to **flexmediacreatives@gmail.com** in `js/config.js` and `site-settings.json`. The contact page and email links now use that address. The website's contact/inquiry forms currently open WhatsApp; they do **not** send an email automatically.

## Edit the site without editing code
This project includes a visual editor at `/admin/` (Decap CMS). It lets you update business details, the primary email, WhatsApp number, phone number and tagline using form fields.

For the editor to save changes, deploy the website to **Netlify** and connect the GitHub repository:
1. Push the entire project folder to your GitHub repository (keep `admin/`, `site-settings.json`, `netlify.toml`, `js/`, `css/`, and `assets/`).
2. In Netlify, choose **Add new site → Import an existing project** and connect that GitHub repository. Set the publish directory to `.` (the included `netlify.toml` does this).
3. In Netlify site settings, enable **Identity**. Under Identity registration, choose **Invite only**.
4. Under **Identity → Services**, enable **Git Gateway**.
5. Invite `flexmediacreatives@gmail.com` as an Identity user and accept the invitation from that inbox.
6. Visit `https://YOUR-SITE-DOMAIN/admin/`, sign in, and open **Business Details → Contact and Website Details**. Edit the fields and click Publish.
7. Confirm that the repository's production branch is `main`. If your repository uses another branch, change `branch: main` in `admin/config.yml` to that branch.

The editor will not be able to publish edits until Netlify Identity and Git Gateway are enabled. Do not put passwords, private API keys, or service-role keys in this repository.

## Important limitations
- The email address is now the site's primary contact address, but this does not connect the site to the Gmail inbox for sending mail. Email links open the visitor's email app. WhatsApp inquiries still need the visitor to press Send in WhatsApp.
- A static website cannot safely provide private multi-user editing on its own; the editor requires the Netlify setup above.
- Replace sample portfolio images/text with your own real work before launch.

## Customers Gallery
Uploading customer designs is explained in GALLERY-SETUP.md.
