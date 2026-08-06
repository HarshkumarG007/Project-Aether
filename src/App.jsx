import React, { useState, useEffect } from 'react';
import { useAetherStore } from './store/useAetherStore';
import BootScreen from './components/hud/BootScreen';
import AetherCanvas from './components/canvas/AetherCanvas';
import CommandCenter from './components/hud/CommandCenter'; 
import TerminalWindow from './components/terminal/TerminalWindow';
import AiLabWindow from './components/hud/AiLabWindow';
import ProjectsWindow from './components/hud/ProjectsWindow';
import NetworkWindow from './components/hud/NetworkWindow';
import AiAssistant from './components/hud/AiAssistant';
import DevHQWindow from './components/hud/DevHQWindow';
import DesignDistrictWindow from './components/hud/DesignDistrictWindow';
import DashboardWidget from './components/hud/DashboardWidget';
import NarrativeOverlay from './components/hud/NarrativeOverlay';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const CursorGlow = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePos = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updatePos);
    return () => window.removeEventListener('mousemove', updatePos);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 mix-blend-screen transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(0,255,65,0.08), transparent 40%)`
      }}
    />
  );
};

const GlobalRipple = () => {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      };
      setRipples((prev) => [...prev, newRipple]);

      // Remove ripple after animation completes (600ms)
      setTimeout(() => {
        setRipples((prev) => prev.filter(r => r.id !== newRipple.id));
      }, 600);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute border border-aether-green/50 rounded-full animate-ripple shadow-[0_0_20px_rgba(0,255,65,0.5)]"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
    </div>
  );
};

function App() {
  const currentPhase = useAetherStore((state) => state.currentPhase);
  const [devMode, setDevMode] = useState(false);

  const toggleWindow = useAetherStore((state) => state.toggleWindow);

  useEffect(() => {
    let konamiIndex = 0;
    const handleKeyDown = (e) => {
      // Toggle terminal on ` or ~
      if (e.key === '`' || e.key === '~') {
        toggleWindow('terminal');
      }

      if (e.key === KONAMI_CODE[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === KONAMI_CODE.length) {
          setDevMode(prev => !prev); // Toggle Dev Mode
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleWindow]);

  return (
    <div className="relative w-full h-screen bg-[#030303] text-white overflow-hidden select-none">
      
      {/* Phase 1: Terminal Boot Sequence */}
      {currentPhase === 'booting' && <BootScreen />}

      {/* Phase 2: 3D Canvas Layer */}
      <div 
        className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
          currentPhase === 'city' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <AetherCanvas active={currentPhase === 'city'} />
      </div>

      {/* HUD Overlays */}
      {currentPhase === 'city' && (
        <>
          <GlobalRipple />
          <CursorGlow />
          <DashboardWidget />
          <NarrativeOverlay />
          
          <CommandCenter /> 
          <TerminalWindow />
          <AiLabWindow />
          <ProjectsWindow />
          <NetworkWindow />
          <AiAssistant />
          <DevHQWindow />
          <DesignDistrictWindow />
          
          {/* Developer Mode Overlay */}
          {devMode && (
            <div className="absolute top-6 right-6 z-50 bg-black/80 border border-aether-green/50 p-4 rounded text-aether-green font-mono text-xs shadow-[0_0_15px_rgba(0,255,65,0.2)] animate-fade-in pointer-events-none">
              <h3 className="text-white mb-2 pb-1 border-b border-aether-green/30">DEVELOPER_MODE</h3>
              <p>FPS: <span className="text-white">60 (capped)</span></p>
              <p>DRAW CALLS: <span className="text-white">~42</span></p>
              <p>TRIANGLES: <span className="text-white">12,450</span></p>
              <p>THEME: <span className="text-white">DARK_MODE</span></p>
              <p>STORE_PHASE: <span className="text-white">{currentPhase}</span></p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;