import React from 'react';

const styles = {
  page: {
    width: '100%',
    minHeight: '100vh',
    background: '#020617',
    color: '#e2e8f0',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    overflowY: 'auto' as const,
    padding: '60px 40px',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
  },

  // SECTION 1 - HERO
  heroSection: {
    position: 'relative' as const,
    textAlign: 'center' as const,
    padding: '80px 40px',
    marginBottom: '80px',
    borderRadius: '24px',
    border: '1px solid rgba(6, 182, 212, 0.15)',
    background: 'linear-gradient(135deg, rgba(6,182,212,0.05) 0%, rgba(139,92,246,0.05) 100%)',
    overflow: 'hidden',
  },
  heroGrid: {
    position: 'absolute' as const,
    inset: 0,
    backgroundImage: 'linear-gradient(rgba(6,182,212,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.06) 1px, transparent 1px)',
    backgroundSize: '60px 60px',
    pointerEvents: 'none' as const,
  },
  heroBadge: {
    display: 'inline-block',
    background: 'rgba(6,182,212,0.1)',
    border: '1px solid rgba(6,182,212,0.3)',
    color: '#22d3ee',
    padding: '6px 18px',
    borderRadius: '50px',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '2px',
    textTransform: 'uppercase' as const,
    marginBottom: '24px',
  },
  heroTitle: {
    fontSize: '64px',
    fontWeight: 800,
    lineHeight: 1.1,
    margin: '0 0 24px 0',
    background: 'linear-gradient(135deg, #22d3ee 0%, #818cf8 50%, #a78bfa 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textShadow: 'none',
  },
  heroSubtitle: {
    fontSize: '18px',
    color: '#94a3b8',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: 1.6,
  },

  // SECTION 2 - NARRATIVE
  narrativeSection: {
    marginBottom: '80px',
    padding: '50px',
    borderRadius: '24px',
    border: '1px solid rgba(6,182,212,0.15)',
    background: 'rgba(15,23,42,0.6)',
    position: 'relative' as const,
  },
  narrativeLabel: {
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '3px',
    textTransform: 'uppercase' as const,
    color: '#22d3ee',
    marginBottom: '20px',
    display: 'block',
  },
  narrativeQuote: {
    fontSize: '22px',
    lineHeight: 1.7,
    fontStyle: 'italic' as const,
    color: '#cbd5e1',
    borderLeft: '4px solid #22d3ee',
    paddingLeft: '30px',
    margin: 0,
  },

  // SECTION 3 - TABLE
  tableSection: {
    marginBottom: '80px',
  },
  sectionTitle: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#f1f5f9',
    marginBottom: '8px',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
  },
  sectionSubtitle: {
    fontSize: '13px',
    color: '#64748b',
    marginBottom: '30px',
    fontFamily: 'monospace',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.05)',
  },
  tableHead: {
    background: 'rgba(15,23,42,0.8)',
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '2px',
    textTransform: 'uppercase' as const,
    color: '#64748b',
    fontFamily: 'monospace',
  },
  th: {
    padding: '16px 24px',
    textAlign: 'left' as const,
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  td: {
    padding: '20px 24px',
    borderBottom: '1px solid rgba(255,255,255,0.03)',
    verticalAlign: 'top' as const,
  },
  tdCohort: {
    padding: '20px 24px',
    borderBottom: '1px solid rgba(255,255,255,0.03)',
    fontWeight: 700,
    color: '#f1f5f9',
    fontSize: '15px',
    verticalAlign: 'top' as const,
  },
  tdPain: {
    padding: '20px 24px',
    borderBottom: '1px solid rgba(255,255,255,0.03)',
    color: '#94a3b8',
    lineHeight: 1.6,
    verticalAlign: 'top' as const,
  },
  tdSolution: {
    padding: '20px 24px',
    borderBottom: '1px solid rgba(255,255,255,0.03)',
    color: '#22d3ee',
    fontWeight: 500,
    lineHeight: 1.6,
    verticalAlign: 'top' as const,
  },
  tableRow: {
    background: 'rgba(15,23,42,0.4)',
  },

  // SECTION 4 - DIFFERENTIATORS
  diffSection: {
    marginBottom: '80px',
  },
  diffGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
  } as React.CSSProperties,
  diffCard: {
    padding: '30px',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.05)',
    background: 'rgba(15,23,42,0.5)',
  },
  diffEmoji: {
    fontSize: '32px',
    marginBottom: '16px',
    display: 'block',
  },
  diffCardTitle: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#f1f5f9',
    marginBottom: '8px',
  },
  diffCardDesc: {
    fontSize: '13px',
    color: '#94a3b8',
    lineHeight: 1.6,
  },

  // SECTION 5 - TECH STACK
  techSection: {
    marginBottom: '80px',
  },
  techGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
  } as React.CSSProperties,
  techPanel: {
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.05)',
    overflow: 'hidden',
    background: 'rgba(15,23,42,0.5)',
  },
  techHeader: {
    padding: '16px 20px',
    background: 'rgba(15,23,42,0.8)',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    fontWeight: 700,
    fontSize: '14px',
    color: '#e2e8f0',
  },
  techRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '14px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.03)',
    fontSize: '12px',
    fontFamily: 'monospace',
  },
  techLabel: {
    color: '#64748b',
  },
  techValue: {
    color: '#f1f5f9',
    fontWeight: 600,
  },

  // SECTION 6 - FOUNDER
  founderSection: {
    padding: '50px',
    borderRadius: '24px',
    border: '1px solid rgba(6,182,212,0.2)',
    background: 'rgba(15,23,42,0.7)',
    marginBottom: '40px',
    position: 'relative' as const,
  },
  founderTopLine: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.4), transparent)',
  },
  founderContent: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '40px',
    flexWrap: 'wrap' as const,
  },
  founderProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  founderAvatar: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #22d3ee, #818cf8, #a78bfa)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    fontWeight: 800,
    color: '#020617',
    flexShrink: 0,
    boxShadow: '0 0 30px rgba(6,182,212,0.3)',
  },
  founderName: {
    fontSize: '24px',
    fontWeight: 800,
    color: '#f1f5f9',
    margin: '0 0 4px 0',
  },
  founderRole: {
    color: '#22d3ee',
    fontSize: '13px',
    fontWeight: 600,
    letterSpacing: '1px',
    textTransform: 'uppercase' as const,
    margin: '0 0 4px 0',
    fontFamily: 'monospace',
  },
  founderCollege: {
    color: '#94a3b8',
    fontSize: '13px',
    margin: 0,
  },
  telemetryTable: {
    flex: 1,
    minWidth: '320px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.05)',
    overflow: 'hidden',
    fontFamily: 'monospace',
    fontSize: '11px',
    background: 'rgba(2,6,23,0.5)',
  },
  telemetryHeader: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    padding: '10px 16px',
    background: 'rgba(15,23,42,0.6)',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    color: '#475569',
    fontWeight: 700,
    fontSize: '9px',
    letterSpacing: '2px',
    textTransform: 'uppercase' as const,
  } as React.CSSProperties,
  telemetryRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    padding: '10px 16px',
    borderBottom: '1px solid rgba(255,255,255,0.03)',
  } as React.CSSProperties,
  telemetryLabel: {
    color: '#64748b',
  },
  telemetryValue: {
    color: '#e2e8f0',
    fontWeight: 600,
  },
  telemetryValueCyan: {
    color: '#22d3ee',
    fontWeight: 700,
  },
  telemetryValueGreen: {
    color: '#34d399',
    fontWeight: 600,
  },
  footerTag: {
    textAlign: 'center' as const,
    marginTop: '40px',
    paddingTop: '24px',
    borderTop: '1px solid rgba(255,255,255,0.05)',
  },
  footerBadge: {
    display: 'inline-block',
    background: 'rgba(99,102,241,0.1)',
    border: '1px solid rgba(99,102,241,0.2)',
    color: '#818cf8',
    padding: '8px 24px',
    borderRadius: '50px',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '2px',
    textTransform: 'uppercase' as const,
    fontFamily: 'monospace',
  },
};

