# Generates the static HTML pages. Run: python3 build.py   (not needed for deploying - the .html files are already generated)
SERVICES=[("flyers","Flyers","Promotional graphics designed to communicate your message quickly.","flyers.webp"),
("banners","Banners","Clear, high-impact layouts for events, campaigns and business displays.","banners.webp"),
("posters","Posters","Strong visual compositions for announcements, events and campaigns.","posters.webp"),
("logo","Logo Design","A distinctive visual mark built around your brand's identity.","logo-design.webp"),
("cards","Business Cards","Professional contact cards that make a considered first impression.","business-cards.webp"),
("labels","Label Designs","Product labels that organise information and strengthen shelf presence.","label-designs.webp"),
("brochures","Brochures","Structured print layouts that help explain your offer or organisation.","brochures.webp"),
("video","Video Editing","Purposeful edits for social content, promotions and event highlights.","video-editing.webp"),
("photo","Photo Mounting & Retouching","Thoughtful photo enhancement, mounting and clean finishing.","photo-mounting-retouching.webp"),
("photography","Event Photography","Photographic coverage to document the people and moments that matter.","event-photography.webp"),
("videography","Event Videography","Video coverage that captures key moments and atmosphere.","event-videography.webp"),
("packaging","Packaging Designs","Custom packaging layouts that make your product look polished and ready for the shelf.","packaging-designs.webp")]
S='fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'
IC={"ig":f'<svg viewBox="0 0 24 24" {S}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
"fb":f'<svg viewBox="0 0 24 24" {S}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
"tt":f'<svg viewBox="0 0 24 24" {S}><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.4 2.6 2.1 4.2 5 4.5"/></svg>',
"yt":f'<svg viewBox="0 0 24 24" {S}><rect x="2.5" y="5" width="19" height="14" rx="4"/><path d="M10 9l5 3-5 3z" fill="currentColor"/></svg>',
"wa":f'<svg viewBox="0 0 24 24" {S}><path d="M3 21l1.6-4.8A8.5 8.5 0 1 1 8 19.5z"/><path d="M9 8.5c0 3 2.5 5.5 6 6.5l1.3-1.5-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2z"/></svg>',
"ml":f'<svg viewBox="0 0 24 24" {S}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>'}
SOC=[("ig","Instagram","https://www.instagram.com/salasia769/"),("fb","Facebook","https://www.facebook.com/share/1G5sG8GXUS/"),("tt","TikTok","https://www.tiktok.com/@thee_flexor"),("yt","YouTube","https://youtube.com/@flexmedia_ke"),("wa","WhatsApp","https://wa.me/254724660864")]
socials='<div class="socials">'+''.join(f'<a href="{u}" target="_blank" rel="noopener noreferrer" aria-label="{n}">{IC[k]}</a>' for k,n,u in SOC)+'</div>'
def head(title,desc,active,body_cls=""):
    nav=[("our-services.html","Our Services"),("our-work.html","Our Work"),("contact-us.html","Contact Us")]
    links=''.join(f'<a href="{h}"{" class=on" if h==active else ""}>{t}</a>' for h,t in nav)
    return f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#061456">
<title>{title}</title><meta name="description" content="{desc}"><meta property="og:title" content="{title}"><meta property="og:description" content="{desc}"><meta property="og:type" content="website">
<link rel="icon" href="assets/images/flex-media-logo.webp" type="image/webp">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;600;700&family=Montserrat:wght@300;500;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/site.css"></head><body{body_cls}>
<header class="site-header"><a class="brand" href="index.html" aria-label="FLEX MEDIA DESIGNS home"><img src="assets/images/flex-media-logo.webp" alt="" width="50" height="50"><span class="brand-name">Flex Media<b>Designs</b></span></a>
<button class="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button><nav class="nav" aria-label="Main">{links}</nav></header>
'''
def foot(extra=""):
    return f'''<footer class="site-footer"><a class="brand" href="index.html" aria-label="FLEX MEDIA DESIGNS home"><img src="assets/images/flex-media-logo.webp" alt="" width="50" height="50"></a>{socials}
