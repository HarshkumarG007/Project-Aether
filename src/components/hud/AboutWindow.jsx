import { useState } from 'react';
import { useAetherStore } from '../../store/useAetherStore';
import { X, User, Briefcase, GraduationCap, Award, ChevronRight, MapPin, Calendar } from 'lucide-react';
import { PERSONA } from '../../data/persona';

const tabs = [
  { key: 'bio', label: 'BIO', icon: User },
  { key: 'experience', label: 'EXPERIENCE', icon: Briefcase },
  { key: 'education', label: 'EDUCATION', icon: GraduationCap },
  { key: 'certs', label: 'CREDENTIALS', icon: Award },
];

const AboutWindow = () => {
  const activeWindow = useAetherStore((state) => state.activeWindow);
  const toggleWindow = useAetherStore((state) => state.toggleWindow);
  const [tab, setTab] = useState('bio');

  if (activeWindow !== 'about') return null;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[96%] md:w-[700px] h-[88vh] md:h-[560px] z-30 flex flex-col bg-[#080c12]/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-fade-in pointer-events-auto">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/8 shrink-0">
        <div className="flex items-center gap-2 font-mono text-xs text-white/60">
          <User size={13} className="text-aether-green" />
          <span>PROFILE // {PERSONA.name.toUpperCase()}</span>
        </div>
        <button onClick={() => toggleWindow('about')} aria-label="Close Profile Window" className="text-gray-600 hover:text-red-400 transition-colors">
          <X size={14} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/8 shrink-0 overflow-x-auto">
        {tabs.map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 px-4 py-3 font-mono text-[10px] tracking-widest whitespace-nowrap transition-all border-b-2 ${
                tab === t.key
                  ? 'text-white border-aether-green'
                  : 'text-gray-500 border-transparent hover:text-gray-300'
              }`}
            >
              <Icon size={11} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        {tab === 'bio' && (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="relative w-16 h-16 shrink-0 border border-aether-green/30 bg-aether-green/5 rounded-xl flex items-center justify-center overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-aether-green/70 shadow-[0_0_8px_#00ff41] animate-scan" />
                <span className="font-mono text-aether-green text-xl font-bold">HG</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">{PERSONA.name}</h2>
                <p className="text-xs font-mono text-aether-green tracking-wider mt-0.5">{PERSONA.title}</p>
                <div className="flex items-center gap-1.5 mt-2 text-gray-500 text-[11px] font-mono">
                  <MapPin size={10} />
                  <span>{PERSONA.location}</span>
                </div>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-aether-green/10 border border-aether-green/20 text-[10px] font-mono text-aether-green">
                  <span className="w-1.5 h-1.5 rounded-full bg-aether-green animate-pulse" />
                  {PERSONA.availability}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-mono text-gray-500 tracking-widest uppercase mb-3">About</h3>
              <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
                <p>{PERSONA.bio}</p>
                <p className="text-gray-400">My work spans machine learning, recommendation architectures, LLM applications, retrieval systems, evaluation frameworks, and local-first AI infrastructure.</p>
                <p className="text-gray-400">With an academic foundation in mathematics and computer applications, I approach engineering through analytical reasoning, experimentation, and practical implementation.</p>
                <p className="text-gray-400">My professional journey also includes AI and robotics education, technical mentorship, infrastructure setup, and developer-focused communication.</p>
                <p className="text-gray-400 text-xs">My broader academic interests in pharmacy, yoga, and behavioral sciences have shaped my interest in interdisciplinary technology and responsible innovation.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="border border-white/8 bg-white/3 rounded-lg p-3">
                <div className="text-[9px] font-mono text-gray-500 tracking-widest mb-2">FOCUS AREAS</div>
                {['Applied Machine Learning', 'Generative AI / LLMs', 'RAG Architectures', 'AI Evaluation', 'Local-First AI', 'AI Security'].map(a => (
                  <div key={a} className="flex items-center gap-1.5 text-[11px] text-gray-300 py-0.5">
                    <ChevronRight size={9} className="text-aether-green" />{a}
                  </div>
                ))}
              </div>
              <div className="border border-white/8 bg-white/3 rounded-lg p-3">
                <div className="text-[9px] font-mono text-gray-500 tracking-widest mb-2">TARGET ROLES</div>
                {['Applied AI Engineer', 'ML Engineer', 'LLM Engineer', 'Generative AI Engineer', 'AI Infrastructure Engineer'].map(r => (
                  <div key={r} className="flex items-center gap-1.5 text-[11px] text-gray-300 py-0.5">
                    <ChevronRight size={9} className="text-blue-400" />{r}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'experience' && (
          <div className="space-y-4">
            {PERSONA.experience.map((exp, i) => (
              <div key={i} className="border border-white/8 bg-white/3 rounded-xl p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-white">{exp.role}</h3>
                    <p className="text-xs text-aether-green font-mono mt-0.5">{exp.company}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1 text-[10px] font-mono text-gray-500 justify-end">
                      <Calendar size={9} />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-mono text-gray-600 mt-0.5 justify-end">
                      <MapPin size={9} />
                      <span>{exp.location}</span>
                    </div>
                    <span className="text-[9px] font-mono text-gray-700 border border-white/8 px-1.5 py-0.5 rounded mt-1 inline-block">{exp.type}</span>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-gray-400">
                      <ChevronRight size={10} className="text-aether-green mt-0.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {tab === 'education' && (
          <div className="space-y-3">
            {PERSONA.education.map((edu, i) => (
              <div key={i} className="border border-white/8 bg-white/3 rounded-lg p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-400/10 border border-blue-400/20 flex items-center justify-center shrink-0 mt-0.5">
                  <GraduationCap size={14} className="text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm text-white font-medium">{edu.degree}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">{edu.institution}</p>
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    <span className="text-[9px] font-mono text-gray-600 border border-white/8 px-1.5 py-0.5 rounded">{edu.period}</span>
                    {edu.grade && <span className="text-[9px] font-mono text-aether-green border border-aether-green/20 px-1.5 py-0.5 rounded">{edu.grade}</span>}
                    {edu.focus && <span className="text-[9px] font-mono text-gray-500 border border-white/8 px-1.5 py-0.5 rounded">{edu.focus}</span>}
                  </div>
                </div>
              </div>
            ))}
            <p className="text-[10px] text-gray-600 font-mono pt-2">Interdisciplinary background spanning computer science, mathematics, pharmacy, and yoga supports analytical thinking and responsible technology development.</p>
          </div>
        )}

        {tab === 'certs' && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs text-gray-500">Credentials verified via Credly and IBM SkillsBuild.</p>
              <a href="https://www.credly.com/users/harshkumarg" target="_blank" rel="noreferrer"
                className="text-[10px] font-mono text-aether-green hover:text-white transition-colors border border-aether-green/20 px-2 py-1 rounded">
                View All on Credly →
              </a>
            </div>

            <div className="mb-4">
              <h4 className="text-[10px] font-mono text-gray-500 tracking-widest uppercase mb-2">Most Relevant — AI/ML</h4>
              <div className="space-y-1.5">
                {PERSONA.certifications.filter(c => c.relevant).map((cert, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 border border-white/8 bg-white/3 rounded-lg">
                    <Award size={12} className="text-aether-green shrink-0" />
                    <div>
                      <span className="text-xs text-white/80">{cert.name}</span>
                      <span className="text-[9px] font-mono text-gray-500 ml-2">{cert.issuer}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-mono text-gray-500 tracking-widest uppercase mb-2">Other Credentials</h4>
              <div className="space-y-1.5">
                {PERSONA.certifications.filter(c => !c.relevant).map((cert, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 border border-white/5 bg-white/2 rounded-lg opacity-70">
                    <Award size={12} className="text-gray-600 shrink-0" />
                    <div>
                      <span className="text-xs text-gray-400">{cert.name}</span>
                      <span className="text-[9px] font-mono text-gray-600 ml-2">{cert.issuer}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutWindow;