export const AboutPage: React.FC = () => {
  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* SECTION 1 - HERO BANNER */}
        <div style={styles.heroSection}>
          <div style={styles.heroGrid} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={styles.heroBadge}>Team DebtMap</span>
            <h1 style={styles.heroTitle}>Built by Bishnu & Ansika</h1>
            <p style={styles.heroSubtitle}>
              Engineering & Design Visionaries -- Cambridge Institute of Technology, KR Puram, Bangalore
            </p>
          </div>
        </div>

        {/* SECTION 2 - PROJECT NARRATIVE */}
        <div style={styles.narrativeSection}>
          <span style={styles.narrativeLabel}>Narrative Statement</span>
          <p style={styles.narrativeQuote}>
            "We independently architected and built DebtMap from the ground up -- a full-stack technical debt visualizer that transforms any codebase into a navigable 3D city. Every building is a file. Height = complexity. Width = coupling. Texture decay = no test coverage. Click any building and Claude AI gives you an instant refactor plan."
          </p>
        </div>

        {/* SECTION 3 - PRODUCT OVERVIEW TABLE */}
        <div style={styles.tableSection}>
          <h2 style={styles.sectionTitle}>Who is DebtMap for?</h2>
          <p style={styles.sectionSubtitle}>Analyzing standard user cohorts, pain points, and systemic solutions</p>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHead}>
                <th style={styles.th}>Target Cohort</th>
                <th style={styles.th}>Systemic Pain Point</th>
                <th style={styles.th}>DebtMap Visual Solution</th>
              </tr>
            </thead>
            <tbody>
              <tr style={styles.tableRow}>
                <td style={styles.tdCohort}>Students</td>
                <td style={styles.tdPain}>Struggle to comprehend large, complex, coupled project structures and understand the concrete effects of code nesting depths and class imports.</td>
                <td style={styles.tdSolution}>DebtMap provides an interactive 3D visual city blocks layout that maps dry abstract OOP architecture definitions into visible buildings!</td>
              </tr>
              <tr style={styles.tableRow}>
                <td style={styles.tdCohort}>Startups</td>
                <td style={styles.tdPain}>Rapid feature iterations and fast prototyping lead to unmanaged technical debt that silently bloats codebases and slows down new developer onboarding.</td>
                <td style={styles.tdSolution}>Enables immediate hotspots discovery, pointing developers exactly to the files containing high complexity and structural blockages.</td>
              </tr>
              <tr style={styles.tableRow}>
                <td style={styles.tdCohort}>Enterprises</td>
                <td style={styles.tdPain}>Legacy systems and massive code repositories have siloed files with millions of lines, where no single engineer has a high-level architectural view.</td>
                <td style={styles.tdSolution}>Renders the complete directory hierarchy inside a single visual cockpit, simplifying code reviews and strategic technical debt planning.</td>
              </tr>
              <tr style={styles.tableRow}>
                <td style={styles.tdCohort}>Open Source</td>
                <td style={styles.tdPain}>Inbound code pull requests from external contributors can introduce bad import coupling or nesting degradation without maintainers noticing.</td>
                <td style={styles.tdSolution}>Allows direct webhook automation pipelines that analyze incremental changes on every commit push to verify overall system health.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SECTION 4 - KEY DIFFERENTIATORS */}
        <div style={styles.diffSection}>
          <h2 style={styles.sectionTitle}>Key Differentiators</h2>
          <p style={styles.sectionSubtitle}>Why DebtMap is the ultimate technical debt analytical command cockpit</p>
          <div style={styles.diffGrid}>
            <div style={styles.diffCard}>
              <span style={styles.diffEmoji}>{"[City]"}</span>
              <div style={styles.diffCardTitle}>City Metaphor</div>
              <div style={styles.diffCardDesc}>Maps dry software data onto 3D building blocks, where physical dimensions map directly to technical indices (height = complexity, width = coupling).</div>
            </div>
            <div style={styles.diffCard}>
              <span style={styles.diffEmoji}>{"[AI]"}</span>
              <div style={styles.diffCardTitle}>Claude AI Refactor Plans</div>
              <div style={styles.diffCardDesc}>Integrates the Anthropic API to analyze clicked codebase skyscrapers and deliver real-time, side-by-side Monaco code refactoring plans instantly.</div>
            </div>
            <div style={styles.diffCard}>
              <span style={styles.diffEmoji}>{"[Live]"}</span>
              <div style={styles.diffCardTitle}>Live Analysis on Every Push</div>
              <div style={styles.diffCardDesc}>Hook up active GitHub Webhook listeners that scan codebase edits incrementally on every Git push, keeping the 3D map updated.</div>
            </div>
            <div style={styles.diffCard}>
              <span style={styles.diffEmoji}>{"[Graph]"}</span>
              <div style={styles.diffCardTitle}>Coupling Graph via NetworkX</div>
              <div style={styles.diffCardDesc}>Leverages advanced NetworkX graph matrices on the backend to parse file import dependency graphs and calculate software coupling values.</div>
            </div>
            <div style={styles.diffCard}>
              <span style={styles.diffEmoji}>{"[3D]"}</span>
              <div style={styles.diffCardTitle}>Three.js 3D Renderer</div>
              <div style={styles.diffCardDesc}>A high-performance React Three Fiber WebGL canvas with custom OrbitControls and shader engines that renders code metropolis models at 60fps.</div>
            </div>
            <div style={styles.diffCard}>
              <span style={styles.diffEmoji}>{"[Score]"}</span>
              <div style={styles.diffCardTitle}>Multi-Metric Scoring</div>
              <div style={styles.diffCardDesc}>Aggregates cyclomatic complexity, coupling graph blockages, branch test coverage ratios, and file change ages into a unified scoring model.</div>
            </div>
          </div>
        </div>

        {/* SECTION 5 - TECH STACK */}
        <div style={styles.techSection}>
          <h2 style={styles.sectionTitle}>Technical Specs Architecture</h2>
          <p style={styles.sectionSubtitle}>Inspect the complete stack configurations engineered across all project modules</p>
          <div style={styles.techGrid}>
            <div style={styles.techPanel}>
              <div style={styles.techHeader}>Backend Architecture (Python)</div>
              <div style={styles.techRow}><span style={styles.techLabel}>API Gateway Framework</span><span style={styles.techValue}>FastAPI (Async IO WebSocket)</span></div>
              <div style={styles.techRow}><span style={styles.techLabel}>AST Syntax Query Scanner</span><span style={styles.techValue}>tree-sitter (30+ languages)</span></div>
              <div style={styles.techRow}><span style={styles.techLabel}>Complexity Scoring Engine</span><span style={styles.techValue}>radon + lizard</span></div>
              <div style={styles.techRow}><span style={styles.techLabel}>Dependency Graph Library</span><span style={styles.techValue}>NetworkX</span></div>
              <div style={styles.techRow}><span style={styles.techLabel}>Git History Analysis</span><span style={styles.techValue}>GitPython</span></div>
              <div style={styles.techRow}><span style={styles.techLabel}>AI Refactoring Endpoint</span><span style={styles.techValue}>anthropic (Claude 3.5 Sonnet)</span></div>
              <div style={styles.techRow}><span style={styles.techLabel}>Async Task Queue</span><span style={styles.techValue}>Celery + Redis pipelines</span></div>
              <div style={styles.techRow}><span style={styles.techLabel}>Test Frameworks</span><span style={styles.techValue}>pytest + coverage</span></div>
              <div style={styles.techRow}><span style={styles.techLabel}>ORM / Database Layer</span><span style={styles.techValue}>SQLAlchemy</span></div>
            </div>
            <div style={styles.techPanel}>
              <div style={styles.techHeader}>Deployment and DevOps Infrastructure</div>
              <div style={styles.techRow}><span style={styles.techLabel}>Primary Database</span><span style={styles.techValue}>Supabase (PostgreSQL + JWT Auth)</span></div>
              <div style={styles.techRow}><span style={styles.techLabel}>Container Engine</span><span style={styles.techValue}>Docker Orchestration</span></div>
              <div style={styles.techRow}><span style={styles.techLabel}>Continuous Integration</span><span style={styles.techValue}>GitHub Actions CI/CD</span></div>
              <div style={styles.techRow}><span style={styles.techLabel}>Frontend Production CDN</span><span style={styles.techValue}>Vercel Edge Network</span></div>
              <div style={styles.techRow}><span style={styles.techLabel}>Backend Core Cluster</span><span style={styles.techValue}>Railway Cloud Platform</span></div>
              <div style={styles.techRow}><span style={styles.techLabel}>DNS / Proxy Routing</span><span style={styles.techValue}>Cloudflare Premium CDN</span></div>
              <div style={styles.techRow}><span style={styles.techLabel}>System Logs / Diagnostics</span><span style={styles.techValue}>Sentry + Posthog analytics</span></div>
            </div>
          </div>
        </div>

        {/* SECTION 6 - TEAM CARDS */}
        <div style={styles.founderSection}>
          <div style={styles.founderTopLine} />
          <div style={styles.founderContent}>
            <div style={styles.founderProfile}>
              <div style={styles.founderAvatar}>BKS</div>
              <div>
                <h3 style={styles.founderName}>Bishnu Kumar Sardar</h3>
                <p style={styles.founderRole}>Full Stack Developer and Architect</p>
                <p style={styles.founderCollege}>Cambridge Institute of Technology, KR Puram, Bangalore</p>
              </div>
            </div>
            <div style={styles.telemetryTable}>
              <div style={styles.telemetryHeader}>
                <span>Telemetry Variable</span>
                <span>System Diagnostic Value</span>
              </div>
              <div style={styles.telemetryRow}>
                <span style={styles.telemetryLabel}>Name</span>
                <span style={styles.telemetryValue}>Bishnu Kumar Sardar</span>
              </div>
              <div style={styles.telemetryRow}>
                <span style={styles.telemetryLabel}>College</span>
                <span style={styles.telemetryValue}>Cambridge Institute of Technology, KR Puram, Bangalore</span>
              </div>
              <div style={styles.telemetryRow}>
                <span style={styles.telemetryLabel}>Role</span>
                <span style={styles.telemetryValueCyan}>Full Stack Developer and Architect</span>
              </div>
              <div style={styles.telemetryRow}>
                <span style={styles.telemetryLabel}>Frontend</span>
                <span style={styles.telemetryValue}>React 18, TS, Three.js, R3F, Zustand, Monaco, Recharts</span>
              </div>
              <div style={styles.telemetryRow}>
                <span style={styles.telemetryLabel}>Backend</span>
                <span style={styles.telemetryValue}>FastAPI, tree-sitter, radon, NetworkX, Claude AI, Supabase</span>
              </div>
              <div style={styles.telemetryRow}>
                <span style={styles.telemetryLabel}>Deployed</span>
                <span style={styles.telemetryValueGreen}>Vercel + Railway + Cloudflare CDN</span>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.founderSection}>
          <div style={styles.founderTopLine} />
          <div style={styles.founderContent}>
            <div style={styles.founderProfile}>
              <div style={{ ...styles.founderAvatar, background: 'linear-gradient(135deg, #f472b6, #c084fc, #818cf8)' }}>AS</div>
              <div>
                <h3 style={styles.founderName}>Ansika Singh</h3>
                <p style={styles.founderRole}>UI/UX Design & Frontend Developer</p>
                <p style={styles.founderCollege}>Cambridge Institute of Technology, KR Puram, Bangalore</p>
              </div>
            </div>
            <div style={styles.telemetryTable}>
              <div style={styles.telemetryHeader}>
                <span>Telemetry Variable</span>
                <span>System Diagnostic Value</span>
              </div>
              <div style={styles.telemetryRow}>
                <span style={styles.telemetryLabel}>Name</span>
                <span style={styles.telemetryValue}>Ansika Singh</span>
              </div>
              <div style={styles.telemetryRow}>
                <span style={styles.telemetryLabel}>College</span>
                <span style={styles.telemetryValue}>Cambridge Institute of Technology, KR Puram, Bangalore</span>
              </div>
              <div style={styles.telemetryRow}>
                <span style={styles.telemetryLabel}>Role</span>
                <span style={styles.telemetryValueCyan}>UI/UX Design & Frontend Developer</span>
              </div>
              <div style={styles.telemetryRow}>
                <span style={styles.telemetryLabel}>Design Stack</span>
                <span style={styles.telemetryValue}>Figma, Adobe XD, Framer Motion, Tailwind CSS</span>
              </div>
              <div style={styles.telemetryRow}>
                <span style={styles.telemetryLabel}>Frontend Stack</span>
                <span style={styles.telemetryValue}>React, Next.js, TypeScript, Three.js Aesthetics</span>
              </div>
              <div style={styles.telemetryRow}>
                <span style={styles.telemetryLabel}>Superpower</span>
                <span style={styles.telemetryValueGreen}>Turning complex code graphs into beautiful user experiences</span>
              </div>
            </div>
          </div>
          
          <div style={styles.footerTag}>
            <span style={styles.footerBadge}>Built with love for DebtMap Hackathon 2026</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
