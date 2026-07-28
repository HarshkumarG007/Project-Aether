import React from 'react';
import { useAetherStore } from './store/useAetherStore';
import BootScreen from './components/hud/BootScreen';
import AetherCanvas from './components/canvas/AetherCanvas';
import CommandCenter from './components/hud/CommandCenter'; 
import TerminalWindow from './components/terminal/TerminalWindow';
import AiLabWindow from './components/hud/AiLabWindow';
import ProjectsWindow from './components/hud/ProjectsWindow';
import NetworkWindow from './components/hud/NetworkWindow';

function App() {
  const currentPhase = useAetherStore((state) => state.currentPhase);

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
        <AetherCanvas />
      </div>

      {/* HUD Overlays */}
      {currentPhase === 'city' && (
        <>
          {/* Top Left Status Text */}
          <div className="absolute top-6 left-6 z-10 pointer-events-none font-mono text-xs tracking-widest text-aether-green opacity-70">
            <p>SYSTEM STATUS: ONLINE</p>
            <p className="text-[10px] text-gray-400 mt-1">DRAG TO NAVIGATE SCENE</p>
          </div>
          
          <CommandCenter /> 
          <TerminalWindow />
          <AiLabWindow />
          <ProjectsWindow />
          <NetworkWindow />
          
        </>
      )}
    </div>
  );
}

export default App;