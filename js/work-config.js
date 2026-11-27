/* =====================================================================
   OUR WORK  -  how gallery designs are sorted into the 4 work panels
   ---------------------------------------------------------------------
   Panels (cat):  promo | campaign | posters | brand
   A design not listed in "assign" is sorted automatically from its title
   (e.g. "VOTE", "ELECTION" -> campaign; "BANNER"/"POSTER" -> posters;
   "LOGO", "PACKAGING" -> brand; everything else -> promo).
   To pin a design, add:  "file name.webp": ["cat", "Service label"]
   ===================================================================== */
window.WORK_CONFIG = {
  cats: {
    promo:    { title: "Flyers",              bg: "assets/images/services/flyers.webp",           blurb: "Promotional and awareness flyers" },
    campaign: { title: "Campaign Flyers",     bg: "assets/images/gallery/jombaaa.webp",           blurb: "Election and leadership campaign designs" },
    posters:  { title: "Posters & Banners",   bg: "assets/images/services/posters.webp",          blurb: "Posters, event banners and adverts" },
    brand:    { title: "Brand & Packaging",   bg: "assets/images/services/packaging-designs.webp", blurb: "Logos, packaging and print layouts" }
  },
  assign: {
    "jombaaa.webp":["campaign","Flyers"],"KAMKUNJI 9TH ELECTIONS 6.webp":["campaign","Flyers"],"OMOIT MARTRTIN BABA FASS FINAL.webp":["campaign","Flyers"],
    "BABA FASS.webp":["campaign","Flyers"],"ISAAC OMUTO MATHS CLUB.webp":["campaign","Flyers"],"SHISIA BANICE 1.webp":["campaign","Flyers"],
    "KIPCHIRCHIR ELCTION FLYER.webp":["campaign","Flyers"],"JOMBA ELECTION FLYER.webp":["campaign","Flyers"],"TOBBY.webp":["campaign","Flyers"],
    "MAYER 24.webp":["campaign","Flyers"],"MWENDWA4.webp":["campaign","Flyers"],"Mutua ben PROFFESSIONALLE.webp":["campaign","Flyers"],"PEACHES223888.webp":["campaign","Flyers"],
    "social-media.webp":["posters","Posters"],"EMPOWERHER APRIL.webp":["posters","Posters"],"THE 9TH RACE RADIO PROMO.webp":["posters","Posters"],
    "EMPOWERHERSAVE A GIRL.webp":["posters","Posters"],"NEW MONTH.webp":["posters","Posters"],"SHEED EX FLYER.webp":["posters","Posters"],
    "pink cycle poverty and menstruation.webp":["posters","Posters"],"posters.webp":["posters","Posters"],"mashujaa day1.webp":["posters","Posters"],
    "banners.webp":["posters","Banners"],"EVENT BANNER.webp":["posters","Banners"],"TRYSCENT VERTICAL REDONE.webp":["posters","Banners"],
    "AURACARE LOGO.webp":["brand","Logo Design"],"WABUKHONYI CONTEST CERTIFICATE.webp":["brand","Print Layouts"],
    "PACKAGING DESIGN.webp":["brand","Packaging Designs"],"pink-cycle-reusable-pads-packaging-pcfk.webp":["brand","Packaging Designs"]
  }
};
