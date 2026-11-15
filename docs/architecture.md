# System Architecture — Project Aether

**Version:** 2.0.0  
**Last Updated:** 2026-11-15  
**Stack:** React 19 · Vite 8 · Three.js 0.185 · React Three Fiber 9 · Zustand 5 · Tailwind CSS 4 · GSAP 3

---

## 1. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      PROJECT AETHER                         │
│                 (Vite SPA — Single HTML Shell)              │
└──────────────────────────┬──────────────────────────────────┘
                           │
           ┌───────────────┴───────────────┐
           ▼                               ▼
  ┌─────────────────┐             ┌─────────────────┐
  │  React DOM UI   │             │  WebGL 3D Layer  │
  │  (HUD Windows)  │◄──State────►│  (R3F Canvas)   │
  │  Tailwind CSS   │   (Zustand) │  Three.js        │
  └────────┬────────┘             └────────┬────────┘
           │                               │
  ┌────────▼────────┐             ┌────────▼────────┐
  │  Window System  │             │  Scene Objects  │
  │  CommandCenter  │             │  AetherCity     │
  │  ProjectsWindow │             │  CyberSpire     │
  │  AiLabWindow    │             │  DataParticles  │
  │  AboutWindow    │             │  Stars          │
  │  NetworkWindow  │             │  Fog            │
  │  NotesWindow    │             │  PostFX (Bloom) │
  │  TerminalWindow │             │  CameraController│
  └─────────────────┘             └─────────────────┘
```

---

## 2. Tech Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| Bundler | Vite | 8.1.x | Dev server + production build |
| UI Framework | React | 19.x | Component tree |
| 3D Engine | Three.js | 0.185.x | WebGL rendering |
| 3D React Bridge | @react-three/fiber | 9.x | Declarative Three.js |
| 3D Utilities | @react-three/drei | 10.x | OrbitControls, Stars, etc. |
| Post-Processing | @react-three/postprocessing | 3.x | Bloom effect |
| State | Zustand | 5.x | Global app state |
| Animations | GSAP | 3.x | Boot sequence, transitions |
| CSS | Tailwind CSS | 4.x | Utility-first styling |
| Icons | lucide-react | 1.27.x | UI icons |
| Language | JavaScript (JSX) | ES2022 | No TypeScript (intentional) |

---

## 3. Project Structure

```
project-aether/
├── public/
│   └── Harsh_Kumar_Gupta_Resume.pdf    ← (ADD: resume PDF here)
├── src/
│   ├── App.jsx                          ← Root app: phase orchestration
│   ├── main.jsx                         ← ReactDOM mount
│   ├── App.css                          ← Legacy styles (minimal)
│   ├── index.css                        ← Tailwind + design tokens + animations
│   │
│   ├── assets/
│   │   └── hero.png                     ← (Unused, available for future)
│   │
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── AetherCanvas.jsx         ← R3F Canvas root, frameloop control
│   │   │   ├── AetherCity.jsx           ← Procedural 3D cityscape
│   │   │   ├── CameraController.jsx     ← Animated camera via store state
│   │   │   ├── CameraRig.jsx            ← (Legacy, check usage)
│   │   │   ├── CyberSpire.jsx           ← Central rotating building
│   │   │   ├── DataParticles.jsx        ← 1000-particle ambient system
│   │   │   └── PostFX.jsx               ← Post-processing effects
│   │   │
│   │   ├── hud/
│   │   │   ├── BootScreen.jsx           ← Phase 1: GSAP boot animation
│   │   │   ├── CommandCenter.jsx        ← Bottom navigation dock
│   │   │   ├── DashboardWidget.jsx      ← Top-left identity widget
│   │   │   ├── NarrativeOverlay.jsx     ← Ambient narrative text
│   │   │   ├── ProjectsWindow.jsx       ← 6 engineering projects (filterable)
│   │   │   ├── AiLabWindow.jsx          ← Capability domains
│   │   │   ├── AboutWindow.jsx          ← Bio, experience, education, certs
│   │   │   ├── NetworkWindow.jsx        ← Contact & identity links
│   │   │   ├── NotesWindow.jsx          ← Engineering notes/writing
│   │   │   ├── TerminalWindow.jsx       ← CLI-style terminal
│   │   │   ├── AiAssistant.jsx          ← (Legacy, may deprecate)
│   │   │   ├── DevHQWindow.jsx          ← GitHub live stats
│   │   │   ├── DesignDistrictWindow.jsx ← (Legacy, may deprecate)
│   │   │   └── SkillParticleGraph.jsx   ← (Used by old AiLabWindow)
│   │   │
│   │   ├── terminal/
│   │   │   ├── TerminalWindow.jsx
│   │   │   └── commandParser.js
│   │   │
│   │   └── ui/
│   │       ├── CustomCursor.jsx         ← Custom cursor element
│   │       ├── GlobalOverlay.jsx        ← Vignette/scan overlay
│   │       ├── MagneticWrapper.jsx      ← Magnetic button effect
│   │       └── ParallaxWrapper.jsx      ← Mouse-parallax float
│   │
│   ├── data/
│   │   ├── projects.json                ← 6 engineering projects (source of truth)
│   │   ├── skills.json                  ← 22 skills across 5 domains
│   │   ├── persona.js                   ← PERSONA constant (identity, links, exp, edu)
│   │   └── assistantIndex.js            ← (Legacy assistant data)
│   │
│   ├── hooks/
│   │   └── useDeviceTier.js             ← GPU/device capability detection
│   │
│   └── store/
│       └── useAetherStore.js            ← Zustand global store
│
├── docs/
│   ├── PRD.md                           ← Product requirements
│   ├── architecture.md                  ← This file
│   ├── rules.md                         ← Development rules
│   ├── design.md                        ← Design system
│   ├── task.md                          ← Task checklist
│   └── memory.md                        ← Context log
│
├── index.html                           ← HTML shell with SEO meta
├── vite.config.js                       ← Vite + Tailwind plugin
├── eslint.config.js                     ← ESLint rules
└── package.json                         ← Dependencies
```

---

## 4. State Architecture

### Zustand Store (`useAetherStore`)

```js
State:
  currentPhase: 'booting' | 'city'   // App phase
  progress: number                    // Boot progress (0-100)
  activeWindow: string | null         // Which HUD window is open
  cameraTarget: { position, lookAt }  // 3D camera destination
  deviceTier: 'full' | 'low'          // GPU capability
  theme: 'dark' | 'light'             // UI theme
  tourState: 'idle' | 'active'        // Guided tour state
  storyPath: 'architecture' | ...     // Boot story path (legacy)
  spawnCoffee: boolean                // Easter egg

