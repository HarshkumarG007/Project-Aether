# 🌐 PROJECT AETHER (v2.0.0)

> **"Engineering intelligent systems. Making AI useful, reliable, and accessible."**  
> An interactive 3D WebGL and glassmorphic HUD personal portfolio for **Harsh Kumar Gupta**, Applied AI/ML Engineer.

[![Build & Test Status](https://img.shields.io/badge/build-passing-brightgreen)](#)
[![React](https://img.shields.io/badge/React-19.x-blue)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-cyan)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/State-Zustand_v5-orange)](https://github.com/pmndrs/zustand)
[![Vite](https://img.shields.io/badge/Build-Vite_v8-purple)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Tests-8%20passed-brightgreen)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📖 Overview

**Project Aether** is the definitive professional portfolio of **Harsh Kumar Gupta**, an Applied AI/ML Engineer based in Varanasi, India.

Rather than a generic static template, Aether functions as an engineer's interactive digital workspace. Built at the intersection of real-time 3D rendering (WebGL / Three.js / R3F) and a precision React 19 HUD interface, it demonstrates:
- **Engineering Depth:** Detailed case studies articulating problem statements, retrieval-vs-ranking trade-offs, and calibrated uncertainty.
- **Practical Execution:** Working systems with sub-6ms latencies, containerized services, and local-first runtimes.
- **Technical Communication:** Published engineering notes, clear architectural documentation, and transparent evaluation caveats.

---

## 📚 Engineering Documentation Suite

This project follows a structured **Vibe Coding Workflow** pipeline from idea to architecture, development, testing, and deployment. The complete specification is documented in [`docs/`](docs/):

| Document | Description |
| :--- | :--- |
| **[`PRD.md`](docs/PRD.md)** | Product Requirements Document — User journeys, MVP features, and roadmap |
| **[`architecture.md`](docs/architecture.md)** | System Architecture — Rendering pipeline, state flow, and 3D scene topology |
| **[`rules.md`](docs/rules.md)** | Development Rulebook — Standards, React 19 hooks, and content integrity rules |
| **[`design.md`](docs/design.md)** | Design System — Color palette, typography scale, surface patterns, and motion |
| **[`task.md`](docs/task.md)** | Task Breakdown — Sequential checklist from audit to testing and deployment |
| **[`memory.md`](docs/memory.md)** | Project Memory — Decision logs, resolved issues, and architectural history |

---

## 🚀 Featured Engineering Projects

Aether presents engineering projects as full case studies with architecture flows, technical trade-offs, and metrics:

| # | Project | Category | Key Technologies | Highlights |
|---|---|---|---|---|
| **01** | **[Netflix RecSys](https://github.com/HarshkumarG007/netflix_recsys)** | Applied ML | Python, PyTorch, FAISS, XGBoost, Polars, FastAPI, Docker | Two-Tower candidate retrieval (MovieLens 25M, 62K items) + XGBoost pairwise LTR. HitRate@100: 0.8034, Recall@100: 0.0982, ~5.27ms latency. |
| **02** | **Aegis-Eval** | Generative AI / Evaluation | Python, Quantized LLMs, GGUF, Qwen 2.5, RAG, Knowledge Graphs | Local-first RAG evaluation framework targeting ~8GB VRAM with deterministic multi-hop benchmark generation. |
| **03** | **CogniGuard** | AI Security & Governance | Python, Knowledge Graphs, LLM Pipelines, Authorization Guardrails | Knowledge graph authorization boundaries preventing unauthorized context leakage in enterprise retrieval flows. |
| **04** | **LeadGuard** | Applied ML / Geospatial | Python, XGBoost, Scikit-learn, Geospatial ML | Spatial risk-scoring pipeline with probability calibration and confidence-aware uncertainty estimation. |
| **05** | **Prerna** | AI Applications / Systems | Rust, React, Ollama, Local LLMs, GGUF | Privacy-preserving local-first AI assistant with decoupled Rust backend, local model runtimes, and zero cloud dependency. |
| **06** | **ArthaIQ** | Statistical Modeling | Python, Pandas, Statistical Modeling | Statistical compensation intelligence engine with confidence interval estimation and explainable feature attribution. |

---

## 📝 Published Engineering Notes

Aether includes an in-app technical reader displaying engineering lessons and architectural trade-offs:
1. **"Why Recommendation Systems Need Separate Retrieval and Ranking Stages"** — Detailed analysis of latency budgeting (<2ms retrieval + ~3ms ranking), Two-Tower vector lookups, candidate-aware ranking features, and MMR diversity.
2. **"Solving Sample Selection Bias with Hard-Negative Mining"** — Why uniform random negative sampling fails in implicit feedback catalogues and how mining hard negatives from FAISS nearest neighbors enforces precise decision boundaries.

---

## 🧩 System Architecture

```text
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

## 🛠️ Technical Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | React 19 | Component architecture & hooks |
| **Build Tool** | Vite 8 | Fast HMR dev server & production bundling |
| **3D Engine** | Three.js (0.185) | Hardware-accelerated WebGL rendering |
| **React 3D** | React Three Fiber (v9) | Declarative 3D scene management |
| **3D Utilities** | React Three Drei (v10) | OrbitControls, Stars, procedural helpers |
| **Post-Processing** | React Three Postprocessing | Cinematic bloom & tone-mapping effects |
| **State** | Zustand (v5) | Centralized, decoupled global UI state |
| **Animations** | GSAP 3 | Boot sequence & interface transitions |
| **Styling** | Tailwind CSS v4 | Utility-first responsive styling & CSS tokens |
| **Icons** | Lucide React | Clean, scalable interface iconography |
| **Testing** | Vitest | Fast unit testing for assistants and command parsers |
| **CI/CD** | GitHub Actions | Automated linting, test suites, and build verification |

---

## ⚡ Performance Optimizations

1. **Paused Render Loop:** Canvas `frameloop` dynamically switches between `'always'` and `'never'`, halting WebGL calculations during the boot screen.
2. **Geometry Caching:** Procedural geometries are cached via `useMemo` to eliminate per-render garbage collection churn.
3. **GPU-Aware Post-Processing:** Bloom effects configured without heavy `mipmapBlur` to maintain high frame-rates across integrated GPUs.
4. **Accessible Animations:** Full `@media (prefers-reduced-motion: reduce)` support built into the stylesheet.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/HarshkumarG007/Project-Aether.git
cd Project-Aether
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### 4. Run Test Suite

```bash
npm test
```

### 5. Run Lint Check

```bash
npm run lint
```

### 6. Build for Production

```bash
npm run build
```

---

## 👨‍💻 Architected By

### **Harsh Kumar Gupta**
**Applied AI/ML Engineer** — Varanasi, Uttar Pradesh, India

- **GitHub:** [@HarshkumarG007](https://github.com/HarshkumarG007)
- **LinkedIn:** [linkedin.com/in/harshkumarg](https://www.linkedin.com/in/harshkumarg/)
- **Credly:** [credly.com/users/harshkumarg](https://www.credly.com/users/harshkumarg)
- **Email:** [hrslsha007@gmail.com](mailto:hrslsha007@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
