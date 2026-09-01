# PRAXIS Digital — Flat GitHub Pages Package

This version deliberately contains **all website pages as files in the repository root**. There are no page folders.

Pages:
- index.html
- what-we-build.html
- services.html
- marketing.html
- websites.html
- redesign.html
- systems.html
- software.html
- work.html
- website-quiz.html
- admin.html

The site therefore uses `.html` URLs. This is the reliable approach for a completely flat GitHub Pages repository; clean `/page/` URLs require directory-based `index.html` files or another routing layer.

Keep `CNAME`, `firebase-config.js`, `firebase-enquiries.js`, `firestore.rules`, `firebase.json`, `styles.css`, `script.js`, `admin.js`, `robots.txt`, `sitemap.xml`, `.nojekyll`, and `praxis-digital-logo.png` in the repository root.

FONT CONSISTENCY UPDATE
- All pages now load the same Google Fonts as the homepage: DM Sans for body/interface text and Manrope for headings/titles.
- Global heading styles enforce Manrope consistently across all pages.
- Stylesheet cache version bumped to ensure deployed browsers receive the updated typography.