Actions:
  setPhase(phase)
  setProgress(val)
  toggleWindow(windowName)   // Any string — no need to register new windows
  setCameraTarget(target)
  setDeviceTier(tier)
  setTheme(theme)
  startTour() / stopTour()
```

### Window Registration Pattern
Any HUD window subscribes to `activeWindow` and renders only when `activeWindow === 'its-key'`. No global registration required — just `toggleWindow('key')` from CommandCenter.

---

## 5. Data Flow

```
User clicks "PROJECTS" button in CommandCenter
        │
        ▼
toggleWindow('projects') → Zustand sets activeWindow = 'projects'
setCameraTarget(...)     → Zustand updates cameraTarget
        │
        ├──► ProjectsWindow.jsx subscribes to activeWindow
        │    → renders when 'projects', null otherwise
        │
        └──► CameraController.jsx subscribes to cameraTarget
             → animates Three.js camera to new position
```

---

## 6. Rendering Pipeline

```
index.html
  └── main.jsx (ReactDOM.createRoot)
        └── App.jsx
              ├── [booting]  BootScreen (GSAP animation + phase trigger)
              └── [city]     AetherCanvas (R3F, frameloop='always'|'never')
                                └── Three.js Scene
                                      ├── CameraController (subscribes to store)
                                      ├── fog, ambientLight, directionalLight
                                      ├── Stars (drei)
                                      ├── CyberSpire (rotating building)
                                      ├── DataParticles (1000 pts)
                                      ├── AetherCity (procedural buildings)
                                      ├── EffectComposer > Bloom
                                      └── OrbitControls
                             HUD Overlay (DOM, z-index above canvas)
                                ├── GlobalRipple
                                ├── GlobalOverlay
                                ├── CustomCursor
                                ├── DashboardWidget (top-left)
                                ├── NarrativeOverlay
                                ├── CommandCenter (bottom dock)
                                ├── ProjectsWindow
                                ├── AiLabWindow
                                ├── AboutWindow
                                ├── NetworkWindow
                                ├── NotesWindow
                                ├── TerminalWindow
                                ├── AiAssistant
                                ├── DevHQWindow
                                └── DesignDistrictWindow
```

---

## 7. Performance Architecture

| Optimization | Implementation |
|---|---|
| Paused render loop | `frameloop={active ? 'always' : 'never'}` during boot |
| Geometry caching | `useMemo(() => new THREE.BoxGeometry(...), [])` in CyberSpire |
| No mipmapBlur | Bloom without `mipmapBlur` to reduce render passes |
| `antialias: false` | Canvas created without MSAA |
| `depthWrite: false` | On additive particle material |
| Lazy window rendering | HUD windows return `null` when not active |
| `will-change-transform` | On TiltCard for GPU compositing layer |

---

## 8. Deployment

**Build command:** `npm run build` → outputs to `dist/`  
**Preview:** `npm run preview`  
**Recommended hosting:** GitHub Pages, Vercel, Netlify (static SPA)

For GitHub Pages, set `base` in `vite.config.js` if deploying to a repo subdirectory:
```js
export default defineConfig({
  base: '/project-aether/',   // only if not on a custom domain
  plugins: [react(), tailwindcss()]
})
```
