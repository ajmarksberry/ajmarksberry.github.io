# v2 pages (work in progress)

New versions of the portfolio pages, kept separate from the live Next.js pages.
Nothing in `src/` uses these files, and every page has `noindex` so search engines skip it.

- Local: `npm run dev`, then open http://localhost:3000/v2/index.html
- Deployed: https://ajmarksberry.com/v2/ (only once this branch is merged to `main`)

Pages: index, about, taap-itinerary-builder, taap-trips, reach.
Missing screenshots are listed in IMAGES-NEEDED.txt; drop them into `public/v2/images/`.
TAAP Trips reuses the existing images in `public/images/taap/`.
