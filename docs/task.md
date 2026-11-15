# Task Breakdown — Project Aether

**Version:** 2.0.0  
**Last Updated:** 2026-11-15  
**Method:** One task at a time, sequentially. Never skip to deployment.

---

## Phase 1: Foundation & Audit ✅ COMPLETE

- [x] Inspect complete repository structure
- [x] Identify framework, libraries, architecture, components, routing, styling
- [x] Understand existing visual identity and intended purpose
- [x] Identify incomplete pages, placeholder content, technical debt
- [x] Create implementation plan

---

## Phase 2: Data & Identity Layer ✅ COMPLETE

- [x] Replace `src/data/projects.json` with 6 real engineering projects
  - [x] Netflix RecSys (Two-Tower + FAISS + XGBoost)
  - [x] Aegis-Eval (Local RAG Evaluation Framework)
  - [x] CogniGuard (Context Authorization + AI Security)
  - [x] LeadGuard (Geospatial Risk Prediction)
  - [x] Prerna (Privacy-First Local AI)
  - [x] ArthaIQ (Statistical Compensation Intelligence)
- [x] Replace `src/data/skills.json` with capability domains (22 skills, 5 domains, no proficiency %)
- [x] Create `src/data/persona.js` with PERSONA constant
  - [x] Name, title, tagline, bio, location, availability
  - [x] Real links (GitHub, LinkedIn, Credly, HackerRank, email)
  - [x] 3 real experience entries
  - [x] 5 education entries
  - [x] 20 certifications
  - [x] 6 engineering note stubs
- [x] Update `index.html` with SEO meta (title, description, keywords, OG tags)
- [x] Expand `src/index.css` @theme tokens (cyan, blue, muted, surface, border, fonts)

---

## Phase 3: HUD Component Transformation ✅ COMPLETE

- [x] Rewrite `BootScreen.jsx`
  - [x] Update boot sequence text to Harsh's identity
  - [x] Single "ENTER AETHER" button (remove story branching)
- [x] Rewrite `NetworkWindow.jsx`
  - [x] Real name, title, location, availability
  - [x] Contact grid: GitHub, LinkedIn, Credly, Email (real links)
  - [x] Resume download button
  - [x] Short bio from PERSONA
- [x] Rewrite `CommandCenter.jsx`
  - [x] Remove DevHQ and Design buttons
  - [x] Add ABOUT and NOTES buttons
  - [x] Update camera targets for all windows
- [x] Rewrite `ProjectsWindow.jsx`
  - [x] 6 real projects displayed
  - [x] Category filter tabs
  - [x] TiltCard interactions
  - [x] Project detail: Overview / Decisions / Metrics tabs
  - [x] Architecture pipeline visualization
  - [x] Honest metrics caveat
- [x] Rewrite `AiLabWindow.jsx`
  - [x] 5 capability domain cards
  - [x] Domain drill-down view
  - [x] No fake progress bars
  - [x] Honest framing caveat
- [x] Rewrite `DashboardWidget.jsx`
  - [x] Live IST clock
  - [x] Real identity rows (name, role, location, status)
  - [x] Remove fake skill progress bars

---

## Phase 4: New Windows ✅ COMPLETE

- [x] Create `AboutWindow.jsx`
  - [x] Bio tab with monogram, description, focus areas, target roles
  - [x] Experience tab with 3 real entries
  - [x] Education tab with 5 degrees/diplomas
  - [x] Credentials tab with Credly link and sorted certs
- [x] Create `NotesWindow.jsx`
  - [x] 6 engineering notes (all "IDEA" status, honest labeling)
  - [x] Tag chips per topic
  - [x] LinkedIn link for follow-up

---

## Phase 5: Integration ✅ COMPLETE

- [x] Update `App.jsx`
  - [x] Import `AboutWindow` and `NotesWindow`
  - [x] Render `<AboutWindow />` and `<NotesWindow />` in city phase
- [x] Fix lucide-react icon names (`Github` → `Globe`, `Linkedin` → `Briefcase`)
- [x] Verify build passes (`npx vite build` → ✅ no errors)

---

## Phase 6: Documentation ✅ COMPLETE

- [x] Create `docs/PRD.md`
- [x] Create `docs/architecture.md`
- [x] Create `docs/rules.md`
- [x] Create `docs/design.md`
- [x] Create `docs/task.md` (this file)
- [x] Create `docs/memory.md`

---

## Phase 7: Polish 🔲 PENDING

- [ ] Verify all HUD windows render correctly in browser (open localhost:5173)
- [ ] Test all 6 project cards open and display correctly
- [ ] Test all 3 project detail tabs (Overview / Decisions / Metrics)
- [ ] Test About window all 4 tabs
- [ ] Test all external links open correctly
- [ ] Test mobile layout (< 768px) for all windows
- [ ] Test keyboard shortcut for terminal (backtick)
- [ ] Test tour sequence (TOUR button)
- [ ] Verify DashboardWidget shows IST time
- [ ] Verify BootScreen shows new identity text
- [ ] Check no console errors in browser

---

## Phase 8: Content Completion ✅ COMPLETE

- [x] Add resume PDF → `public/Harsh_Kumar_Gupta_Resume.pdf` (and `public/Harsh_Gupta_Resume.pdf`)
- [x] Verify resume download link works
- [x] Update email in `persona.js` (`hrslsha007@gmail.com`)
- [x] Write first Engineering Note articles (Two-Stage RecSys & Hard-Negative Mining)
- [x] Update NotesWindow status to "published" with in-app interactive reader view
- [ ] Add any real project screenshots / architecture diagrams to `/public/` (optional)

---

## Phase 9: Performance & Accessibility 🔄 IN PROGRESS

- [x] Add `prefers-reduced-motion` checks to key animations
- [x] Verify all icon-only buttons have `aria-label`
- [ ] Verify all interactive elements are keyboard-focusable
- [ ] Check contrast ratios on key text (aim for WCAG AA)
- [ ] Add `loading="lazy"` to any images added
- [x] Consider code-splitting 3D canvas (manualChunks: vendor, three, postprocessing)

---

## Phase 10: Deployment 🔲 PENDING

- [x] Final `npm run build` — zero errors
- [x] Run `npm run lint` — zero warnings/errors
- [ ] Test production build with `npm run preview`
- [ ] Choose deployment target (GitHub Pages / Vercel / Netlify)
- [ ] Configure `vite.config.js` `base` if on GitHub Pages subdirectory
- [ ] Deploy to chosen host
- [ ] Verify deployed site loads correctly
- [ ] Verify 3D canvas loads and renders
- [ ] Test on mobile device (real device, not emulator)
- [ ] Commit final state and tag `V.2.0`

---

## Phase 11: Monitoring & Iteration 🔲 FUTURE

- [ ] Add Plausible or Fathom analytics (privacy-respecting)
- [ ] Set up uptime monitoring
- [ ] Collect recruiter feedback and iterate
- [ ] Implement light mode
- [ ] Add animated architecture diagrams per project
- [ ] Add GitHub API live stats with rate-limit fallback
