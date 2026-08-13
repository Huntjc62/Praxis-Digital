# PRAXIS Digital — extensionless URL build

This full package changes the public website URLs from `.html` files to GitHub Pages directory routes.

Routes:
- `/` Home
- `/services/` Services
- `/websites/` New websites
- `/redesign/` Website transformation
- `/systems/` Digital systems
- `/software/` Bespoke software
- `/work/` Our Work
- `/admin/` Admin dashboard

The package retains the PRAXIS Firebase enquiry system and includes the PRAXIS Digital logo, CSS, JavaScript, Firebase configuration, Firestore rules, CNAME and `.nojekyll`.

Because the custom domain `praxis-uk.digital` is connected to GitHub Pages, the internal links use root-relative paths. Upload the package contents to the root of the GitHub Pages repository.


## Google SEO / indexing setup

This package includes:
- `robots.txt` allowing Google and other search crawlers to access the public site while disallowing `/admin/`.
- `sitemap.xml` containing the canonical public PRAXIS URLs.
- Canonical URLs, Open Graph/Twitter metadata and descriptive page titles/descriptions.
- JSON-LD structured data for the website, service pages and public collections.
- A `noindex` directive on the admin page.

After deploying to `https://praxis-uk.digital/`, verify the domain in Google Search Console and submit `https://praxis-uk.digital/sitemap.xml`. Then use URL Inspection to request indexing for the homepage and key service pages. A sitemap helps discovery but does not guarantee indexing or rankings.
