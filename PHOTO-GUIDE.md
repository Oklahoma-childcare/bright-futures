# Replacing images

In `src/lib/photos.json`, replace any `src` with a verified and permission-cleared real photograph from the center. The other sections and responsive cropping adapt automatically.

## Suggested images to provide

| Key | Used for | Recommended type |
| --- | --- | --- |
| `hero` | Main homepage photo | Real facility playroom or exterior (landscape) |
| `feature` | Homepage story photo | Real classroom activities or spaces |
| `about` | Our Center page | Actual center interior or verified team photo |
| `infants` | Infant age card/page | Licensed infant learning area or equipment |
| `toddlers` | Toddler age card/page | Real toddler activity room |
| `preschool` | Preschool age card/page | Real preschool learning space |
| `schoolAge` | School-age card/page | School-age learning area |

## Example replacement

1. Copy the rights-cleared photo to `public/photos/hero.webp`.
2. Edit `src/lib/photos.json`, for the `hero` key:

```json
{
  "src": "/photos/hero.webp",
  "alt": "Bright Futures Childcare Center playroom in Stigler, Oklahoma",
  "position": "center center",
  "sourcePage": "Organization-provided photo, used with permission"
}
```

3. Run `npm run dev`, or `npm run build` before deployment.

Do NOT use images from Google Maps, Facebook or real-estate listings just because they are visible publicly. Cropping, applying filters, or modifying color does not remove copyright. Obtain explicit permission or a suitable license first. For identifiable children, obtain appropriate consent.

## Stock photographs supplied as temporary illustrations

The included image URLs point to Pexels photographs licensed for general website use, not photographs of this particular center. Their source pages (each separately identified in `src/lib/photos.json`):

- https://www.pexels.com/photo/child-playing-in-colorful-nursery-room-27177346/
- https://www.pexels.com/photo/room-decorated-with-children-drawings-8535142/
- https://www.pexels.com/photo/preschoolers-inside-a-classroom-8363040/
- https://www.pexels.com/photo/a-baby-bed-with-toys-decoration-6849272/
- https://www.pexels.com/photo/a-toddler-walking-in-a-playroom-19735000/
- https://www.pexels.com/photo/a-girl-in-the-classroom-8923527/
- https://www.pexels.com/photo/children-playing-with-their-toys-inside-the-school-8363047/

License: https://www.pexels.com/license/

These are externally hosted URLs and need an internet connection to load. For best speed and long-term reliability, download approved media, optimize as WebP/AVIF, store under `public/photos`, and update the JSON file. Do not imply that people in the stock images endorse or attend this childcare center.
