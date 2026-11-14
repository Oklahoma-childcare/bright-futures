# Bright Futures Childcare Center — Stigler, Oklahoma

A custom, responsive five-page website using the same React + TypeScript + Vite + TanStack Router + Tailwind CSS 3 architecture as the provided reference. This project uses a different visual identity from the Sunflower and Sunny Days sites.

## Website pages

- `/` — Home
- `/age-groups/` — Infants, toddlers, preschool and school-age
- `/about/` — About the center and published details
- `/faq/` — Common parent questions
- `/contact/` — Click-to-call, email and directions

## Run in VS Code

Install **Node.js 22** (or a supported version for Vite 8), then open this project directory:

```bash
npm install
npm run dev
```

The local address is printed by Vite. To create a production build:

```bash
npm run build
```

Vite writes production files to `dist/`. Do not upload `src/` alone to hosting.

## Deploy using Vercel or Cloudflare Pages

- Framework: Vite
- Install: `npm install`
- Build: `npm run build`
- Output: `dist`
- Node: 22 or newer compatible version
- Production web pages are separate generated HTML entries (`index.html`, `age-groups/index.html`, `about/index.html`, `faq/index.html`, `contact/index.html`) and contain crawlable content without needing React to execute.

### SEO publication switch

**The site is deliberately noindex until permission to publish as the organization's website is confirmed and an authorized custom domain is chosen.** This prevents publishing an unofficial test site as if it were the center's official website.

Copy `.env.example` to `.env.local`, then — **only after approval** — set:

```bash
VITE_SITE_URL=https://YOUR-APPROVED-DOMAIN.com
VITE_PUBLICATION_APPROVED=true
```

Re-run `npm run build`. The generator then adds canonical tags, `index,follow` meta directives, absolute social preview images and `public/sitemap.xml`. The `robots.txt` includes the sitemap URL. Until then, it remains a functional unpublished review build with noindex.

After publishing: verify HTTP redirects and HTTPS, confirm Google Search Console, request indexing of home and age-group pages, check sitemap, test Core Web Vitals and check that images load.

## Change the photos

Edit `src/lib/photos.json`. Each image is controlled by `src`, `alt`, `position`, and `sourcePage` fields. Photos may also be stored under `public/photos/` and referenced by a path like `/photos/hero.webp`. The build updates all generated pages automatically. See `PHOTO-GUIDE.md` for filenames, permission and credits. The bundled Pexels URLs are **illustrative photography, not real photographs of Bright Futures Childcare Center**. Actual facility images require the relevant reuse permission, and images identifying children require consent.

## Change social profiles

Edit `src/lib/social-links.json`. Add an official verified HTTPS Facebook, Instagram or YouTube page. Empty entries are hidden. The personal Facebook profile in the spreadsheet has NOT been linked as an official organization account.

## Change business details

Edit `src/lib/site.json` and (where necessary) `src/lib/render-page.mjs` to update content. Run `npm run generate` to refresh prerendered HTML when running outside Vite.

## Source data

Facts were checked against the Oklahoma Human Services Child Care Locator:
https://childcarefind.okdhs.org/providers/K830058402

Published listing: Bright Futures Childcare Center, 902 E Main St, Stigler, OK 74462, (918) 471-6038, 2rcoles@sbcglobal.net; director Ronda Cole; infant/toddler/preschool/school-age; Monday–Friday 7:30 AM–5:30 PM; capacity 22; license K830058402; one-star program level.

The website does not assert unverified curriculum, staffing credentials, reviews, tuition, openings or availability.

## Technical notes

- SEO uses HTML pre-rendered by `scripts/generate-pages.mjs`; React and TanStack Router enhance navigation after loading.
- Global CSS: `src/index.css`; the generator publishes a CSS copy at `public/site.css` for the prerendered pages.
- Interactive menu: `public/site.js`; FAQ uses native accessible `<details>` elements.
- `public/og-card.png` is a custom branded social preview image, not a business photograph.
- No form backend or database is included; contact actions link to working phone, email and maps actions instead of pretending to submit requests.
- The five HTML files in the root/route directories are source prerenders, not a separate static-preview folder.
- This environment could generate pages and run static/mobile UI checks, but could not install npm dependencies because `registry.npmjs.org` was unavailable. The complete production Vite build remains to be run on a machine with registry access.
