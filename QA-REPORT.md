# QA results — 14 November 2026

## Passed (local static HTML and isolated browser layout tests)

- Five unique route pages generated successfully: Home, Age Groups, Our Center, FAQs, Contact.
- All five pages contain a unique H1, title, description, and JSON-LD business structured data.
- The FAQ page includes FAQPage JSON-LD and working native details/summary interactions.
- All internal links in generated HTML point to present route files.
- Phone links use tel:, email links use mailto:, and maps links use the exact Stigler address.
- All images include meaningful alternative text and can be replaced through `src/lib/photos.json`.
- Responsive viewports 1440 x 900 and 390 x 844 tested on all five pages: no horizontal overflow.
- Mobile menu expands/collapses and Escape key closes it.
- Unapproved publications correctly generate `noindex,nofollow`; no fictitious canonical URL or sitemap.
- The project contains no static-preview folder.

## Outstanding checks

- Full `npm install`, `tsc`, and production `npm run build` cannot be run here because DNS access to `registry.npmjs.org` was unavailable. Build must be tested on a machine with npm registry access.
- Remote Pexels photo loading and Google Fonts were not tested in the isolated browser (network requests were disabled in QA). Verify after installation/deployment or host optimized images locally.
- The Pexels images depict illustrative scenes, **not actual facilities or children attending Bright Futures**. Obtain rights-cleared real center photos to meet the requested photo requirement.
- Confirm official social channels and organization authorization before making the site public or setting `VITE_PUBLICATION_APPROVED=true`.
