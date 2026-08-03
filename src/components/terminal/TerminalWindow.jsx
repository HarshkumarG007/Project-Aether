import React, { useState, useRef, useEffect } from 'react';
import { useAetherStore } from '../../store/useAetherStore';
import { X, Minus, Square } from 'lucide-react';

const TerminalWindow = () => {
  const activeWindow = useAetherStore((state) => state.activeWindow);
  const toggleWindow = useAetherStore((state) => state.toggleWindow);
  
  const [history, setHistory] = useState([
    { type: 'system', text: 'AETHER OS Terminal v1.0.0 initialized.' },
    { type: 'system', text: 'Type "help" for a list of available commands.' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  // Auto-scroll to the bottom when new commands are entered
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, activeWindow]);

  if (activeWindow !== 'terminal') return null;

  const handleCommand = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'user', text: `> ${cmd}` }];

      // Supercharged Command Logic Engine
      switch (cmd) {
        case 'help':
          newHistory.push({ type: 'system', text: 'AVAILABLE COMMANDS: whoami, skills, experience, education, clear, sudo hire-me' });
          break;
        case 'whoami':
          newHistory.push({ type: 'system', text: 'HARSH KUMAR GUPTA' });
          newHistory.push({ type: 'system', text: 'AI & Robotics Specialist | Transitioning to Core ML Engineering.' });
          break;
        case 'skills':
          newHistory.push({ type: 'system', text: 'LANGUAGES : Python, C++, JavaScript' });
          newHistory.push({ type: 'system', text: 'AI / ML   : PyTorch, Computer Vision, Kinematics, Applied AI' });
          newHistory.push({ type: 'system', text: 'FRONTEND  : React, Three.js, WebGL, Tailwind' });
          break;
        case 'experience':
          newHistory.push({ type: 'system', text: 'PROJECT : Built Moodies™ (AI-powered emotional intelligence platform).' });
          newHistory.push({ type: 'system', text: 'DOMAIN  : Led robotics deployments and STEM training architecture.' });
          break;
        case 'education':
          newHistory.push({ type: 'system', text: 'DEGREE : B.Sc. Mathematics & Physics (2019-2022)' });
          break;
        case 'sudo hire-me':
          newHistory.push({ type: 'system', text: 'ACCESS GRANTED. Initializing interview protocols...' });
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return; // Exit early to avoid setting state twice
        default:
          newHistory.push({ type: 'system', text: `Command not found: ${cmd}` });
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[600px] h-[75vh] md:h-[400px] z-30 flex flex-col bg-black/80 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden shadow-2xl animate-fade-in pointer-events-auto">
      
      {/* Window Header (Your original design) */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/10 border-b border-white/10">
        <div className="text-xs font-mono text-gray-400">root@aether:~</div>
        <div className="flex gap-2">
          <button className="text-gray-400 hover:text-white transition-colors"><Minus size={14} /></button>
          <button className="text-gray-400 hover:text-white transition-colors"><Square size={12} /></button>
          <button onClick={() => toggleWindow('terminal')} className="text-red-400 hover:text-red-300 transition-colors"><X size={14} /></button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 p-4 font-mono text-sm overflow-y-auto custom-scrollbar">
        {history.map((line, i) => (
          <div key={i} className={`mb-1 tracking-wide ${line.type === 'user' ? 'text-white' : 'text-aether-green'}`}>
            {line.text}
          </div>
        ))}
        
        {/* Active Input Line */}
        <div className="flex items-center mt-2">
          <span className="text-white mr-2">{'>'}</span>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            autoFocus
            className="flex-1 bg-transparent outline-none text-white font-mono caret-aether-green"
            spellCheck="false"
            autoComplete="off"
          />
        </div>
        
        {/* Invisible div for smooth scrolling */}
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
};

export default TerminalWindow;