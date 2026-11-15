import { Terminal, Cpu, Layers, Network, Play, Square as SquareIcon, User, BookOpen, Sun, Moon } from 'lucide-react';
import { useAetherStore } from '../../store/useAetherStore';
import MagneticWrapper from '../ui/MagneticWrapper';

const CommandCenter = () => {
  const activeWindow = useAetherStore((state) => state.activeWindow);
  const toggleWindow = useAetherStore((state) => state.toggleWindow);
  const setCameraTarget = useAetherStore((state) => state.setCameraTarget);
  const tourState = useAetherStore((state) => state.tourState);
  const startTour = useAetherStore((state) => state.startTour);
  const stopTour = useAetherStore((state) => state.stopTour);
  const theme = useAetherStore((state) => state.theme);
  const setTheme = useAetherStore((state) => state.setTheme);

  const handleToggle = (windowName) => {
    if (tourState === 'active') stopTour();
    const isCurrentlyActive = activeWindow === windowName;
    toggleWindow(windowName);
    if (isCurrentlyActive) {
      setCameraTarget({ position: [0, 4, 10], lookAt: [0, 0, 0] });
    } else {
      const targets = {
        terminal: { position: [-3, 1, 6], lookAt: [0, 2, 0] },
        ailab: { position: [0, 1.5, 4], lookAt: [0, 4, 0] },
        projects: { position: [5, 6, 5], lookAt: [0, 1, 0] },
        network: { position: [0, 8, 8], lookAt: [0, 3, 0] },
        about: { position: [-2, 3, 7], lookAt: [0, 2, 0] },
        notes: { position: [2, 5, -2], lookAt: [0, 3, 0] },
      };
      setCameraTarget(targets[windowName] || { position: [0, 4, 10], lookAt: [0, 0, 0] });
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 pointer-events-auto w-[95%] md:w-auto">
      <div className="flex items-center gap-1 md:gap-3 px-4 md:px-6 py-3.5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/8 shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-x-auto justify-start md:justify-center custom-scrollbar">

        {/* Tour */}
        <HudButton
          icon={tourState === 'active' ? <SquareIcon size={16} /> : <Play size={16} />}
          label={tourState === 'active' ? "STOP" : "TOUR"}
          active={tourState === 'active'}
          highlight="green"
          onClick={() => { if (tourState === 'active') stopTour(); else startTour(); }}
        />
        <Divider />

        <HudButton icon={<Layers size={16} />} label="PROJECTS" active={activeWindow === 'projects'} onClick={() => handleToggle('projects')} />
        <HudButton icon={<Cpu size={16} />} label="SKILLS" active={activeWindow === 'ailab'} onClick={() => handleToggle('ailab')} />
        <HudButton icon={<User size={16} />} label="ABOUT" active={activeWindow === 'about'} onClick={() => handleToggle('about')} />
        <HudButton icon={<Network size={16} />} label="CONNECT" active={activeWindow === 'network'} onClick={() => handleToggle('network')} />

        <Divider />
        <HudButton icon={<BookOpen size={16} />} label="NOTES" active={activeWindow === 'notes'} onClick={() => handleToggle('notes')} />
        <HudButton icon={<Terminal size={16} />} label="TERMINAL" active={activeWindow === 'terminal'} onClick={() => handleToggle('terminal')} />

        <Divider />
        <HudButton
          icon={theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          label="THEME"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        />
      </div>
    </div>
  );
};

const Divider = () => <div className="w-px h-5 bg-white/10 shrink-0" />;

const HudButton = ({ icon, label, active = false, highlight, onClick }) => {
  const activeColor = highlight === 'green' ? 'text-aether-green' : 'text-aether-cyan';
  const activeBg = highlight === 'green' ? 'bg-aether-green/10 shadow-[0_0_10px_rgba(0,255,65,0.2)]' : 'bg-cyan-400/10 shadow-[0_0_10px_rgba(0,229,255,0.2)]';
  return (
    <MagneticWrapper amount={0.4}>
      <button
        onClick={onClick}
        aria-label={label}
        className={`flex flex-col items-center gap-1 group transition-all duration-200 ${active ? activeColor : 'text-gray-500 hover:text-white'}`}
        aria-pressed={active}
      >
        <div className={`p-1.5 rounded-lg transition-all duration-200 ${active ? activeBg : 'group-hover:bg-white/5'}`}>
          {icon}
        </div>
        <span className="text-[8px] font-mono tracking-widest min-w-max">{label}</span>
      </button>
    </MagneticWrapper>
  );
};

export default CommandCenter;
