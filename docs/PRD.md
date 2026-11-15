# PRD — Product Requirements Document
## Project Aether: Professional Portfolio for Harsh Kumar Gupta

**Version:** 2.0.0  
**Last Updated:** 2026-11-15  
**Author:** Harsh Kumar Gupta  
**Status:** Active Development

---

## 1. Product Overview

Project Aether is an interactive, immersive personal portfolio for **Harsh Kumar Gupta**, an Applied AI/ML Engineer. It is built as a WebGL-powered, HUD-inspired experience using React Three Fiber, React, Zustand, and Tailwind CSS.

The portfolio communicates three core qualities:
- **Engineering Depth** — Understanding of how intelligent systems work internally
- **Practical Execution** — Ability to deliver working, deployed systems
- **Technical Communication** — Clarity in explaining complex concepts

**Central Brand Statement:**
> "Engineering intelligent systems. Making AI useful, reliable, and accessible."

---

## 2. Problem Statement

Generic portfolio templates fail to communicate the technical depth and engineering capability of an AI/ML practitioner. A recruiter or engineering manager needs to rapidly assess:
- What kind of work the candidate actually builds
- The architectural thinking behind it
- Professional credibility and authenticity

Project Aether solves this by transforming a portfolio into an interactive engineering showcase — not a slideshow of project screenshots.

---

## 3. Target Audience

### Primary
- **Engineering Managers** at AI/ML companies evaluating hiring candidates
- **Technical Recruiters** screening early-career AI/ML engineers
- **CTOs and Founders** of AI startups considering junior engineering hires

### Secondary
- **Developer peers** reviewing technical work
- **Conference organizers** evaluating speaker profiles
- **Open-source collaborators** interested in AI/ML tooling projects

---

## 4. Core User Journeys

### Journey A: Recruiter (60-second scan)
1. Opens the site → sees boot sequence with Harsh's identity
2. Enters the 3D environment → reads dashboard widget (name, role, location, status)
3. Opens PROJECTS → sees 6 real engineering case studies with tech stack tags
4. Opens CONNECT → finds GitHub, LinkedIn, email, resume download
5. **Conversion event:** Clicks GitHub or downloads resume

### Journey B: Technical Evaluator (5-minute deep-dive)
1. Opens PROJECTS → reads architecture pipeline diagrams
2. Clicks into individual project → reads DECISIONS tab (engineering trade-offs)
3. Opens SKILLS → reviews capability domains
4. Opens ABOUT → reads experience, education
5. **Conversion event:** Sends a LinkedIn message or email

---

## 5. MVP Feature Requirements

### 5.1 Boot Experience ✅
- [x] GSAP-animated terminal boot sequence
- [x] Progress bar simulation
- [x] Single "ENTER AETHER" action
- [x] Identity displayed (name, role, location)

### 5.2 3D Environment ✅
- [x] React Three Fiber WebGL canvas
- [x] Interactive camera (OrbitControls)
- [x] CyberSpire 3D structure
- [x] DataParticles particle system
- [x] AetherCity procedural cityscape
- [x] Post-processing bloom effect
- [x] Render loop paused when hidden

### 5.3 HUD Navigation System ✅
- [x] Bottom CommandCenter dock
- [x] Magnetic button interactions
- [x] Camera moves on window open
- [x] Active state highlighting

### 5.4 Projects Window ✅
- [x] 6 real engineering projects displayed
- [x] Category filter (Applied ML / GenAI / Privacy & Security / Statistical Modeling)
- [x] Tilt-card interactions
- [x] Project detail view with tabs (Overview, Decisions, Metrics)
- [x] GitHub repository links

### 5.5 Skills Window ✅
- [x] 5 engineering capability domains
- [x] Domain drill-down (22 total technologies)
- [x] No fake proficiency percentages
- [x] Honest framing caveat

### 5.6 About Window ✅
- [x] Tabbed interface: Bio / Experience / Education / Credentials
- [x] 3 real experience entries
- [x] 5 education entries
- [x] 20 certifications (prioritized by AI/ML relevance)
- [x] Credly link

### 5.7 Connect/Network Window ✅
- [x] Real identity (name, title, location, availability)
- [x] GitHub, LinkedIn, Credly, Email links
- [x] Resume download (placeholder until PDF added to `/public/`)

### 5.8 Engineering Notes Window ✅
- [x] 6 proposed article topics based on real project experience
- [x] Published vs. Idea status labels
- [x] LinkedIn link

### 5.9 Dashboard Widget ✅
- [x] Live IST clock
- [x] Identity info (name, role, location, availability)

### 5.10 Terminal ✅
- [x] Functional command parser
- [x] Keyboard shortcut (backtick)

---

## 6. Non-Functional Requirements

| Requirement | Target |
|---|---|
| Build | Zero errors |
| Bundle size | < 1.5MB JS (acceptable for Three.js) |
| FPS | ≥ 30fps on mid-range GPU |
| Responsiveness | Mobile + tablet + desktop |
| SEO | Title, meta description, OG tags |
| Content integrity | No fabricated metrics or achievements |

---

## 7. Out of Scope (MVP)

- Backend / API server
- Contact form (use `mailto:` for now)
- Light mode full implementation
- Animated architecture diagrams
- Blog articles published
- Resume PDF (must be added to `/public/` manually)

---

## 8. Future Roadmap

| Priority | Feature |
|---|---|
| High | Add `Harsh_Kumar_Gupta_Resume.pdf` to `/public/` |
| High | Implement light mode theme fully |
| High | Publish first Engineering Notes article |
| Medium | Mobile-optimized HUD layout |
| Medium | Lazy-load 3D canvas for faster initial paint |
| Medium | Animated architecture pipeline diagrams |
| Low | GitHub API live stats with rate-limit fallback |
| Low | Contact form with Formspree |
| Low | PWA support |
