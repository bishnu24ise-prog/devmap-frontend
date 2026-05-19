import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAnalyzeMutation } from '../hooks/useAnalyze';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { GitBranch, UploadCloud, FolderGit2, ArrowRight, ArrowDown, ChevronUp, Github, Twitter, Linkedin, Mail, Star, Shield, Zap, Activity } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Hero3DPreview } from './Hero3DPreview';

const COMPLEXITY_DATA = [
  { month: 'Jan', score: 45 }, { month: 'Feb', score: 52 }, { month: 'Mar', score: 48 },
  { month: 'Apr', score: 61 }, { month: 'May', score: 59 }, { month: 'Jun', score: 75 },
  { month: 'Jul', score: 68 }, { month: 'Aug', score: 82 }, { month: 'Sep', score: 71 },
];

const COUPLING_DATA = [
  { module: 'Auth', connections: 85 }, { module: 'Payments', connections: 65 },
  { module: 'UI Core', connections: 40 }, { module: 'Database', connections: 95 },
  { module: 'API Edge', connections: 75 },
];

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'about-hero', label: 'About' },
  { id: 'narrative', label: 'Story' },
  { id: 'cohorts', label: 'Users' },
  { id: 'features', label: 'Features' },
  { id: 'how-it-works', label: 'How' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'stack', label: 'Stack' },
  { id: 'founder', label: 'Founder' },
];

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

/* Hook: IntersectionObserver for scroll reveals */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ className = 'reveal', children, style }: { className?: string; children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useReveal();
  return <div ref={ref} className={className} style={style}>{children}</div>;
}

const ScrambleText = ({ text, className = '' }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    if (!isHovered) return;
    const chars = '!<>-_\\\\/[]{}—=+*^?#_';
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split('').map((letter, index) => {
        if (index < iteration) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text, isHovered]);

  return <span className={className} onMouseEnter={() => setIsHovered(true)}>{displayText}</span>;
};

const SpotlightCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div ref={divRef} onMouseMove={handleMouseMove} onMouseEnter={() => setOpacity(1)} onMouseLeave={() => setOpacity(0)} className={`relative overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-0" style={{ opacity, background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(34,211,238,0.15), transparent 40%)` }} />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export const LandingPage: React.FC = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [isDragActive, setIsDragActive] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const analyzeMutation = useAnalyzeMutation();

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.35 });
    SECTIONS.forEach(s => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const container = document.getElementById('landing-scroll');
    if (!container) return;
    const onScroll = () => setScrolled(container.scrollTop > 50);
    container.addEventListener('scroll', onScroll);
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (repoUrl.trim()) analyzeMutation.mutate({ repoUrl, isZip: false }); };
  const handleTemplate = (url: string) => { setRepoUrl(url); analyzeMutation.mutate({ repoUrl: url, isZip: false }); };
  const handleDrag = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setIsDragActive(e.type === 'dragenter' || e.type === 'dragover'); };
  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); setIsDragActive(false); const f = e.dataTransfer.files?.[0]; if (f?.name.endsWith('.zip')) analyzeMutation.mutate({ repoUrl: `file://${f.name}`, isZip: true }); };
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f?.name.endsWith('.zip')) analyzeMutation.mutate({ repoUrl: `file://${f.name}`, isZip: true }); };

  return (
    <div id="landing-scroll" className="bg-[#020617] text-slate-100 font-sans scroll-smooth" style={{overflowY:'auto',height:'100vh'}}>

      {/* ===== FLOATING PARTICLES (always visible) ===== */}
      <div className="particles">
        {Array.from({length:8}).map((_,i) => <div key={i} className="particle" />)}
      </div>

      {/* ===== STICKY TOP NAVBAR ===== */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center text-slate-950 font-black text-sm font-outfit">D</div>
            <span className="text-lg font-extrabold font-outfit bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">DebtMap</span>
            <span className="text-[8px] font-mono text-slate-600 border border-slate-700 px-1.5 py-0.5 rounded-full ml-1">v1.0</span>
          </button>
          <nav className="hidden md:flex items-center gap-1">
            {[['hero','Home'],['features','Features'],['stack','Tech Stack'],['about-hero','About'],['founder','Contact']].map(([id,label]) => (
              <button key={id} onClick={() => scrollTo(id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeSection === id ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}>{label}</button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-300 transition-colors"><Github className="h-4 w-4" /></a>
            <button onClick={() => scrollTo('hero')} className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 text-white text-xs font-bold hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all">Try Demo</button>
          </div>
        </div>
      </header>

      {/* ===== FLOATING SIDE NAV ===== */}
      <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 items-end">
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => scrollTo(s.id)} className="group flex items-center gap-2 transition-all duration-300">
            <span className={`text-[10px] font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 px-2 py-0.5 rounded bg-slate-900/80 ${activeSection === s.id ? '!opacity-100 text-cyan-400' : 'text-slate-500'}`}>{s.label}</span>
            <div className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${activeSection === s.id ? 'bg-cyan-400 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.6)] scale-150' : 'border-slate-600 bg-transparent group-hover:border-cyan-500 group-hover:scale-125'}`} />
          </button>
        ))}
      </nav>

      {/* ====================== SECTION 1: HERO ====================== */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center p-6 pt-24 relative overflow-hidden mesh-bg">
        {/* The Live 3D Canvas Background */}
        <Hero3DPreview />
        
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-80 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />

        <Reveal className="reveal text-center z-10 max-w-4xl flex flex-col items-center mb-16">
          <div className="inline-flex items-center gap-2 bg-slate-950/80 border border-cyan-500/30 text-cyan-400 px-4 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider shadow-lg mb-6 shimmer-line">
            <FolderGit2 className="h-4 w-4" /> Next-Gen Technical Debt Visualizer
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight font-outfit mb-6 leading-none">
            <ScrambleText text="Visualize Codebases as" /> <br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent glow-text-cyan">Interactive 3D Cities</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">Paste a GitHub repository URL or drag a ZIP to map coupling, complexity, and coverage metrics onto dynamic 3D building districts.</p>
        </Reveal>

        <Reveal className="reveal stagger-2 grid grid-cols-1 lg:grid-cols-12 gap-6 w-full max-w-6xl z-10">
          <Card className="lg:col-span-7 border-white/5 shadow-2xl glass-panel hover-lift">
            <CardHeader className="pb-3"><CardTitle className="text-xl font-bold flex items-center gap-2 font-outfit"><GitBranch className="h-5 w-5 text-cyan-400" /> Repository URL</CardTitle><CardDescription>Input any public repository endpoint to parse files as buildings.</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input value={repoUrl} onChange={e => setRepoUrl(e.target.value)} placeholder="https://github.com/facebook/react" className="bg-slate-950/80 border-white/5 h-11" />
                <Button type="submit" loading={analyzeMutation.isPending} className="px-5 h-11 flex items-center gap-2">Analyze <ArrowRight className="h-4 w-4" /></Button>
              </form>
              <div className="grid grid-cols-3 gap-2">
                {[['https://github.com/facebook/react','facebook/react','TypeScript'],['https://github.com/fastapi/fastapi','fastapi/fastapi','Python'],['https://github.com/kubernetes/kubernetes','kube/kubernetes','Go']].map(([u,n,d]) => (
                  <button key={u} onClick={() => handleTemplate(u)} className="p-3 rounded-lg border border-white/5 bg-slate-900/40 hover:bg-slate-900/70 hover:border-cyan-500/20 text-left transition-all hover-lift">
                    <div className="text-xs font-bold text-slate-300 font-outfit">{n}</div><div className="text-[10px] text-slate-500 font-mono">{d}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className={`lg:col-span-5 border-white/5 shadow-2xl glass-panel hover-lift flex flex-col justify-center ${isDragActive ? 'border-cyan-400 bg-cyan-500/5' : ''}`} onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop}>
            <CardHeader><CardTitle className="text-lg font-bold flex items-center gap-2"><UploadCloud className="h-5 w-5 text-slate-400" /> Zip Upload</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-center py-6">
              <label className="w-full flex flex-col items-center border-2 border-dashed border-white/5 hover:border-cyan-500/20 rounded-xl p-6 cursor-pointer transition-colors">
                <UploadCloud className="h-8 w-8 text-slate-500 mb-2" /><p className="text-sm text-slate-400">Click to browse .ZIP files</p>
                <input type="file" accept=".zip" className="hidden" onChange={handleFile} />
              </label>
            </CardContent>
          </Card>
        </Reveal>

        {/* Animated stats bar */}
        <Reveal className="reveal stagger-3 w-full max-w-4xl z-10 mt-12 grid grid-cols-4 gap-6 text-center">
          {[['30+','Languages'],['60fps','3D Render'],['< 5s','Parse Time'],['100%','Coverage Map']].map(([val,label]) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="text-2xl font-extrabold font-outfit bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">{val}</span>
              <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">{label}</span>
            </div>
          ))}
        </Reveal>

        <button onClick={() => scrollTo('about-hero')} className="absolute bottom-8 z-10 flex flex-col items-center gap-1 text-cyan-400 animate-bounce">
          <span className="text-[10px] font-mono tracking-widest uppercase">Scroll Down</span><ArrowDown className="h-4 w-4" />
        </button>
      </section>

      {/* ====================== SECTION 2: ABOUT HERO ====================== */}
      <section id="about-hero" className="min-h-screen flex flex-col items-center justify-center text-center p-8 md:p-16 relative overflow-hidden mesh-bg">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/8 rounded-full blur-[120px]" />
        <Reveal className="reveal relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-5 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-widest mb-8 shimmer-line">🎯 Platform Architect</div>
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight font-outfit leading-none mb-8 cursor-default">
            Built by <br className="md:hidden" />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent glow-text-cyan">
              <ScrambleText text="Bishnu Kumar Sardar" />
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl mx-auto mb-10">Full Stack Developer & Architect — Cambridge Institute of Technology, KR Puram, Bangalore</p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => scrollTo('narrative')} className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-bold text-sm hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all hover-lift">Read My Story</button>
            <button onClick={() => scrollTo('founder')} className="px-6 py-3 rounded-xl border border-white/10 text-slate-300 font-bold text-sm hover:border-cyan-500/30 transition-all hover-lift">View Profile</button>
          </div>
        </Reveal>
      </section>

      {/* ====================== SECTION 3: NARRATIVE ====================== */}
      <section id="narrative" className="min-h-[80vh] flex items-center justify-center p-8 md:p-16">
        <Reveal className="reveal-scale max-w-4xl w-full p-10 md:p-14 rounded-3xl border border-cyan-500/15 bg-slate-950/60 backdrop-blur-xl shadow-[0_0_60px_rgba(6,182,212,0.05)] relative overflow-hidden gradient-border glow-pulse">
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8"><span className="text-xl">📖</span><span className="text-[10px] font-mono uppercase tracking-[4px] text-cyan-400 font-bold">Narrative Statement</span></div>
            <blockquote className="text-xl md:text-2xl font-light italic text-slate-200 leading-relaxed border-l-4 border-cyan-400 pl-8">
              "I independently architected and built DebtMap from the ground up — a full-stack technical debt visualizer that transforms any codebase into a navigable 3D city. Every building is a file. Height = complexity. Width = coupling. Texture decay = no test coverage. Click any building and Claude AI gives you an instant refactor plan."
            </blockquote>
          </div>
        </Reveal>
      </section>

      {/* ====================== SECTION 4: COHORTS TABLE ====================== */}
      <section id="cohorts" className="min-h-[80vh] flex flex-col justify-center p-8 md:p-16 max-w-6xl mx-auto">
        <Reveal className="reveal-left">
          <div className="flex items-center gap-3 mb-2"><span className="text-2xl">👥</span><h2 className="text-3xl font-extrabold font-outfit uppercase tracking-wider">Who is DebtMap for?</h2></div>
          <p className="text-sm text-slate-500 font-mono mb-8 ml-10">Analyzing standard user cohorts, pain points, and systemic solutions</p>
        </Reveal>
        <Reveal className="reveal stagger-2 rounded-2xl border border-white/5 overflow-hidden shadow-2xl glow-pulse">
          <table className="w-full border-collapse">
            <thead><tr className="bg-slate-900/80 text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
              <th className="p-5 text-left border-b border-white/5 w-1/5">Target Cohort</th><th className="p-5 text-left border-b border-white/5 w-2/5">Systemic Pain Point</th><th className="p-5 text-left border-b border-white/5 w-2/5">DebtMap Solution</th>
            </tr></thead>
            <tbody>
              {[
                ['🎓 Students','Struggle to comprehend large, complex project structures and understand code nesting depths.','Interactive 3D visual city blocks that map abstract architecture into visible buildings!'],
                ['⚡ Startups','Rapid iterations lead to unmanaged debt that silently bloats codebases and slows onboarding.','Immediate hotspots discovery, pointing developers to highest complexity files.'],
                ['🏢 Enterprises','Legacy systems with millions of lines where no engineer has a full architectural view.','Complete directory hierarchy in a single visual cockpit for strategic debt planning.'],
                ['🌐 Open Source','External PRs can introduce bad coupling or nesting degradation unnoticed.','Webhook automation analyzing incremental changes on every commit push.'],
              ].map(([c,p,s], i) => (
                <tr key={i} className="bg-slate-950/40 hover:bg-cyan-500/[0.03] transition-colors border-b border-white/3">
                  <td className="p-5 font-bold text-slate-100 text-sm font-outfit">{c}</td>
                  <td className="p-5 text-slate-400 text-sm leading-relaxed">{p}</td>
                  <td className="p-5 text-cyan-400 font-medium text-sm leading-relaxed">{s}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </section>

      {/* ====================== SECTION 5: FEATURES ====================== */}
      <section id="features" className="min-h-[80vh] flex flex-col justify-center p-8 md:p-16 max-w-6xl mx-auto">
        <Reveal className="reveal-left">
          <div className="flex items-center gap-3 mb-2"><span className="text-2xl">⭐</span><h2 className="text-3xl font-extrabold font-outfit uppercase tracking-wider">Key Differentiators</h2></div>
          <p className="text-sm text-slate-500 font-mono mb-8 ml-10">Why DebtMap is the ultimate technical debt analytical cockpit</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            ['🏙️','Interactive 3D Codebase','Translates complex software repositories into a navigable, 60fps 3D city using React Three Fiber.','from-cyan-500/10','hero'],
            ['🤖','AI Refactoring Engine','Click any problem building to instantly generate Claude 3.5 Sonnet refactoring plans in Monaco editor.','from-purple-500/10','how-it-works'],
            ['🕸️','Deep AST Analysis','tree-sitter parses 30+ languages, radon scores complexity, and NetworkX builds dependency graphs.','from-amber-500/10','stack'],
            ['📊','Telemetry Dashboard','Interactive Recharts plot historical complexity trends and identify critical coupling hotspots.','from-rose-500/10','analytics'],
            ['⚡','Universal Input System','Frictionless onboarding: paste any public GitHub repository URL or drag-and-drop a local .ZIP file.','from-emerald-500/10','hero'],
            ['💠','Cybernetic UI/UX','Premium command center experience featuring glassmorphism, 3D backgrounds, and hacker micro-interactions.','from-indigo-500/10','hero'],
          ].map(([icon, title, desc, grad, targetId], i) => (
            <Reveal key={title} className={`reveal-scale stagger-${i+1} h-full`}>
              <button onClick={() => scrollTo(targetId as string)} className="w-full text-left h-full block">
                <SpotlightCard className={`group p-7 rounded-2xl border border-white/5 bg-gradient-to-br ${grad} to-transparent backdrop-blur-sm hover:border-cyan-500/20 hover:shadow-[0_0_30px_rgba(6,182,212,0.08)] transition-all duration-500 hover-lift h-full`}>
                  <span className="text-3xl block mb-4">{icon}</span>
                  <h3 className="text-base font-bold font-outfit text-slate-100 mb-2">{title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
                </SpotlightCard>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ====================== SECTION 6: ANALYTICS DEMO ====================== */}
      <section id="analytics" className="min-h-[80vh] flex flex-col justify-center p-8 md:p-16 max-w-6xl mx-auto">
        <Reveal className="reveal-left">
          <div className="flex items-center gap-3 mb-2"><span className="text-2xl">📊</span><h2 className="text-3xl font-extrabold font-outfit uppercase tracking-wider">Live Analytics Demo</h2></div>
          <p className="text-sm text-slate-500 font-mono mb-8 ml-10">Real-time mock telemetry demonstrating AST parsing metrics</p>
        </Reveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Complexity Line Chart */}
          <Reveal className="reveal-scale stagger-1 rounded-2xl border border-white/5 bg-slate-950/60 backdrop-blur-xl p-6 shadow-xl hover-lift">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-200 font-outfit flex items-center gap-2"><Activity className="h-4 w-4 text-cyan-400" /> Cyclomatic Complexity Trend</h3>
                <p className="text-xs text-slate-500 font-mono mt-1">System-wide code complexity over time</p>
              </div>
              <div className="px-3 py-1 rounded bg-cyan-500/10 text-cyan-400 text-xs font-bold font-mono border border-cyan-500/20">+14.5%</div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={COMPLEXITY_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
                    itemStyle={{ color: '#22d3ee', fontSize: '12px', fontWeight: 'bold' }}
                    labelStyle={{ color: '#94a3b8', fontSize: '10px', marginBottom: '4px' }}
                  />
                  <Line type="monotone" dataKey="score" stroke="#22d3ee" strokeWidth={3} dot={{ r: 4, fill: '#0f172a', stroke: '#22d3ee', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#22d3ee', stroke: '#fff', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Reveal>

          {/* Coupling Bar Chart */}
          <Reveal className="reveal-scale stagger-2 rounded-2xl border border-white/5 bg-slate-950/60 backdrop-blur-xl p-6 shadow-xl hover-lift">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-200 font-outfit flex items-center gap-2"><GitBranch className="h-4 w-4 text-indigo-400" /> Module Coupling Hotspots</h3>
                <p className="text-xs text-slate-500 font-mono mt-1">Inter-module dependency connections</p>
              </div>
              <div className="px-3 py-1 rounded bg-indigo-500/10 text-indigo-400 text-xs font-bold font-mono border border-indigo-500/20">Critical</div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={COUPLING_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                  <XAxis type="number" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis dataKey="module" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} width={80} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                    contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '8px' }}
                    itemStyle={{ color: '#818cf8', fontSize: '12px', fontWeight: 'bold' }}
                    labelStyle={{ display: 'none' }}
                  />
                  <Bar dataKey="connections" fill="url(#colorConnections)" radius={[0, 4, 4, 0]} barSize={16}>
                    {/* Add gradient definition inside the BarChart using standard SVG defs pattern if needed, but for simplicity we use a solid glowing color or standard fill */}
                  </Bar>
                  <defs>
                    <linearGradient id="colorConnections" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#818cf8" stopOpacity={1}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================== SECTION 7: TECH STACK ====================== */}
      <section id="stack" className="min-h-[80vh] flex flex-col justify-center p-8 md:p-16 max-w-6xl mx-auto">
        <Reveal className="reveal-left">
          <div className="flex items-center gap-3 mb-2"><span className="text-2xl">🛠</span><h2 className="text-3xl font-extrabold font-outfit uppercase tracking-wider">Technical Specs</h2></div>
          <p className="text-sm text-slate-500 font-mono mb-8 ml-10">Complete stack configurations across all project modules</p>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            ['Backend Architecture (Python)', [['API Gateway','FastAPI (Async WebSocket)'],['AST Scanner','tree-sitter (30+ langs)'],['Complexity','radon + lizard'],['Graph Lib','NetworkX'],['Git Analysis','GitPython'],['AI Endpoint','Claude 3.5 Sonnet'],['Task Queue','Celery + Redis'],['ORM','SQLAlchemy']]],
            ['Deployment & Infrastructure', [['Database','Supabase (PostgreSQL + JWT)'],['Containers','Docker Orchestration'],['CI/CD','GitHub Actions'],['Frontend','Vercel Edge Network'],['Backend','Railway Cloud'],['DNS/Proxy','Cloudflare Premium CDN'],['Monitoring','Sentry + Posthog']]],
          ].map(([title, rows], idx) => (
            <Reveal key={title as string} className={`${idx === 0 ? 'reveal-left' : 'reveal-right'} rounded-2xl border border-white/5 overflow-hidden bg-slate-950/60 backdrop-blur-xl shadow-xl hover-lift`}>
              <div className="bg-slate-900/60 p-4 border-b border-white/5 font-bold text-sm font-outfit text-slate-200 shimmer-line">{title as string}</div>
              {(rows as string[][]).map(([k, v]) => (
                <div key={k} className="flex items-center justify-between px-5 py-3 border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors font-mono text-xs">
                  <span className="text-slate-500">{k}</span><span className="text-slate-200 font-semibold">{v}</span>
                </div>
              ))}
            </Reveal>
          ))}
        </div>
      </section>

      {/* ====================== SECTION 7: FOUNDER ====================== */}
      <section id="founder" className="min-h-[80vh] flex items-center justify-center p-8 md:p-16">
        <Reveal className="reveal-scale max-w-5xl w-full p-10 md:p-14 rounded-3xl border border-cyan-500/20 bg-slate-950/70 backdrop-blur-xl shadow-[0_0_60px_rgba(6,182,212,0.06)] relative overflow-hidden gradient-border">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.04),transparent_60%)]" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-10">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-400 via-sky-400 to-purple-500 flex items-center justify-center font-black font-outfit text-3xl text-slate-950 shadow-[0_0_40px_rgba(6,182,212,0.4)] shrink-0 border-2 border-cyan-300/30 relative">
                BKS
                <div className="absolute inset-[-8px] rounded-full border border-cyan-400/20 animate-ping opacity-30" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold font-outfit leading-none mb-1 cursor-default"><ScrambleText text="Bishnu Kumar Sardar" /></h3>
                <p className="text-sm text-cyan-400 font-semibold font-mono uppercase tracking-wider mb-1">Full Stack Developer & Architect</p>
                <p className="text-xs text-slate-400">Cambridge Institute of Technology, KR Puram, Bangalore</p>
              </div>
            </div>
            <div className="flex-1 w-full lg:max-w-md rounded-2xl border border-white/5 overflow-hidden font-mono text-[11px] bg-slate-950/70 shadow-2xl">
              <div className="grid grid-cols-3 p-3 bg-slate-900/40 border-b border-white/5 text-slate-500 font-bold uppercase tracking-widest text-[8px]">
                <div>Variable</div><div className="col-span-2">Diagnostic Value</div>
              </div>
              {[['Name','Bishnu Kumar Sardar','text-slate-100 font-bold'],['College','Cambridge Institute of Technology, KR Puram','text-slate-300'],['Role','Full Stack Developer & Architect','text-cyan-400 font-bold'],['Frontend','React 18, TS, Three.js, R3F, Zustand, Monaco, Recharts','text-slate-300'],['Backend','FastAPI, tree-sitter, radon, NetworkX, Claude AI, Supabase','text-slate-300'],['Deployed','Vercel + Railway + Cloudflare CDN','text-emerald-400 font-semibold']].map(([k,v,cls]) => (
                <div key={k} className="grid grid-cols-3 p-3 border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors">
                  <div className="text-slate-500">{k}</div><div className={`col-span-2 ${cls}`}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-12 pt-6 border-t border-white/5">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] text-indigo-400 font-bold tracking-widest uppercase bg-indigo-500/10 border border-indigo-500/20 px-6 py-2.5 rounded-full shadow-lg animate-pulse">Built with love for DebtMap Hackathon 2026</span>
          </div>
        </Reveal>
      </section>

      {/* ====================== HOW IT WORKS ====================== */}
      <section id="how-it-works" className="min-h-[70vh] flex flex-col justify-center p-8 md:p-16 max-w-6xl mx-auto">
        <Reveal className="reveal-left">
          <div className="flex items-center gap-3 mb-2"><span className="text-2xl">🚀</span><h2 className="text-3xl font-extrabold font-outfit uppercase tracking-wider">How It Works</h2></div>
          <p className="text-sm text-slate-500 font-mono mb-12 ml-10">From repository URL to interactive 3D city in three simple steps</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-purple-500/30" />
          {[
            ['01','Paste Repository URL','Drop any GitHub repository URL or upload a ZIP archive. DebtMap clones and indexes the entire codebase.','from-cyan-500/20','text-cyan-400'],
            ['02','AST Analysis & Scoring','tree-sitter parses every file into ASTs. radon and lizard calculate complexity. NetworkX builds coupling graphs.','from-indigo-500/20','text-indigo-400'],
            ['03','Explore Your 3D City','Navigate the interactive Three.js city. Click buildings for AI refactor plans. Track debt on the dashboard.','from-purple-500/20','text-purple-400'],
          ].map(([num,title,desc,grad,color], i) => (
            <Reveal key={num} className={`reveal-scale stagger-${i+1}`}>
              <div className={`text-center p-8 rounded-2xl border border-white/5 bg-gradient-to-b ${grad} to-transparent hover-lift relative`}>
                <div className={`w-14 h-14 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center ${color} text-2xl font-black font-outfit mx-auto mb-6 shadow-lg`}>{num}</div>
                <h3 className="text-base font-bold font-outfit text-slate-100 mb-3">{title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ====================== TRUST BADGES ====================== */}
      <Reveal className="reveal flex justify-center gap-6 py-12 flex-wrap">
        {[
          [Star,'1.2k Stars','GitHub Community'],
          [Shield,'MIT License','Open Source'],
          [Zap,'< 5s Analysis','Lightning Fast'],
          [GitBranch,'30+ Languages','Universal Support'],
        ].map(([Icon, val, label]) => (
          <div key={label as string} className="flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-900/40 border border-white/5">
            <Icon className="h-4 w-4 text-cyan-400" />
            <div><div className="text-xs font-bold text-slate-200">{val as string}</div><div className="text-[9px] text-slate-500 font-mono">{label as string}</div></div>
          </div>
        ))}
      </Reveal>

      {/* ====================== FOOTER ====================== */}
      <footer className="border-t border-white/5 mt-8">
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center text-slate-950 font-black text-sm">D</div>
                <span className="text-xl font-extrabold font-outfit bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">DebtMap</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-6">Transform any codebase into an interactive 3D city. Visualize technical debt, discover hotspots, and get AI-powered refactoring plans.</p>
              <div className="flex gap-3">
                {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-lg bg-slate-900/60 border border-white/5 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all hover-lift"><Icon className="h-4 w-4" /></a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-4 font-mono">Product</h4>
              <div className="flex flex-col gap-2.5">
                {['3D City View','Debt Dashboard','AI Refactor','Monaco Editor'].map(t => (
                  <button key={t} onClick={() => scrollTo('features')} className="text-sm text-slate-500 hover:text-cyan-400 transition-colors text-left">{t}</button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-4 font-mono">Resources</h4>
              <div className="flex flex-col gap-2.5">
                {['Documentation','API Reference','GitHub Repo','Changelog'].map(t => (
                  <button key={t} onClick={() => scrollTo('stack')} className="text-sm text-slate-500 hover:text-cyan-400 transition-colors text-left">{t}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-slate-600 font-mono">2026 DebtMap. Built by Bishnu Kumar Sardar. All rights reserved.</p>
            <div className="flex gap-4 text-[11px] text-slate-600 font-mono">
              <span className="hover:text-slate-400 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-slate-400 cursor-pointer transition-colors">Terms of Service</span>
              <span className="hover:text-slate-400 cursor-pointer transition-colors">MIT License</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== BACK TO TOP ===== */}
      <button onClick={() => scrollTo('hero')} className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/30 hover:scale-110 transition-all shadow-lg backdrop-blur-sm">
        <ChevronUp className="h-5 w-5" />
      </button>
    </div>
  );
};
