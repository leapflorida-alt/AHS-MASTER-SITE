# SEO and AI visibility change log

Audit date: 2026-08-28

## Evidence reviewed

- Audited all 58 top-level HTML documents in the repository for titles, meta descriptions, canonical URLs, H1 counts, and JSON-LD presence.
- Confirmed 56 indexable URLs in `sitemap.xml`; the excluded documents are the 404 and post-conversion thank-you pages.
- Confirmed every indexable page has one title, a unique meta description, a canonical URL, and exactly one H1.
- Confirmed the live homepage and representative inner page return HTTP 200 from Netlify.
- Reviewed the authenticated Semrush Site Audit screenshots supplied by the site owner: 100/100 pages crawled, 95% Site Health, 93% AI Search Health, 56 errors, 0 warnings, and 41 notices for pages with only one incoming internal link.
- Semrush attributed the 56 errors to 38 invalid structured-data items and 18 duplicate meta descriptions. Expanded issue evidence identified the schema fields as a required LocalBusiness address and an unsupported `serviceType` property.
- Compared Semrush's duplicate-description groups with both the current repository and the live deployment. The repository already contains unique descriptions, while the live deployment serves the same stale general-contracting description on the affected pages; deployment drift—not missing source copy—is the cause.

## Changes

- Replaced `no-store` on HTML with revalidation-friendly public caching. This allows browser and edge revalidation without serving stale HTML.
- Added `nosniff`, strict-origin referrer, and restrictive camera/microphone/geolocation response headers.
- Added `X-Robots-Tag: noindex` for the custom 404 and post-conversion thank-you pages.
- Expanded homepage structured data into a connected business and website entity graph with stable IDs, logo, image, description, service areas, and contact details.
- Replaced sitewide `HomeAndConstructionBusiness` provider nodes with `Organization` nodes because the company is represented as a service-area business and no verified public street address is available. This removes the false LocalBusiness address requirement without fabricating an address.
- Replaced invalid `serviceType` properties on organization nodes with the supported `knowsAbout` property. Existing location landing pages retain their more specific `Service` schema.
- Normalized project JSON-LD that used JavaScript-style single-quoted values into strict JSON.
- Added Open Graph and Twitter card metadata to the homepage for richer sharing and entity consistency.
- Added `llms.txt` as a concise, factual map of primary services and authoritative company pages.

## Deliberately not changed

- Existing service, location, project, and blog copy was preserved because no evidence supported a rewrite.
- Existing unique titles and descriptions were preserved even when some titles exceed common display heuristics; truncation is not a ranking defect and blind shortening could remove valuable location intent. Deployment of the current source will replace the stale duplicate description currently served by the live site.
- No aggregate ratings or review counts were added to schema because the repository does not contain a verifiable first-party source for those numbers.
- No street address, opening hours, price range, contractor license, or employee claims were invented.

## Deployment verification

- Git commit: `0efa384` (`Fix service-area schema and SEO metadata`)
- Netlify production deploy: `6a92327faa31b963c362d300`
- Verified the live homepage returns HTTP 200 with the `Organization`/`WebSite` entity graph and social metadata.
- Verified representative live pages now serve distinct meta descriptions instead of the stale general-contracting description.
- Verified live HTML uses `Cache-Control: public, max-age=0, must-revalidate` plus the new security headers.
- Verified `/thank-you.html` returns `X-Robots-Tag: noindex, follow`, `/llms.txt` returns HTTP 200, and the obsolete `/projects/about.html` copy returns HTTP 404.
