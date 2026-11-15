import { useState, useEffect } from 'react';
import { useAetherStore } from '../../store/useAetherStore';
import { X, Layers, Code, ArrowLeft, ArrowRight, ChevronRight, Zap } from 'lucide-react';
import projectsData from '../../data/projects.json';
import ParallaxWrapper from '../ui/ParallaxWrapper';

const categoryColors = {
  'applied-ml': 'text-blue-400 border-blue-400/30 bg-blue-400/5',
  'generative-ai': 'text-purple-400 border-purple-400/30 bg-purple-400/5',
  'privacy-security': 'text-orange-400 border-orange-400/30 bg-orange-400/5',
  'statistical-modeling': 'text-cyan-400 border-cyan-400/30 bg-cyan-400/5',
  'ai-infrastructure': 'text-aether-green border-aether-green/30 bg-aether-green/5',
};

const statusColors = {
  'Complete': 'text-aether-green border-aether-green/30',
  'In Development': 'text-yellow-400 border-yellow-400/30',
};

const TiltCard = ({ children, onClick }) => {
  const [style, setStyle] = useState({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' });
  const [glare, setGlare] = useState({ opacity: 0 });

  const handleMouseMove = (e) => {
    const el = e.currentTarget;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 2;
    const y = ((e.clientY - top) / height - 0.5) * 2;
    setStyle({ transform: `perspective(1000px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) scale3d(1.02,1.02,1.02)`, transition: 'none' });
    setGlare({ opacity: 1, background: `radial-gradient(circle at ${e.clientX - left}px ${e.clientY - top}px, rgba(255,255,255,0.06) 0%, transparent 60%)`, transition: 'none' });
  };

  const handleMouseLeave = () => {
    setStyle({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)', transition: 'transform 0.4s ease-out' });
    setGlare({ opacity: 0, transition: 'opacity 0.4s ease-out' });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="relative group border border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/15 p-5 rounded-xl cursor-pointer will-change-transform overflow-hidden transition-colors duration-300"
      style={style}
    >
      <div className="absolute inset-0 pointer-events-none z-10" style={glare} />
      {children}
    </div>
  );
};

const ProjectsWindow = () => {
  const activeWindow = useAetherStore((state) => state.activeWindow);
  const toggleWindow = useAetherStore((state) => state.toggleWindow);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (activeWindow !== 'projects') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelected(null);
    }
  }, [activeWindow]);

  if (activeWindow !== 'projects') return null;

  const categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'applied-ml', label: 'Applied ML' },
    { key: 'generative-ai', label: 'Generative AI' },
    { key: 'privacy-security', label: 'Privacy & Security' },
    { key: 'statistical-modeling', label: 'Statistical Modeling' },
  ];

  const filtered = filter === 'all' ? projectsData : projectsData.filter(p => p.tags.includes(filter));

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto">
      <ParallaxWrapper amount={8}>
        <div className="w-[96vw] md:w-[820px] h-[88vh] md:h-[580px] flex flex-col bg-[#080c12]/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-fade-in">

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/8 bg-white/3 shrink-0">
            <div className="flex items-center gap-2 font-mono text-xs text-white/60">
              <Layers size={13} className="text-blue-400" />
              <span>ENGINEERING PROJECTS</span>
              <span className="text-white/20 ml-1">//</span>
              <span className="text-white/40">{projectsData.length} systems</span>
            </div>
            <button onClick={() => toggleWindow('projects')} aria-label="Close Projects Window" className="text-gray-600 hover:text-red-400 transition-colors">
              <X size={14} />
            </button>
          </div>

          {selected ? (
            <ProjectDetail project={selected} onBack={() => setSelected(null)} />
          ) : (
            <>
              {/* Category Filters */}
              <div className="flex gap-2 px-5 py-3 border-b border-white/5 overflow-x-auto custom-scrollbar shrink-0">
                {categories.map(cat => (
                  <button
                    key={cat.key}
                    onClick={() => setFilter(cat.key)}
                    className={`text-[10px] font-mono tracking-widest px-3 py-1 rounded border whitespace-nowrap transition-all duration-200 ${
                      filter === cat.key
                        ? 'border-aether-green/40 bg-aether-green/10 text-aether-green'
                        : 'border-white/8 text-gray-500 hover:text-gray-300 hover:border-white/15'
                    }`}
                  >
                    {cat.label.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Projects Grid */}
              <div className="flex-1 p-5 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filtered.map((project) => (
                    <TiltCard key={project.id} onClick={() => setSelected(project)}>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="text-[9px] font-mono text-gray-600 tracking-widest">{project.num}</span>
                          <h3 className="text-sm font-semibold text-white leading-snug mt-0.5">{project.shortTitle}</h3>
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${categoryColors[project.categoryTag] || 'text-gray-400 border-white/10'}`}>
                            {project.category}
                          </span>
                          <span className={`text-[9px] font-mono border rounded px-2 py-0.5 ${statusColors[project.status] || 'text-gray-400 border-white/10'}`}>
                            {project.status}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-400 leading-relaxed mb-3 line-clamp-2">{project.summary}</p>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.highlights?.slice(0, 3).map((h, i) => (
                          <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 bg-white/5 border border-white/8 rounded text-gray-400">{h}</span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex gap-1.5 flex-wrap">
                          {project.techStack.slice(0, 4).map((tech) => (
                            <span key={tech} className="text-[9px] font-mono px-1.5 py-0.5 bg-white/5 rounded text-gray-500">{tech}</span>
                          ))}
                          {project.techStack.length > 4 && <span className="text-[9px] text-gray-600 font-mono self-center">+{project.techStack.length - 4}</span>}
                        </div>
                        <ChevronRight size={14} className="text-gray-600 group-hover:text-white transition-colors shrink-0" />
                      </div>
                    </TiltCard>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </ParallaxWrapper>
    </div>
  );
};

const ProjectDetail = ({ project, onBack }) => {
  const [tab, setTab] = useState('overview');
  const tabs = ['overview', 'decisions', 'metrics'];
  const catColor = categoryColors[project.categoryTag] || 'text-gray-400';

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Detail Header */}
      <div className="px-5 py-4 border-b border-white/8 shrink-0">
        <button onClick={onBack} className="flex items-center gap-1.5 text-gray-500 hover:text-white font-mono text-[10px] tracking-widest mb-3 transition-colors group">
          <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
          ALL PROJECTS
        </button>
        <div className="flex justify-between items-start gap-4">
          <div>
            <span className={`text-[9px] font-mono tracking-widest ${catColor}`}>{project.category} · {project.num}</span>
            <h2 className="text-base font-semibold text-white mt-1 leading-snug">{project.title}</h2>
          </div>
          <div className="flex gap-2 shrink-0">
            {project.links?.github && project.links.github !== '#' && (
              <a href={project.links.github} target="_blank" rel="noreferrer"
                className="flex items-center gap-1 text-gray-400 hover:text-white font-mono text-[10px] border border-white/10 px-2.5 py-1.5 rounded hover:border-white/20 transition-all">
                <Code size={12} /> REPO
              </a>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-4">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-[10px] font-mono tracking-widest px-3 py-1 rounded transition-all ${tab === t ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Detail Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
        {tab === 'overview' && (
          <div className="space-y-5">
            <Section title="Summary">
              <p className="text-xs text-gray-300 leading-relaxed">{project.summary}</p>
            </Section>
            <Section title="Problem Statement">
              <p className="text-xs text-gray-400 leading-relaxed">{project.problem}</p>
            </Section>
            {project.architecture?.length > 0 && (
              <Section title="Architecture Pipeline">
                <div className="flex flex-wrap items-center gap-1.5">
                  {project.architecture.map((step, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono px-2.5 py-1 bg-white/5 border border-white/8 rounded text-gray-300">{step}</span>
                      {i < project.architecture.length - 1 && <ArrowRight size={10} className="text-gray-600 shrink-0" />}
                    </div>
                  ))}
                </div>
              </Section>
            )}
            <Section title="Technology Stack">
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(t => (
                  <span key={t} className="text-[10px] font-mono px-2 py-1 border border-white/10 bg-white/5 rounded text-gray-300">{t}</span>
                ))}
              </div>
            </Section>
            {project.limitations && (
              <Section title="Limitations & Honest Assessment">
                <p className="text-xs text-yellow-400/80 leading-relaxed bg-yellow-400/5 border border-yellow-400/15 rounded p-3">{project.limitations}</p>
              </Section>
            )}
          </div>
        )}

        {tab === 'decisions' && (
          <div className="space-y-3">
            {project.decisions?.length > 0 ? project.decisions.map((d, i) => (
              <div key={i} className="border border-white/8 bg-white/3 rounded-lg p-4">
                <div className="flex items-start gap-2 mb-2">
                  <Zap size={12} className="text-aether-cyan mt-0.5 shrink-0" />
                  <span className="text-xs font-semibold text-white">{d.decision}</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed pl-5">{d.reason}</p>
              </div>
            )) : <p className="text-xs text-gray-500 font-mono">Technical decisions not yet documented.</p>}
          </div>
        )}

        {tab === 'metrics' && (
          <div className="space-y-4">
            {project.metrics?.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {project.metrics.map((m, i) => (
                    <div key={i} className="border border-white/8 bg-white/3 rounded-lg p-4 text-center">
                      <div className="text-xl font-bold font-mono text-aether-green">{m.value}</div>
                      <div className="text-[10px] text-gray-500 tracking-widest mt-1 uppercase">{m.label}</div>
                      <div className="text-[9px] text-gray-600 mt-1">{m.note}</div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-gray-600 font-mono bg-white/3 border border-white/8 rounded p-3">
                  ⚠ Metrics reflect offline evaluation conditions. They do not guarantee equivalent production performance.
                </p>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-xs text-gray-500 font-mono">Evaluation metrics not yet published for this project.</p>
                <p className="text-[10px] text-gray-600 mt-2">Project may be in active development or metrics pending documentation.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div>
    <h4 className="text-[10px] font-mono text-gray-500 tracking-widest uppercase mb-2">{title}</h4>
    {children}
  </div>
);

export default ProjectsWindow;
