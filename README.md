# Monaco Diff Viewer Demo

A minimal React app to demo Monaco Editor's side-by-side diff viewer. Easily compare two texts with a clean UI.

## Features

- Monaco Editor diff viewer (side-by-side)
- Simple UI: two textareas for input, diff below
- Minimal, clean styling
- Deployable to GitHub Pages

## Getting Started

### Local Development

```bash
npm install
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

1. Commit your changes to your repo.
2. Run:
   ```bash
   npm run deploy
   ```
   This will build the app and push the `dist` folder to the `gh-pages` branch.
3. Set your repo's GitHub Pages source to the `gh-pages` branch.

## Notes

- The `base` in `vite.config.ts` and `homepage` in `package.json` are set for relative paths (required for gh-pages).
- You can change the default text in `src/App.tsx`.

---

MIT License
