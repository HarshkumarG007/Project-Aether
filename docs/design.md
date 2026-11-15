# Design System — Project Aether

**Version:** 2.0.0  
**Last Updated:** 2026-11-15  
**Aesthetic:** Engineer's Digital Workspace — Precision, Restraint, Intelligence

---

## 1. Design Philosophy

Project Aether's visual identity communicates:

> **Intelligence through restraint. Precision through typography. Depth through space.**

### Core Principles
1. **Dark foundation** — Near-black background lets content breathe and color accent pop
2. **Typographic hierarchy** — Size, weight, and color differentiate content levels (not decoration)
3. **Purposeful color** — Accent colors carry semantic meaning (green = active/status, blue = data/projects, cyan = infrastructure, purple = GenAI)
4. **Generous whitespace** — Padding and gap create visual rhythm without decorative elements
5. **Monospace for data** — All metadata, labels, timestamps, and identifiers use `font-mono`
6. **Subtle motion** — Animations confirm state, not entertain

### What We Avoid
- Excessive neon gradients or purple haze
- Meaningless floating 3D decorations
- Fake progress bars representing skill levels
- Artificially animated "live" ML metrics
- Glassmorphism stacked more than 2 layers deep
- Oversaturated glow effects on every surface

---

## 2. Color System

Defined in `src/index.css` `@theme {}` block.

### Foundation
| Token | Hex | Usage |
|---|---|---|
| `--color-aether-black` | `#030303` | Page background, canvas background |
| `--color-aether-surface` | `#0d1117` | Panel backgrounds (deeper than pure black) |

### Primary Accent — Green
| Usage | Class |
|---|---|
| Active state indicators | `text-aether-green` |
| Status indicators (online, available) | `bg-aether-green` |
| Borders on active elements | `border-aether-green/30` |
| Subtle glow backgrounds | `bg-aether-green/5` |
| Progress bars | `bg-aether-green` |
| Boot sequence text | `text-aether-green` |

**Value:** `#00ff41` — the classic terminal green. Unmistakable, technical.

### Secondary Accent — Cyan
| Usage | Class |
|---|---|
| Technical decisions / engineering insights | `text-aether-cyan` |
| Infrastructure domain | `text-cyan-400` |
| Hover highlights on neutral elements | `hover:text-cyan-300` |

**Value:** `#00e5ff`

### Semantic Colors
| Color | Semantic | Tailwind |
|---|---|---|
| Blue | Projects / Data / GitHub | `text-blue-400`, `border-blue-400/30` |
| Purple | Generative AI / LLMs | `text-purple-400`, `border-purple-400/30` |
| Orange | Privacy & Security / Credly | `text-orange-400` |
| Cyan | Infrastructure / AI Infra | `text-cyan-400` |
| Yellow | Warnings / In Development | `text-yellow-400` |
| Red | Close / Error | `text-red-400` |

### Text Scale
| Token | Hex | Class |
|---|---|---|
| Primary | `#ffffff` | `text-white` |
| Secondary | `rgba(255,255,255,0.7)` | `text-white/70` |
| Tertiary / muted | `#8892a4` | `text-gray-400` |
| Disabled / metadata | `#4b5563` | `text-gray-600` |
| Barely visible | `#374151` | `text-gray-700` |

---

## 3. Typography

### Font Stack
```css
--font-mono: "Fira Code", "JetBrains Mono", monospace;
--font-sans: "Inter", system-ui, sans-serif;
```

Both fonts are **system fallbacks** — they load from the user's machine if installed. Add Google Fonts link to `index.html` for guaranteed rendering if desired.

### Type Scale

| Use | Size | Weight | Font | Class |
|---|---|---|---|---|
| Window title | 18-20px | 600 | sans | `text-lg font-semibold` |
| Section heading | 14px | 500 | sans | `text-sm font-medium` |
| Body text | 12px | 400 | sans | `text-xs` |
| Body leading | 12px | 400 | sans | `text-xs leading-relaxed` |
| Small body | 11px | 400 | sans | `text-[11px]` |
| Metadata labels | 10px | 400 | mono | `text-[10px] font-mono tracking-widest` |
| Tags / chips | 9-10px | 400 | mono | `text-[9px] font-mono` |
| Micro labels | 8-9px | 400 | mono | `text-[8px] font-mono` |

### Typography Rules
- **Window titles** → `text-sm font-semibold text-white` (intentionally not huge)
- **Section labels** → `text-[10px] font-mono text-gray-500 tracking-widest uppercase`
- **Data values** → `font-mono text-white/80`
- **Descriptions** → `text-xs text-gray-400 leading-relaxed`
- **Metadata** → `text-[9px] font-mono text-gray-600`

---

## 4. Spacing System

Tailwind's default scale. Key multiples used:

| Token | px | Usage |
|---|---|---|
| `gap-1` | 4px | Icon-to-label gap |
| `gap-1.5` | 6px | Tight element groups |
| `gap-2` | 8px | Standard row gap |
| `gap-3` | 12px | Card item gap |
| `gap-4` | 16px | Section gap |
| `gap-6` | 24px | Major section gap |
| `p-4` | 16px | Card padding |
| `p-5` | 20px | Panel content padding |
| `p-6` | 24px | Window content padding |

