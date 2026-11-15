# Memory — Project Context & History Log
## Project Aether

**Last Updated:** 2026-11-15  
**Current Version:** 2.0.0

---

## Current Status

**Phase:** Phase 6 of 11 — Documentation complete. Awaiting Phase 7 (browser testing).

**Build Status:** ✅ Passing  
**Last Build:** `npx vite build` → 0 errors, 2384 modules, ~559ms  
**Bundle:** 1.33MB JS (gzip: 372KB) — large due to Three.js, acceptable  

**Git Tag:** `V.1.0` (tagged on 2026-08-02 after original performance optimizations)  
**Next Tag:** `V.2.0` — after Phase 10 deployment  

---

## What Has Been Completed

### August 2026 — Initial Performance Optimizations
- Identified 3 performance issues and refactored:
  1. `CyberSpire.jsx`: Wrapped `new THREE.BoxGeometry()` in `useMemo`
  2. `AetherCanvas.jsx`: Removed `mipmapBlur` from Bloom; added `active` prop and `frameloop` control
  3. `App.jsx`: Pass `active={currentPhase === 'city'}` to pause render during boot
- Tagged and pushed `V.1.0` to GitHub (`HarshkumarG007/Project-Aether`)

### November 2026 — Full Portfolio Transformation (Master Directive)

**Data Layer (all complete):**
- `src/data/projects.json` — replaced 2 placeholder projects with 6 real engineering case studies
- `src/data/skills.json` — replaced 5 generic skills with 22 real capabilities across 5 domains
- `src/data/persona.js` — created from scratch with PERSONA constant (identity, links, experience, education, certs, notes)
- `index.html` — updated title, meta, OG tags, twitter card
- `src/index.css` — expanded @theme tokens, added new animation keyframes

**HUD Components (all rewritten or created):**
- `BootScreen.jsx` — updated boot text, single ENTER button, Harsh's identity tagline
- `CommandCenter.jsx` — removed DevHQ/Design; added ABOUT, NOTES, updated camera targets
- `NetworkWindow.jsx` — real contact info, identity block, 2×2 contact grid, resume download
- `ProjectsWindow.jsx` — full case-study architecture (filter, TiltCard grid, 3-tab detail view)
- `AiLabWindow.jsx` — domain-based capability view (no fake progress bars)
- `DashboardWidget.jsx` — live IST clock + real identity rows
- `AboutWindow.jsx` — NEW: Bio / Experience / Education / Credentials tabs
- `NotesWindow.jsx` — NEW: Engineering notes with idea/published labels

**Integration & Polish:**
- `App.jsx` — added AboutWindow, NotesWindow imports and renders
- Fixed `lucide-react` icon name errors (`Github`→`Globe`, `Linkedin`→`Briefcase`)
- Fixed all ESLint errors (`react-hooks/set-state-in-effect`, unused imports)
- Added `aria-label` attributes to all HUD window close buttons and `CommandCenter` buttons
- Added `@media (prefers-reduced-motion: reduce)` accessibility rule to `src/index.css`
- Verified: `npm run lint` → 0 errors/warnings, `npm run build` → ✅ 0 errors
- Synchronized `Harsh_Kumar_Gupta_Resume.pdf` and `Harsh_Gupta_Resume.pdf` in `public/`
- Published 2 engineering notes with interactive reader view in `NotesWindow.jsx` (Two-Stage RecSys & Hard-Negative Mining)

**Documentation:**
- `docs/PRD.md` — product requirements
- `docs/architecture.md` — system architecture
- `docs/rules.md` — development rules
- `docs/design.md` — design system
- `docs/task.md` — task breakdown
- `docs/memory.md` — this file

---

## Technical Decisions Log

