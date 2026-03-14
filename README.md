# fakelbst.github.io

Personal homepage for `fakelbst`, built with React, TanStack Router, TanStack Query, and a custom Three.js landing scene.

## Development

```bash
npm install
npm run dev
```

## Data refresh

The Music page uses a build-time scraper against the public Last.fm library pages for `fakelbst`.

```bash
npm run refresh:lastfm
```

## Production build

```bash
npm run build
```

The included GitHub Actions workflow deploys the built `dist/` output to GitHub Pages.

> personal website

