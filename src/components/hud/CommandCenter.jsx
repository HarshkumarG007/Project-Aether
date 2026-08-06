
import { Terminal, Cpu, Database, Network, Play, Square as SquareIcon, Bot, Code, Palette, Sun, Moon } from 'lucide-react';
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
    if (tourState === 'active') stopTour(); // Stop tour if user interacts

    const isCurrentlyActive = activeWindow === windowName;
    toggleWindow(windowName);
    
    if (isCurrentlyActive) {
      // Closing the window, return to home
      setCameraTarget({ position: [0, 4, 10], lookAt: [0, 0, 0] });
    } else {
      // Opening a window, move to target
      switch (windowName) {
        case 'terminal':
          setCameraTarget({ position: [-3, 1, 6], lookAt: [0, 2, 0] });
          break;
        case 'ailab':
          setCameraTarget({ position: [0, 1.5, 4], lookAt: [0, 4, 0] });
          break;
        case 'projects':
          setCameraTarget({ position: [5, 6, 5], lookAt: [0, 1, 0] });
          break;
        case 'network':
          setCameraTarget({ position: [0, 8, 8], lookAt: [0, 3, 0] });
          break;
        case 'assistant':
          setCameraTarget({ position: [-2, 3, 7], lookAt: [0, 2, 0] });
          break;
        case 'devhq':
          setCameraTarget({ position: [2, 5, -2], lookAt: [0, 3, 0] });
          break;
        case 'design':
          setCameraTarget({ position: [-4, 6, -2], lookAt: [0, 4, 0] });
          break;
        default:
          setCameraTarget({ position: [0, 4, 10], lookAt: [0, 0, 0] });
      }
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 pointer-events-auto w-[95%] md:w-auto">
      <div className="flex items-center gap-2 md:gap-4 px-4 md:px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(0,255,65,0.1)] transition-all hover:bg-white/10 overflow-x-auto justify-start md:justify-center custom-scrollbar">
        
        {/* Quick Tour Button */}
        <HudButton 
          icon={tourState === 'active' ? <SquareIcon size={18} /> : <Play size={18} />} 
          label={tourState === 'active' ? "STOP TOUR" : "TOUR"} 
          active={tourState === 'active'}
          highlight={true}
          onClick={() => {
             if (tourState === 'active') stopTour();
             else startTour();
          }}
        />
        <div className="w-px h-6 bg-white/20"></div>

        <HudButton 
          icon={<Terminal size={18} />} 
          label="TERMINAL" 
          active={activeWindow === 'terminal'} 
          onClick={() => handleToggle('terminal')}
        />
        <HudButton 
          icon={<Cpu size={18} />} 
          label="AI LAB" 
          active={activeWindow === 'ailab'} 
          onClick={() => handleToggle('ailab')}
        />
        <HudButton 
          icon={<Database size={18} />} 
          label="PROJECTS" 
          active={activeWindow === 'projects'} 
          onClick={() => handleToggle('projects')}
        />
        <HudButton 
          icon={<Network size={18} />} 
          label="NETWORK" 
          active={activeWindow === 'network'} 
          onClick={() => handleToggle('network')}
        />
        
        <div className="w-px h-6 bg-white/20"></div>

        {/* Phase 3 additions */}
        <HudButton 
          icon={<Bot size={18} />} 
          label="ASSISTANT" 
          active={activeWindow === 'assistant'} 
          onClick={() => handleToggle('assistant')}
        />
        <HudButton 
          icon={<Code size={18} />} 
          label="DEV HQ" 
          active={activeWindow === 'devhq'} 
          onClick={() => handleToggle('devhq')}
        />
        <HudButton 
          icon={<Palette size={18} />} 
          label="DESIGN" 
          active={activeWindow === 'design'} 
          onClick={() => handleToggle('design')}
        />

        <div className="w-px h-6 bg-white/20"></div>

        {/* Theme Toggle */}
        <HudButton 
          icon={theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />} 
          label="THEME" 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        />
      </div>
    </div>
  );
};

const HudButton = ({ icon, label, active = false, highlight = false, onClick }) => {
  return (
    <MagneticWrapper amount={0.4}>
      <button 
        onClick={onClick}
        className={`flex flex-col items-center gap-1 group transition-colors duration-300 ${active ? (highlight ? 'text-blue-400' : 'text-aether-green') : 'text-gray-400 hover:text-white'}`}
      >
        <div className={`p-2 rounded-lg transition-all duration-300 ${active ? (highlight ? 'bg-blue-400/10 shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'bg-aether-green/10 shadow-[0_0_10px_rgba(0,255,65,0.3)]') : 'group-hover:bg-white/5'}`}>
          {icon}
        </div>
        <span className="text-[8px] font-mono tracking-widest min-w-max">{label}</span>
      </button>
    </MagneticWrapper>
  );
};

export default CommandCenter;