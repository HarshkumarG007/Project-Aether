import { useState } from 'react';
import { useAetherStore } from '../../store/useAetherStore';
import { X, Cpu, ChevronRight } from 'lucide-react';
import skillsData from '../../data/skills.json';

const domainConfig = {
  'applied-ml': { label: 'Applied Machine Learning', color: 'text-blue-400', borderColor: 'border-blue-400/20', bg: 'bg-blue-400/5', accent: '#3b82f6' },
  'genai': { label: 'Generative AI & Retrieval', color: 'text-purple-400', borderColor: 'border-purple-400/20', bg: 'bg-purple-400/5', accent: '#a855f7' },
  'infrastructure': { label: 'AI Infrastructure', color: 'text-aether-green', borderColor: 'border-aether-green/20', bg: 'bg-aether-green/5', accent: '#00ff41' },
  'programming': { label: 'Programming & Data', color: 'text-cyan-400', borderColor: 'border-cyan-400/20', bg: 'bg-cyan-400/5', accent: '#06b6d4' },
  'robotics': { label: 'Robotics & Embedded', color: 'text-orange-400', borderColor: 'border-orange-400/20', bg: 'bg-orange-400/5', accent: '#f97316' },
};

const AiLabWindow = () => {
  const activeWindow = useAetherStore((state) => state.activeWindow);
  const toggleWindow = useAetherStore((state) => state.toggleWindow);
  const [activeDomain, setActiveDomain] = useState(null);

  if (activeWindow !== 'ailab') return null;

  const domains = Object.keys(domainConfig);
  const groupedSkills = domains.reduce((acc, domain) => {
    acc[domain] = skillsData.filter(s => s.domain === domain);
    return acc;
  }, {});

  const activeDomainSkills = activeDomain ? groupedSkills[activeDomain] : null;
  const config = activeDomain ? domainConfig[activeDomain] : null;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[700px] h-[88vh] md:h-[520px] z-30 flex flex-col bg-[#080c12]/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-fade-in pointer-events-auto">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/8 shrink-0">
        <div className="flex items-center gap-2 font-mono text-xs text-white/60">
          <Cpu size={13} className="text-aether-green" />
          <span>ENGINEERING CAPABILITIES</span>
        </div>
        <button onClick={() => toggleWindow('ailab')} aria-label="Close Capabilities Window" className="text-gray-600 hover:text-red-400 transition-colors">
          <X size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        {activeDomain ? (
          /* Domain Detail */
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-5 py-4 border-b border-white/8 shrink-0">
              <button
                onClick={() => setActiveDomain(null)}
                className="flex items-center gap-1.5 text-gray-500 hover:text-white font-mono text-[10px] tracking-widest mb-3 transition-colors group"
              >
                <ChevronRight size={11} className="rotate-180 group-hover:-translate-x-0.5 transition-transform" />
                ALL DOMAINS
              </button>
              <h3 className={`text-sm font-semibold ${config.color}`}>{config.label}</h3>
              <p className="text-[11px] text-gray-500 mt-1">
                {activeDomainSkills.length} capabilities in this domain
              </p>
            </div>
            <div className="flex-1 p-5 overflow-y-auto custom-scrollbar">
              <div className="flex flex-wrap gap-2">
                {activeDomainSkills.map(skill => (
                  <div
                    key={skill.id}
                    className={`px-3 py-2 rounded-lg border ${config.borderColor} ${config.bg} flex items-center gap-2`}
                  >
                    <span className="text-xs font-mono text-white/80">{skill.name}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-600 mt-6 font-mono leading-relaxed">
                Technologies listed reflect working familiarity and project use. Depth varies by technology — some are core daily tools, others are integration-level experience.
              </p>
            </div>
          </div>
        ) : (
          /* Domain Overview */
          <div className="flex-1 p-5 overflow-y-auto custom-scrollbar">
            <p className="text-xs text-gray-500 mb-5 leading-relaxed">
              Technical capabilities organized by engineering domain. Click a domain to explore specific technologies.
            </p>
            <div className="space-y-3">
              {domains.map(domain => {
                const cfg = domainConfig[domain];
                const skills = groupedSkills[domain];
                return (
                  <button
                    key={domain}
                    onClick={() => setActiveDomain(domain)}
                    className={`w-full text-left p-4 rounded-xl border ${cfg.borderColor} ${cfg.bg} hover:border-opacity-60 hover:bg-opacity-10 transition-all duration-200 group`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-semibold ${cfg.color}`}>{cfg.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-gray-600">{skills.length} tools</span>
                        <ChevronRight size={13} className={`${cfg.color} opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all`} />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.slice(0, 5).map(s => (
                        <span key={s.id} className="text-[9px] font-mono px-2 py-0.5 bg-white/5 border border-white/8 rounded text-gray-400">{s.name}</span>
                      ))}
                      {skills.length > 5 && (
                        <span className="text-[9px] font-mono px-2 py-0.5 text-gray-600">+{skills.length - 5} more</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiLabWindow;
