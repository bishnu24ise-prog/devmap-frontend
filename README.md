# 🏙️ DebtMap

**Next-Gen Technical Debt Visualizer**  
*Visualize complex software codebases as interactive, navigable 3D cities.*

![DebtMap Preview](https://via.placeholder.com/1200x600/0f172a/22d3ee?text=DebtMap+-+3D+Codebase+Visualization)

DebtMap transforms any GitHub repository or local `.zip` file into a dynamic 3D metropolis. By mapping abstract code architecture into physical building dimensions, we make technical debt, module coupling, and code complexity instantly understandable for developers of all levels.

---

## ✨ Key Features

*   **🏙️ Interactive 3D Codebase**  
    Translates complex software repositories into a navigable, 60fps 3D city using React Three Fiber.
    *   **Height** = Cyclomatic Complexity
    *   **Width** = Module Coupling
    *   **Texture Decay** = Missing Test Coverage
*   **🤖 AI Refactoring Engine**  
    Click any "problem building" to instantly generate Claude 3.5 Sonnet refactoring plans side-by-side in a fully-featured Monaco editor.
*   **🕸️ Deep AST Analysis**  
    Uses `tree-sitter` to parse over 30+ languages, `radon` and `lizard` to score complexity, and `NetworkX` to build deep dependency matrices.
*   **📊 Telemetry Dashboard**  
    Interactive Recharts plot historical complexity trends, system-wide code health over time, and pinpoint critical coupling hotspots.
*   **⚡ Universal Input System**  
    Frictionless onboarding: just paste any public GitHub repository URL or drag-and-drop a local `.zip` archive.
*   **💠 Cybernetic UI/UX**  
    Premium command center experience featuring glassmorphism, 3D mesh backgrounds, and sleek developer micro-interactions.

---

## 🎯 Who is DebtMap For?

| Target Cohort | Systemic Pain Point | DebtMap Visual Solution |
| :--- | :--- | :--- |
| **🎓 Students** | Struggle to comprehend large, complex project structures and code nesting. | Interactive 3D visual blocks map abstract architecture into visible buildings. |
| **⚡ Startups** | Rapid iterations lead to unmanaged debt that silently bloats codebases. | Immediate hotspots discovery points developers to high-complexity files. |
| **🏢 Enterprises** | Massive legacy systems where no single engineer has a full architectural view. | Renders the complete directory hierarchy inside a single visual cockpit. |
| **🌐 Open Source** | External PRs can introduce bad coupling or nesting degradation unnoticed. | Visualizes incremental changes on every commit to verify overall system health. |

---

## 🛠️ Technical Specs Architecture

### Frontend (Production: Vercel Edge Network)
*   **Core:** React 18, TypeScript, Vite
*   **3D Engine:** Three.js, React Three Fiber (R3F)
*   **State Management:** Zustand
*   **Code Editor:** Monaco Editor
*   **Data Visualization:** Recharts
*   **Styling:** Tailwind CSS, Framer Motion, Vanilla CSS Modules

### Backend (Production: Railway Cloud + Supabase)
*   **API Gateway:** FastAPI (Async IO WebSocket)
*   **AST Syntax Scanner:** tree-sitter
*   **Complexity Scoring:** radon + lizard
*   **Dependency Graphing:** NetworkX
*   **Git Analysis:** GitPython
*   **AI Engine:** Anthropic API (Claude 3.5 Sonnet)
*   **Async Queues:** Celery + Redis pipelines
*   **Database:** PostgreSQL (Supabase) + SQLAlchemy

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18+) and npm/yarn installed. 

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/debtmap.git
   cd debtmap
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Variables**
   Create a `.env` file in the root and add your backend API paths or necessary keys:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` to view the application in the browser.

---

## 👥 The Team

Built with ❤️ for the **DebtMap Hackathon 2026** by:

*   **Bishnu Kumar Sardar** — Full Stack Developer & Architect
*   **Ansika Singh** — UI/UX Design & Frontend Developer

*Cambridge Institute of Technology, KR Puram, Bangalore*

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
