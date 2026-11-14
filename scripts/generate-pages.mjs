import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGE_META, renderPage, faqData } from '../src/lib/render-page.mjs';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const json = p => JSON.parse(fs.readFileSync(path.join(root,p), 'utf8'));
const site = json('src/lib/site.json');
const photos = json('src/lib/photos.json');
const social = json('src/lib/social-links.json');
const env = {...process.env};
for (const file of ['.env', '.env.local']) {
  const filePath = path.join(root,file);
  if(!fs.existsSync(filePath)) continue;
  for(const line of fs.readFileSync(filePath,'utf8').split(/\r?\n/)){
    const match = line.match(/^\s*(VITE_[A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if(match) env[match[1]] = match[2].replace(/^["']|["']$/g,'');
  }
}
const siteUrl = String(env.VITE_SITE_URL || '').trim().replace(/\/$/,'');
const authorized = env.VITE_PUBLICATION_APPROVED === 'true';
const publicDomain = /^https:\/\/[^/\s]+\.[^/\s]+$/.test(siteUrl) && !/(?:vercel\.app|pages\.dev|localhost|127\.0\.0\.1|example\.(?:com|org))/i.test(siteUrl);
if (authorized && !publicDomain) throw new Error('VITE_PUBLICATION_APPROVED=true requires an authorized custom HTTPS domain set in VITE_SITE_URL.');
const indexable = authorized && publicDomain;
const h = x => String(x??'').replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const jsonld = obj => JSON.stringify(obj).replaceAll('<','\\u003c');
const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.street}, ${site.city}, ${site.stateCode} ${site.postalCode}`)}`;
const business = {
  '@context':'https://schema.org',
  '@type':'ChildCare',
  name:site.name,
  identifier:site.license,
  telephone:site.phoneHref,
  email:site.email,
  address:{'@type':'PostalAddress',streetAddress:site.street,addressLocality:site.city,addressRegion:site.stateCode,postalCode:site.postalCode,addressCountry:'US'},
  geo: undefined,
  areaServed:{'@type':'City',name:site.city},
  hasMap:maps,
  openingHoursSpecification:[{'@type':'OpeningHoursSpecification',dayOfWeek:['Monday','Tuesday','Wednesday','Thursday','Friday'],opens:site.hoursOpening,closes:site.hoursClosing}],
  sameAs:[site.providerUrl,...Object.values(social).filter(v=>typeof v==='string'&&/^https:\/\//.test(v))]
};
if(indexable) business.url = `${siteUrl}/`;

// Public CSS is also available without JS, including while Google crawls the pages.
const stylesheet = fs.readFileSync(path.join(root, 'src/index.css'),'utf8').replace(/^@tailwind (base|components|utilities);\s*$/gm,'');
fs.writeFileSync(path.join(root,'public/site.css'),stylesheet);
const routes = Object.keys(PAGE_META);
for (const route of routes) {
  const meta = PAGE_META[route];
  const routeWithSlash = route==='/'?'/':`${route}/`;
  const canonical = indexable?`${siteUrl}${routeWithSlash}`:'';
  const faqLd = route==='/faq'?`<script type="application/ld+json">${jsonld({'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqData()})}</script>`:'';
  const preload = route==='/' && photos.hero?.src ? `<link rel="preload" as="image" href="${h(photos.hero.src)}" fetchpriority="high">` : '';
  const html = `<!doctype html>
<html lang="en-US">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${h(meta.title)}</title><meta name="description" content="${h(meta.description)}">
<meta name="theme-color" content="#38263f"><meta name="color-scheme" content="light">
<meta name="robots" content="${indexable?'index,follow,max-image-preview:large':'noindex,nofollow'}">
${canonical?`<link rel="canonical" href="${h(canonical)}">`:''}
<meta property="og:type" content="website"><meta property="og:site_name" content="Bright Futures Childcare Center">
<meta property="og:locale" content="en_US"><meta property="og:title" content="${h(meta.title)}">
<meta property="og:description" content="${h(meta.description)}">
${canonical?`<meta property="og:url" content="${h(canonical)}"><meta property="og:image" content="${h(siteUrl)}/og-card.png">`:''}
<meta name="twitter:card" content="${canonical?'summary_large_image':'summary'}">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://images.pexels.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Fraunces:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">
${preload}<link rel="stylesheet" href="/site.css">
<script type="application/ld+json">${jsonld(business)}</script>${faqLd}
<script src="/site.js" defer></script>
</head>
<body><div id="root">${renderPage(route,site,photos,social)}</div><script type="module" src="/src/main.tsx"></script></body>
</html>`;
  const dirname = route==='/'?root:path.join(root,route.slice(1));
  fs.mkdirSync(dirname,{recursive:true});
  fs.writeFileSync(path.join(dirname,'index.html'),html);
}
if(indexable){
  fs.writeFileSync(path.join(root,'public/sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(r=>`<url><loc>${siteUrl}${r==='/'?'/':`${r}/`}</loc></url>`).join('')}</urlset>\n`);
  fs.writeFileSync(path.join(root,'public/robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
}else{
  fs.rmSync(path.join(root,'public/sitemap.xml'),{force:true});
  fs.writeFileSync(path.join(root,'public/robots.txt'),'User-agent: *\nAllow: /\n');
}
console.log(`Generated ${routes.length} prerendered pages (${indexable?'indexing approved':'unpublished noindex'})`);