| Date | Decision | Rationale |
|---|---|---|
| 2026-08-02 | `useMemo` for BoxGeometry | Prevent GC churn from per-render instantiation |
| 2026-08-02 | Remove `mipmapBlur` from Bloom | Reduce render passes; mipmap blur is expensive |
| 2026-08-02 | `frameloop='never'` during boot | Save GPU cycles while canvas is hidden |
| 2026-11-15 | No progress bars for skills | Fake percentages undermine authenticity |
| 2026-11-15 | No `mipmapBlur` retained | GPU performance priority |
| 2026-11-15 | Single ENTER button vs story branching | Story branching was confusing and off-brand for portfolio |
| 2026-11-15 | Keep DevHQWindow and DesignDistrictWindow | Don't remove working features; just deprioritize in nav |
| 2026-11-15 | `persona.js` as central identity source | Single source of truth; prevents drift between components |
| 2026-11-15 | No TypeScript | Existing project uses JSX; migration not worth disruption |
| 2026-11-15 | `Globe` + `Briefcase` icons instead of `Github`/`Linkedin` | lucide-react v1.27 doesn't export those names |

---

## Known Issues & Technical Debt

| Issue | Severity | Status |
|---|---|---|
| Bundle size > 500KB (Rolldown warning) | Low | Acceptable — Three.js is large. Can code-split later. |
| `cursor: none` may break on some mobile browsers | Medium | Needs mobile testing |
| `SkillParticleGraph.jsx` no longer used by new AiLabWindow | Low | Dead code, can be removed later |
| `AiAssistant.jsx` and `DesignDistrictWindow.jsx` are legacy | Low | Still functional, just not in primary nav |
| Light mode theme — `setTheme` wired but visual not implemented | Medium | Deferred to post-MVP |
| Resume PDF not in `/public/` | High | Must add `Harsh_Kumar_Gupta_Resume.pdf` manually |
| Engineering Notes all "IDEA" status | Medium | Need to publish at least 1 article |
| Quota hit during swarm transformation | Low | Workers completed before quota cut out; build passes |

---

## Architecture Changes

| Change | Date | Impact |
|---|---|---|
| Added `AboutWindow` component | 2026-11-15 | New window in city phase; CommandCenter ABOUT button |
| Added `NotesWindow` component | 2026-11-15 | New window in city phase; CommandCenter NOTES button |
| `projects.json` schema expanded | 2026-11-15 | Added architecture[], decisions[], metrics[], highlights[], limitations |
| `skills.json` schema changed | 2026-11-15 | Removed `proficiency`, added `domain`; components updated to match |
| `persona.js` created | 2026-11-15 | New dependency for NetworkWindow, AboutWindow, NotesWindow |

---

## Important Facts

- **GitHub:** `https://github.com/HarshkumarG007`
- **LinkedIn:** `https://www.linkedin.com/in/harshkumarg/`
- **Credly:** `https://www.credly.com/users/harshkumarg`
- **Email:** `hrslsha007@gmail.com`
- **Current Role:** AI & Robotics Specialist, Arque Technologies (March 2026–Present, Kathmandu, Nepal)
- **Previous Role:** AI Trainer, Arque Technologies (March 2025–March 2026, Fatehpur, UP)
- **Internship:** IBM SkillsBuild PBEL (2024, 6-month virtual program)
- **MCA CGPA:** 7.56/10, Kashi Institute of Technology, Varanasi
- **RecSys HitRate@100:** 0.8034 (offline evaluation, MovieLens 25M)
- **RecSys E2E Latency:** ~5.27ms (locally measured)

---

## Next Actions (Priority Order)

1. **[HIGH]** Add resume PDF to `/public/Harsh_Kumar_Gupta_Resume.pdf`
2. **[HIGH]** Open `localhost:5173` and test all windows in browser
3. **[HIGH]** Test on mobile device
4. **[MEDIUM]** Write and publish first Engineering Notes article
5. **[MEDIUM]** Run final lint check (`npm run lint`)
6. **[MEDIUM]** Deploy to GitHub Pages or Vercel
7. **[LOW]** Tag `V.2.0` after deployment
8. **[LOW]** Remove dead code (SkillParticleGraph, legacy windows if unused)

---

## Session Log

| Date | Session | Outcome |
|---|---|---|
| 2026-08-02 | Performance optimization session | useMemo, Bloom fix, frameloop control. Tagged V.1.0. |
| 2026-11-15 | Master Directive transformation (Part 1) | Data layer + BootScreen + NetworkWindow + CommandCenter complete |
| 2026-11-15 | Master Directive transformation (Part 2) | ProjectsWindow + AiLabWindow + AboutWindow + NotesWindow + App.jsx + Docs |
