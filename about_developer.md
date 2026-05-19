# DebtMap &mdash; Technical Presentation Cheat Sheet
Designed, Engineered, and Architected by **Bishnu Kumar Sardar**

> [!NOTE]
> This cheat sheet is formatted specifically for your **DebtMap Hackathon 2026 Pitch**. Copy and paste these sections directly into your slides, presentation templates, or README credits!

---

## 👤 Architect Telemetry Card
```markdown
+------------------+-------------------------------------------------------------+
| Telemetry Field  | System Value                                                |
+------------------+-------------------------------------------------------------+
| 👤 Name          | Bishnu Kumar Sardar                                         |
| 🏫 College       | Cambridge Institute of Technology, KR Puram, Bangalore      |
| 💻 Role          | Full Stack Developer & Project Architect                    |
| 🛠️ Frontend      | React 18, TS, Three.js, R3F, Zustand, Monaco, Recharts      |
| ⚙️ Backend       | FastAPI, tree-sitter, radon, NetworkX, Claude AI, Supabase |
| 🚀 Deployed      | Vercel (Frontend) + Railway (Backend) + Cloudflare CDN      |
| 🏆 Built For     | DebtMap Hackathon 2026                                      |
+------------------+-------------------------------------------------------------+
```

---

## 📢 Short Elevator Pitch (15-Seconds)
*"DebtMap is an innovative developer tool that transforms dry static codebase statistics into an interactive, navigable 3D digital metropolis. By grouping files into folders as districts, we map cyclomatic complexity to building height, dependency coupling to building width, and test coverage to neon texture decay—helping engineers locate and resolve critical hotspots before they become architectural crises."*

---

## 🛠️ Full Technical Architecture Breakdown

### 🎨 Frontend Engineering
* **Three.js & React Three Fiber (R3F):** Powers the interactive 3D virtual metropolis. Enables panning, zooming, and orbiting. Lays out folder directories as district block rings in a circular metropolis model.
* **Dynamic Mesh Scaling:** 
  * *Skyscraper Height* maps to file complexity.
  * *Skyscraper Width/Depth* maps to import coupling coefficients.
  * *Shader color/decay* maps to branch coverage (Neon emerald green for healthy coverage, decaying amber for medium, matte crumbling red for untested codes).
* **Zustand & TanStack Query:** Manages unified state synchronization (filters, sliders, clicked nodes) and async polling of AST analysis jobs.
* **Monaco Diff Editor:** Renders interactive split-screen code files, comparing standard messy legacy classes side-by-side with decoupled optimized mock outputs.
* **Recharts Dashboard:** Integrates analytical scatter plots (pinpointing top-right quadrant "Hotspot Danger Zones"), Area charts (historical technical debt paying trajectory), and Bar charts (district code health comparison).

### ⚙️ Backend Engineering
* **FastAPI Server:** Engineered as the core microservice coordinator using asynchronous WebSocket channels for real-time diagnostics streaming.
* **AST Parsing (Tree-sitter):** Performs syntax branch extraction across 30+ programming languages to inspect cognitive nesting depth.
* **Metrics Compilation:** Uses `radon` & `lizard` to measure complexity metrics, and `NetworkX` to compile circular dependency import coupling trees.
* **GitPython Integration:** Extracts commit age, author metadata, and historical change intervals.
* **Claude AI (Anthropic):** Generates structural refactoring plans and optimized code modules.
* **Infrastructure & Queues:** Backed by **Supabase** (Postgres + Auth), **Celery + Redis** (asynchronous parsing task queues), and packaged using **Docker** containers.

---

## 🏆 Production-Ready Value Pitch
*"DebtMap is not just a hackathon prototype—it is a robust developer tool engineered for scale. Built for individual students, fast-moving startups, large enterprises, and open-source maintainers, DebtMap provides a visual cockpit that empowers teams to monitor, prioritize, and refactor technical debt collaboratively."*
