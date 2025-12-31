<!-- Copilot / AI agent instructions tailored to this repo -->

# Project snapshot

This is a Vite + React portfolio app with interactive 3D scenes using Three.js and @react-three/fiber. Key entry points:

- src/main.jsx -- app bootstrap (creates React root, mounts App).
- src/App.jsx -- BrowserRouter with all page routes and persistent Navbar.

# Quick dev commands

- Start dev server: 
pm run dev (Vite dev server).
- Build: 
pm run build (output to dist/, includes GLTF models via ssetsInclude).
- Preview built site: 
pm run preview.
- Lint: 
pm run lint (ESLint, allows unused vars matching ^[A-Z_] for component names).

# Architecture

**File structure purpose:**
- src/pages/ -- Full-page views (Home, Projects, Skills, Experience, Contact); each is a route.
- src/components/ -- Reusable UI parts and 3D scenes (
avbar/, models/, 3d/).
- src/styles/global.css -- Global reset and utility styles.
- Component CSS -- Colocated with component (e.g., Navbar.jsx + Navbar.css in same folder).

**Routing:**
All routes are declared in src/App.jsx using react-router-dom v7 (uses element prop, not component):
``jsx
<Route path="/projects" element={<Projects />} />
``
Add new pages by creating a new folder under src/pages/, then register the route in src/App.jsx.

**React patterns in use:**
- React 19 with hooks (useState, useEffect, Suspense).
- @react-spring/web for staggered animations (see Home.jsx for animation sequencing pattern).
- 
eact-icons for social/UI icons.
- Functional components only; no class components.

# 3D rendering & assets

**GLTF models:**
- Place .glb files in public/models/.
- Import with useGLTF from @react-three/drei.
- Access scene via useThree() hook (e.g., iewport, camera).
- Example: src/components/models/Computer.jsx loads gaming_room.glb and logs mesh names for debugging.

**Vite config:**
ite.config.js includes .glb in ssetsInclude so models are served statically, not bundled.

**3D component examples:**
- src/components/3d/ManoModel.jsx -- Custom 3D character/avatar.
- src/components/3d/ParticleBackground.jsx -- Animated particle system (used in Home page).
- Wrap 3D scenes in Suspense for loading states.

# Code patterns & conventions

**ESLint rules:**
- 
o-unused-vars allows names matching ^[A-Z_] (e.g., ComputerModel, ANIMATION_DELAY).
- Modern ESM syntax only (import, not 
equire).

**Component patterns (see Navbar.jsx):**
- State for UI toggles and scroll detection.
- useEffect for window events (resize, scroll); always clean up listeners in return statement.
- useSpring animations for transitions (menu open/close, page entrance effects).

**Animation pattern (Home.jsx):**
- Use useSpring with staggered delay values for entrance animations.
- Config: { tension: 80, friction: 20 } for snappy, responsive feel.
- Wrap content in nimated divs from @react-spring/web.

# Notable dependencies & pitfalls

- **react-router-dom v7** -- Client-side routing (v7 uses element, older versions used component).
- **@react-three/fiber** -- React renderer for Three.js scenes.
- **@react-three/drei** -- Utilities for loading models, camera controls, etc.
- **@react-spring/web** -- Spring-physics animations (used for page entrance effects).
- **Swiper v12** -- Carousel/slider component (may be used on Projects or other pages).
- **react-icons v5** -- Icon library (GitHub, LinkedIn, hamburger menu, etc.).

# Common gotchas

- **GLTF console output:** Mesh name logging in 3D components is intentional for debugging; expect console.log during dev.
- **React 19:** Some older React patterns won't work; favor hooks.
- **Responsive 3D:** Use useThree().viewport to detect mobile breakpoints and adjust model scale/position.
- **Navbar responsive:** Menu opens at innerWidth < 900px; modal links use router Link elements.

# Workflow for AI agents

**Adding a new page:**
1. Create src/pages/newpage/NewPage.jsx and NewPage.css.
2. Add route to src/App.jsx: <Route path="/newpage" element={<NewPage />} />.
3. Update navbar links in src/components/navbar/Navbar.jsx if needed.

**Adding 3D assets:**
1. Place .glb in public/models/.
2. Create component in src/components/models/ (or src/components/3d/ for reusable effects).
3. Use useGLTF('/models/filename.glb') and useThree() for viewport-aware scaling.

**Styling:**
- Global utilities in src/styles/global.css.
- Component-specific CSS in same folder as component (colocated).
- Plain CSS only (no CSS-in-JS, Tailwind, or CSS Modules).

**Testing:** No test suite. Do not scaffold tests unless explicitly requested.

# API & Backend integration

**Vercel Serverless Functions:**
- API endpoints live in `api/` folder (auto-deployed by Vercel).
- Each `.js` file becomes a route: `api/projects.js` → `https://yourdomain.com/api/projects`.
- Return JSON responses; add `Cache-Control` headers for performance.

**Global State Management:**
- `src/context/APIContext.jsx` — Global API state with built-in caching (5 min TTL).
- Manages: data, loading states, errors, and automatic request deduplication.
- Uses `useReducer` for predictable state updates.

**Custom Hooks:**
- `useFetchEndpoint('/api/projects')` — Auto-fetches on mount, returns `{ data, loading, error, refetch }`.
- `useAPI()` — Lower-level hook for manual control: `const { fetchData, state, clearCache } = useAPI()`.

**Error Handling:**
- `ErrorBoundary` component wraps `App` to catch and display render errors gracefully.
- API errors automatically stored in context; components can display error UI conditionally.

**Performance Optimizations:**
- 5-minute request caching prevents duplicate API calls for same endpoint.
- `useMemo` and `useCallback` prevent unnecessary context re-renders.
- Serverless functions benefit from Vercel's edge caching and auto-scaling.

**Example:** `src/components/examples/ProjectsExample.jsx` shows proper usage pattern.