<div class="fb"><span>© <span id="yr"></span> FLEX MEDIA DESIGNS</span><span>Designed By FLEX MEDIA</span></div></footer>
{extra}<script src="js/work-config.js"></script><script src="js/hero-config.js"></script><script src="js/site.js"></script></body></html>'''
def w(n,t): open(n,'w').write(t)

w("index.html",head("FLEX MEDIA DESIGNS — Graphic Design & Media Production","Creative graphic design and media production by FLEX MEDIA DESIGNS. Flyers, posters, logos, packaging, video and photography.","index.html")+f'''<main><section class="hero" aria-label="Welcome">
<div class="word-wrap"><h1 class="word">CONCEPTUALIZE</h1></div>
{socials}<div class="dots" aria-hidden="true"></div>
<div class="hero-cap"><div class="arrows"><button id="prev" aria-label="Previous"><svg viewBox="0 0 24 24" {S}><path d="M15 5l-7 7 7 7"/></svg></button><button id="next" aria-label="Next"><svg viewBox="0 0 24 24" {S}><path d="M9 5l7 7-7 7"/></svg></button></div>
<small id="cur">CONCEPTUALIZE</small><hr><p id="tag">Every idea starts as a spark</p></div></section></main>
'''+foot())

cards=''.join(f'<article class="svc reveal"><div class="ph"><img loading="lazy" src="assets/images/services/{im}" alt="{n}"><span class="no">{i+1:02d}</span></div><div class="bd"><h3>{n}</h3><p>{d}</p><a class="more" href="contact-us.html?service={n.replace(" & ","%20%26%20").replace(" ","%20")}">Request this service →</a></div></article>' for i,(k,n,d,im) in enumerate(SERVICES))
w("our-services.html",head("Our Services — FLEX MEDIA DESIGNS","Everything FLEX MEDIA DESIGNS offers: flyers, banners, posters, logos, business cards, labels, brochures, video, photography and packaging.","our-services.html")+f'''<main><section class="page-hero tight"><span class="eyebrow">What we do</span><h1>Our Services</h1><p>From a single flyer to a full brand identity, we design and produce the pieces that help your idea get seen.</p></section>
<section class="section"><div class="svc-grid">{cards}</div></section>
<div class="cta-band reveal"><h2>Have a project in mind?</h2><a class="btn" href="contact-us.html">Start a conversation</a></div></main>
'''+foot())

pn=[("promo","Flyers","promo"),("campaign","Campaign Flyers","campaign"),("posters","Posters &amp; Banners","posters"),("brand","Brand &amp; Packaging","brand")]
import json
bgs={"promo":"assets/images/services/flyers.webp","campaign":"assets/images/gallery/jombaaa.webp","posters":"assets/images/services/posters.webp","brand":"assets/images/services/packaging-designs.webp"}
panels=''.join(f'<article class="panel"><div class="bg" style="background-image:url(\'{bgs[k]}\')"></div><h2>{t}</h2><div class="cnt" data-count="{k}">&nbsp;</div><a class="btn" href="gallery.html?cat={k}">View Gallery</a></article>' for k,t,_ in pn)
w("our-work.html",head("Our Work — FLEX MEDIA DESIGNS","Browse the designs FLEX MEDIA DESIGNS has created for customers: flyers, campaign designs, posters, banners, logos and packaging.","our-work.html")+f'''<main><section class="panels" aria-label="Work categories">{panels}</section>
<section class="work-intro reveal"><h2 class="rule">Our Work</h2><p>Every design here was made for a real customer. Explore our flyers, campaign designs, posters, banners, logos and packaging, then tell us about yours.</p><p style="margin-top:28px"><a class="btn" href="gallery.html">Browse everything</a></p></section></main>
'''+foot())

w("gallery.html",head("Gallery — FLEX MEDIA DESIGNS","Customer gallery of designs by FLEX MEDIA DESIGNS.","our-work.html")+f'''<main><section class="page-hero"><span class="eyebrow">Customer gallery</span><h1 id="gt">All Designs</h1><p id="gs">Everything we have designed, in one place</p></section>
<section class="section"><div class="chips" role="group" aria-label="Filter designs"></div><div class="masonry" id="masonry"><p class="empty">Loading designs…</p></div></section></main>
<div class="lb" role="dialog" aria-modal="true" aria-label="Design preview"><button class="x" aria-label="Close">×</button><button class="pv" aria-label="Previous">‹</button><button class="nx" aria-label="Next">›</button><img alt=""><div class="t"></div><a class="ord btn" href="contact-us.html">Order a design like this</a></div>
'''+foot())

chips=''.join(f'<label><input type="checkbox" name="svc" value="{n}"><span>{n}</span></label>' for k,n,d,im in SERVICES)
w("contact-us.html",head("Contact Us — FLEX MEDIA DESIGNS","Contact FLEX MEDIA DESIGNS. Send your project brief on WhatsApp or email and get a quote.","contact-us.html")+f'''<main><section class="page-hero"><span class="eyebrow">Let's talk</span><h1>Contact Us</h1><p>Tell us what you need. Your brief opens in WhatsApp (the fastest way to reach us) or in your email app, ready to send.</p></section>
<section class="section"><div class="contact"><div class="info">
<a class="card" href="https://wa.me/254724660864" target="_blank" rel="noopener"><span class="ic">{IC['wa']}</span><div><small>WhatsApp &amp; Calls</small><b>0724 660 864</b></div></a>
<a class="card" href="mailto:flexmediacreatives@gmail.com"><span class="ic">{IC['ml']}</span><div><small>Email</small><b>flexmediacreatives@gmail.com</b></div></a>
<a class="card" href="https://www.instagram.com/salasia769/" target="_blank" rel="noopener"><span class="ic">{IC['ig']}</span><div><small>Instagram</small><b>@salasia769</b></div></a>
<a class="card" href="https://www.tiktok.com/@thee_flexor" target="_blank" rel="noopener"><span class="ic">{IC['tt']}</span><div><small>TikTok</small><b>@thee_flexor</b></div></a>
<a class="card" href="https://youtube.com/@flexmedia_ke" target="_blank" rel="noopener"><span class="ic">{IC['yt']}</span><div><small>YouTube</small><b>@flexmedia_ke</b></div></a></div>
<form class="form" id="contact-form" novalidate><div><label class="l" for="name">Your name *</label><input id="name" name="name" type="text" autocomplete="name" required></div>
<div class="two"><div><label class="l" for="phone">Phone</label><input id="phone" name="phone" type="tel" autocomplete="tel"></div><div><label class="l" for="email">Email</label><input id="email" name="email" type="email" autocomplete="email"></div></div>
<div><span class="l" style="font:800 11px/1 var(--font);letter-spacing:.2em;text-transform:uppercase;display:block;margin-bottom:11px">Services needed *</span><div class="sv">{chips}</div></div>
<div><label class="l" for="message">Project brief *</label><textarea id="message" name="message" rows="5" placeholder="What do you need, and who is it for?" required></textarea></div>
<div class="actions"><button class="btn" type="submit">Send on WhatsApp</button><button class="btn ghost" type="button" id="mail">Send by Email</button></div><p class="status" id="status" role="alert"></p><p class="note">Nothing is stored on this website. Your message is prepared in WhatsApp or your email app for you to review and send.</p></form></div></section></main>
'''+foot())