---

## 5. Surface (Panel) System

### Primary Window
```
bg-[#080c12]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl
```

### Secondary Card
```
bg-white/3 border border-white/8 rounded-xl
```

### Hover State (card)
```
hover:bg-white/6 hover:border-white/15
```

### Active / Accent Card
```
bg-aether-green/5 border border-aether-green/20 rounded-lg
```

### Window Header
```
bg-white/3 border-b border-white/8 px-5 py-3
```

### Warning / Caveat Block
```
bg-yellow-400/5 border border-yellow-400/15 rounded p-3 text-yellow-400/80
```

---

## 6. Component Patterns

### HUD Button (CommandCenter)
```jsx
<button className="flex flex-col items-center gap-1 group text-gray-500 hover:text-white">
  <div className="p-1.5 rounded-lg group-hover:bg-white/5">
    <Icon size={16} />
  </div>
  <span className="text-[8px] font-mono tracking-widest">LABEL</span>
</button>
```
**Active state:** `text-aether-green` + `bg-aether-green/10 shadow-[0_0_10px_rgba(0,255,65,0.2)]`

### Tag / Chip
```jsx
<span className="text-[9px] font-mono px-2 py-0.5 rounded border border-white/8 bg-white/5 text-gray-400">
  Python
</span>
```

### Status Badge
```jsx
// Active / Complete
<span className="text-[9px] font-mono px-2 py-0.5 rounded border text-aether-green border-aether-green/30">
  Complete
</span>

// In Progress
<span className="text-[9px] font-mono px-2 py-0.5 rounded border text-yellow-400 border-yellow-400/30">
  In Development
</span>
```

### Section Label
```jsx
<h4 className="text-[10px] font-mono text-gray-500 tracking-widest uppercase mb-2">
  Section Title
</h4>
```

### Identity Monogram (no photo)
```jsx
<div className="relative w-16 h-16 border border-aether-green/30 bg-aether-green/5 rounded-xl flex items-center justify-center overflow-hidden">
  <div className="absolute top-0 left-0 w-full h-0.5 bg-aether-green/70 animate-scan" />
  <span className="font-mono text-aether-green text-xl font-bold">HG</span>
</div>
```

---

## 7. Animation System

Defined in `src/index.css`.

| Animation | Class | Use |
|---|---|---|
| Fade in | `animate-fade-in` | HUD windows appearing |
| Fade in up | `animate-fade-in-up` | List items entering |
| Scan line | `animate-scan` | Identity avatar scan |
| Pulse glow | `animate-pulse-glow` | Status indicators |
| Ripple | `animate-ripple` | Click feedback |
| Glitch | `glitch-text` | "ACCESS GRANTED" boot text |
| Pulse (Tailwind) | `animate-pulse` | Loading states |

### Motion Rules
- All animations must be `forwards` or `infinite` — not loop awkwardly
- Entrance animations: max 500ms duration
- Hover transitions: `duration-200` for snappy feel
- Camera transitions in 3D: handled by `CameraController` with `lerp`
- Respect `prefers-reduced-motion` for key animations (future)

---

## 8. 3D Visual Identity

The 3D environment uses:
- **Background:** `#030303` (matches page)
- **Fog:** `#030303`, near=5, far=25 (creates depth falloff)
- **Grid:** `#00ff41` lines (aether green) with `#111122` secondary
- **Spire:** `#080810` body, `[0, 2, 0.5]` HDR green wireframe
- **Particles:** `#00ff41` additive blend, opacity 0.4, `size=0.08`
- **Stars:** `count=2000`, `radius=50`, saturation=0 (desaturated)
- **Bloom:** `luminanceThreshold=1`, `intensity=1.5` (no mipmapBlur)
- **Lighting:** `ambientLight intensity=0.2` + `directionalLight intensity=0.8`

---

## 9. Responsive Design

### Breakpoints (Tailwind defaults)
| Prefix | Min-width |
|---|---|
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |

### Key Responsive Patterns
- Windows: `w-[95vw] md:w-[700px]` — full-width on mobile, fixed on desktop
- Height: `h-[88vh] md:h-[560px]` — viewport-relative on mobile
- Grids: `grid-cols-1 md:grid-cols-2`
- Font sizes: Use fixed px sizes (responsive via viewport is too small on mobile)
- CommandCenter: `overflow-x-auto` for scrollable nav on small screens

---

## 10. Dark / Light Mode

Currently only **dark mode** is implemented. The `theme` state exists in Zustand and the `setTheme` action is wired. Light mode visual implementation is deferred to post-MVP.

**When implementing light mode:**
- Background: `#f8f9fa` (not pure white)
- Surfaces: `#ffffff` with subtle shadow
- Text: `#1a1a2e` primary, `#4a4a6a` secondary
- Accent: Same `#00ff41` on dark surfaces, `#008f24` on light
- 3D canvas background must also change (`gl={{ clearColor: '#f0f4f8' }}`)
