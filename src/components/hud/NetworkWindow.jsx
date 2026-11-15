import { useAetherStore } from '../../store/useAetherStore';
import { X, Globe, Briefcase, Award, Mail, Download, MapPin, Zap, ExternalLink } from 'lucide-react';
import { PERSONA } from '../../data/persona';

const NetworkWindow = () => {
  const activeWindow = useAetherStore((state) => state.activeWindow);
  const toggleWindow = useAetherStore((state) => state.toggleWindow);

  if (activeWindow !== 'network') return null;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[560px] max-h-[90vh] md:max-h-[600px] z-30 flex flex-col bg-[#0a0e14]/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl animate-fade-in pointer-events-auto">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-2 font-mono text-xs text-white/70">
          <Zap size={13} className="text-aether-green" />
          <span>IDENTITY // CONTACT MATRIX</span>
        </div>
        <button onClick={() => toggleWindow('network')} className="text-gray-500 hover:text-red-400 transition-colors" aria-label="Close">
          <X size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 flex flex-col gap-6">

        {/* Identity Block */}
        <div className="flex items-start gap-4">
          <div className="relative w-16 h-16 shrink-0 border border-aether-green/30 bg-aether-green/5 rounded-lg flex items-center justify-center overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-aether-green/70 shadow-[0_0_8px_#00ff41] animate-scan" />
            <span className="font-mono text-aether-green text-xl font-bold select-none">HG</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white tracking-wide">{PERSONA.name}</h2>
            <p className="text-xs font-mono text-aether-green tracking-widest mt-0.5">{PERSONA.title.toUpperCase()}</p>
            <div className="flex items-center gap-1.5 mt-2 text-gray-500 text-[11px] font-mono">
              <MapPin size={10} className="shrink-0" />
              <span>{PERSONA.location}</span>
            </div>
            <div className="mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-aether-green/10 border border-aether-green/20 text-[10px] font-mono text-aether-green">
              <span className="w-1.5 h-1.5 rounded-full bg-aether-green animate-pulse" />
              {PERSONA.availability}
            </div>
          </div>
        </div>

        {/* Short Bio */}
        <p className="text-xs text-gray-400 leading-relaxed border-l-2 border-aether-green/30 pl-3">
          {PERSONA.bio}
        </p>

        {/* Links Grid */}
        <div>
          <h3 className="text-[10px] font-mono text-gray-500 tracking-widest mb-3 uppercase">External Links</h3>
          <div className="grid grid-cols-2 gap-3">
            <ContactLink
              icon={<Globe size={16} />}
              label="GitHub"
              value="HarshkumarG007"
              href={PERSONA.links.github}
              color="text-white"
              hoverBorder="hover:border-white/40"
            />
            <ContactLink
              icon={<Briefcase size={16} />}
              label="LinkedIn"
              value="harshkumarg"
              href={PERSONA.links.linkedin}
              color="text-blue-400"
              hoverBorder="hover:border-blue-400/40"
            />
            <ContactLink
              icon={<Award size={16} />}
              label="Credly Badges"
              value="View Credentials"
              href={PERSONA.links.credly}
              color="text-orange-400"
              hoverBorder="hover:border-orange-400/40"
            />
            <ContactLink
              icon={<Mail size={16} />}
              label="Email"
              value={PERSONA.email}
              href={`mailto:${PERSONA.email}`}
              color="text-aether-green"
              hoverBorder="hover:border-aether-green/40"
            />
          </div>
        </div>

        {/* Resume Download */}
        <div className="border-t border-white/5 pt-4">
          <a
            href="./Harsh_Gupta_Resume.pdf"
            download="Harsh_Kumar_Gupta_Resume.pdf"
            className="flex items-center justify-center gap-2 w-full py-2.5 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 rounded text-xs font-mono text-white/70 hover:text-white transition-all duration-300 group"
          >
            <Download size={13} className="group-hover:text-aether-green transition-colors" />
            DOWNLOAD RESUME
            <span className="text-gray-600 text-[10px]">.pdf</span>
          </a>
          <p className="text-center text-[9px] text-gray-700 font-mono mt-2">Resume available on request if file is unavailable</p>
        </div>
      </div>
    </div>
  );
};

const ContactLink = ({ icon, label, value, href, color, hoverBorder }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className={`flex items-center gap-3 p-3 border border-white/8 bg-white/3 rounded-lg ${hoverBorder} hover:bg-white/8 transition-all duration-200 group`}
  >
    <div className={`${color} opacity-70 group-hover:opacity-100 transition-opacity shrink-0`}>
      {icon}
    </div>
    <div className="min-w-0">
      <div className="text-[9px] font-mono text-gray-600 tracking-widest uppercase">{label}</div>
      <div className={`text-xs ${color} truncate font-mono`}>{value}</div>
    </div>
    <ExternalLink size={10} className="ml-auto text-gray-700 group-hover:text-gray-400 shrink-0" />
  </a>
);

export default NetworkWindow;
