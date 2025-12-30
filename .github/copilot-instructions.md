<!-- Copilot / AI agent instructions tailored to this repo -->
# Project snapshot

This is a Vite + React portfolio app with a small 3D scene using Three / @react-three/fiber. Key entry points:

- `src/main.jsx` — app bootstrap (renders `App`).
- `src/App.jsx` — client router and top-level layout (uses `react-router-dom` v7, `Navbar` and Pages).

# Quick dev commands

- Start dev server: `npm run dev` (runs `vite`).
- Build: `npm run build` (runs `vite build`).
- Preview build: `npm run preview` (runs `vite preview`).
- Lint: `npm run lint` (ESLint configured via `eslint.config.js`).

# Architecture & conventions (what to know first)

- Routing: routes are declared in `src/App.jsx` with `Routes` / `Route` elements. Add new pages under `src/pages/` and register routes here.
- Pages vs Components: site pages live under `src/pages/` (e.g., `home/Home.jsx`, `projects/Projects.jsx`); reusable UI parts go in `src/components/` (e.g., `components/navbar/`).
- Styles: global styles are in `src/styles/global.css`. Component CSS (e.g., `Navbar.css`) is colocated in the same folder as the component.

# 3D / Assets specifics

- 3D models live in `public/models/` and are imported in code (example: `src/components/models/Computer.jsx` imports `public/models/gaming_room.glb`).
- Vite is configured to include `.glb` via `assetsInclude` in `vite.config.js`. Use `useGLTF` from `@react-three/drei` and `@react-three/fiber` conventions for scene rendering.
- When adding new large assets, place them under `public/` to serve statically rather than bundling.

# Project-specific linting / code patterns

- `eslint.config.js` sets base rules and allows unused identifiers that match `^[A-Z_]` (used for components/constants). Respect that pattern when renaming symbols.
- The codebase uses modern ESM syntax (package.json `type: "module"`). Keep imports as `import` rather than `require`.

# Notable dependencies & pitfalls

- React 19 and `react-router-dom` v7 are used — check `App.jsx` for v7-style `element` routes.
- 3D stack: `three`, `@react-three/fiber`, `@react-three/drei`. Loading and traversing GLTF scenes may log mesh names (see `Computer.jsx`), so expect console output during dev.

# How AI agents should contribute

- Small changes: update the appropriate page under `src/pages/` and register routes in `src/App.jsx`.
- Adding 3D models: add `.glb` to `public/models/` and import with a relative path from the component (example in `components/models/Computer.jsx`).
- Styling: prefer colocated CSS for components and `src/styles/global.css` for global rules.
- Tests: no tests exist in the repo. Do not add test scaffolding unless requested.

# References (examples to inspect)

- `src/main.jsx` — app bootstrap
- `src/App.jsx` — routing
- `src/components/models/Computer.jsx` — GLTF loading example
- `vite.config.js` — `.glb` asset inclusion
- `eslint.config.js` — linting rules

If anything here is unclear or you'd like a different tone/level of detail (more examples, or merge with an existing internal guide), tell me which parts to expand or trim.
