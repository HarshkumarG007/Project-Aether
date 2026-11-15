# Development Rules & AI Guidelines
## Project Aether

**Version:** 2.0.0  
**Last Updated:** 2026-11-15

---

## 1. Core Principle

> **Never skip: IDEA → AI → DEPLOY**  
> Every code change must be intentional, documented, and tested. No blind generation.

---

## 2. Tech Stack Rules

### Framework
- **React 19** functional components only. No class components.
- Use **hooks** for all state and side effects.
- Prefer **named exports** for utility functions; **default exports** for components.

### State Management
- All global state lives in **`src/store/useAetherStore.js`** (Zustand).
- Components subscribe to **only the state they need** (selector pattern):
  ```js
  const activeWindow = useAetherStore((state) => state.activeWindow); // ✅
  const store = useAetherStore(); // ❌ subscribes to everything
  ```
- **Never put derived state in the store** — compute it in the component.
- New HUD windows require **no store changes** — `toggleWindow('any-key')` works for any string.

### Styling
- **Tailwind CSS v4** utility classes only. No inline `style={{}}` for layout.
- `style={{}}` is acceptable only for dynamic 3D transforms (TiltCard) and animation states.
- Color tokens from `@theme` in `index.css`: use `text-aether-green`, `border-aether-green/20`, etc.
- Glassmorphic surfaces: `bg-black/80 backdrop-blur-xl border border-white/10`.
- Never use `!important` in CSS.

### Three.js / R3F
- **Memoize all Three.js geometry** with `useMemo`:
  ```js
  const geo = useMemo(() => new THREE.BoxGeometry(2, 6, 2), []); // ✅
  // Never: args={[new THREE.BoxGeometry(...)]} inside JSX // ❌
  ```
- Use `useFrame` for per-frame updates only. Keep frame logic minimal.
- Use `depthWrite={false}` on additive/transparent materials.
- `toneMapped={false}` on emissive HDR materials.
- Avoid dynamic creation of textures/materials inside `useFrame`.

---

## 3. File Organization Rules

| What | Where |
|---|---|
| Global identity data | `src/data/persona.js` → `PERSONA` export |
| Project case studies | `src/data/projects.json` |
| Skill capabilities | `src/data/skills.json` |
| New HUD windows | `src/components/hud/NewWindow.jsx` |
| New canvas objects | `src/components/canvas/NewObject.jsx` |
| New reusable UI | `src/components/ui/NewWidget.jsx` |
| New custom hooks | `src/hooks/useNewHook.js` |
| Documentation | `docs/` |

---

## 4. HUD Window Pattern

Every HUD window **must** follow this pattern:

```jsx
const MyWindow = () => {
  const activeWindow = useAetherStore((state) => state.activeWindow);
  const toggleWindow = useAetherStore((state) => state.toggleWindow);

  if (activeWindow !== 'my-key') return null; // ← early return

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 ... animate-fade-in pointer-events-auto">
      {/* Header with X close button */}
      {/* Content */}
    </div>
  );
};
```

**Register in:**
1. `CommandCenter.jsx` — add a `HudButton` and camera target
2. `App.jsx` — import and render `<MyWindow />` in the city phase block

---

## 5. Content Integrity Rules (CRITICAL)

These rules are **absolute**. Violating them undermines the portfolio's credibility.

### ✅ Always
- Use only information from `PERSONA` in `persona.js` (the source of truth)
- Cite offline evaluation caveats when displaying metrics
- Label articles as "IDEA" vs "PUBLISHED" explicitly
- Use real GitHub URLs; never `href="#"` for external links

### ❌ Never
- Fabricate employers, dates, job titles, or qualifications
- Invent performance metrics, benchmark scores, or production stats
- Claim security certifications or penetration-test validation without evidence
- Merge separate experience entries (Arque AI Specialist ≠ Arque AI Trainer)
- Use fake GitHub contribution graphs or visitor counters
- Display fake progress bars representing skill "proficiency %"

---

## 6. Component Rules

### Naming
- Components: `PascalCase` (e.g., `ProjectsWindow`)
- Hooks: `camelCase` prefixed with `use` (e.g., `useDeviceTier`)
- Data files: `camelCase` (e.g., `projects.json`, `persona.js`)
- CSS classes: Tailwind utilities only

### Props
- Destructure props at function signature: `const MyComp = ({ label, onClick }) => {}`
- Provide default props inline: `const MyComp = ({ count = 0 }) => {}`
- Never use `PropTypes` (project uses JSDoc comments if documentation needed)

### Accessibility
- All interactive elements need `aria-label` when icon-only
- Buttons need `aria-pressed` when they have an active state
- All `<a>` tags to external URLs: `target="_blank" rel="noreferrer"`
- Avoid removing focus outlines — override with custom ring styles instead

---

## 7. Import Rules

- Lucide React icons: check available names against installed version (v1.27).
  - ❌ `Github`, `Linkedin` — not exported
  - ✅ `Globe`, `Briefcase`, `ExternalLink`, `Award`, `Mail`, etc.
- Three.js: import from `'three'` not from sub-paths
- R3F: import from `'@react-three/fiber'`
- Drei: import from `'@react-three/drei'`

---

## 8. Error Handling

- **Build errors:** Fix immediately before committing. Zero build errors is a hard requirement.
- **Runtime errors:** Use `console.warn` (not `console.error`) for non-critical issues (e.g., API rate limits).
- **API failures:** Always provide graceful fallback data (see `DevHQWindow` pattern).
- **Missing data:** Use optional chaining (`?.`) and nullish coalescing (`??`) throughout.

---

## 9. Git Rules

- Commit messages: `type: description` (e.g., `feat: add AboutWindow`, `fix: lucide icon names`)
- Never commit to `main` with a failing build
- Tag releases: `V.X.Y` format (e.g., `V.1.0`, `V.2.0`)
- Never commit secrets or personal data not already public

---

## 10. Performance Rules

- Lazy-load heavy components where possible
- Keep `useFrame` callbacks minimal (rotation, position only)
- Never call `setState` inside `useFrame`
- Use `React.memo` on expensive static components
- Prefer `pointer-events-none` on non-interactive overlays
- Keep the 3D canvas `frameloop='never'` when not visible

---

## 11. What to Avoid

| Avoid | Reason |
|---|---|
| Fake terminal output claiming real functionality | Misleading |
| Animated "loss" / "accuracy" counters | Fake ML theater |
| Generic AI aesthetics (neon purple gradients) | Off-brand |
| `cursor: none` broken on mobile | Use conditional cursor hiding |
| Excessive glassmorphism stacking | Performance and readability |
| `any` or `Object` type for 3D transforms | Use explicit shape |
| Installing new heavy dependencies without justification | Bundle bloat |
