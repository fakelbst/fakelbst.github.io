# fakelbst.github.io

Personal homepage for `fakelbst`, built with React, TypeScript, TanStack Router, and TanStack Query.

## Development

```bash
npm install
npm run dev
```

The active app source now lives under `app/`, while production files are built into a temporary `.pages-dist/` directory and then synced back to the repository root so `/index.html` stays directly accessible.

## Data refresh

The Music page uses a build-time scraper against the public Last.fm library pages for `fakelbst`.

```bash
npm run refresh:lastfm
```

## Production build

```bash
npm run build
```

`npm run build` first builds into `.pages-dist/`, then publishes `index.html`, `build-assets/`, and `data/` back into the repository root. That keeps the root deployable on GitHub Pages without needing a committed `dist/` folder.

> personal website
