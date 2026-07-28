import React, { useState, useRef, useEffect } from 'react';
import { useAetherStore } from '../../store/useAetherStore';
import { X, Minus, Square } from 'lucide-react';

const TerminalWindow = () => {
  const activeWindow = useAetherStore((state) => state.activeWindow);
  const toggleWindow = useAetherStore((state) => state.toggleWindow);
  const [history, setHistory] = useState([
    { type: 'system', text: 'AETHER OS Terminal v1.0.0' },
    { type: 'system', text: 'Type "help" for a list of commands.' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  // Auto-scroll to the bottom when new commands are entered
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (activeWindow !== 'terminal') return null;

  const handleCommand = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      const cmd = input.trim().toLowerCase();
      let response = '';

      // Command Logic Engine
      switch (cmd) {
        case 'help':
          response = 'Available commands: whoami, skills, clear, sudo hire-me';
          break;
        case 'whoami':
          response = 'AI & Robotics Specialist | Transitioning to Core ML Engineering.';
          break;
        case 'skills':
          response = 'Python, React, Three.js, PyTorch, C++, WebGL.';
          break;
        case 'sudo hire-me':
          response = 'Access Granted. Downloading Resume... (Mock Action)';
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        default:
          response = `Command not found: ${cmd}`;
      }

      setHistory((prev) => [
        ...prev, 
        { type: 'user', text: `> ${cmd}` },
        { type: 'system', text: response }
      ]);
      setInput('');
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] z-30 flex flex-col bg-black/80 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden shadow-2xl animate-fade-in pointer-events-auto">
      
      {/* Window Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/10 border-b border-white/10">
        <div className="text-xs font-mono text-gray-400">root@aether:~</div>
        <div className="flex gap-2">
          <button className="text-gray-400 hover:text-white"><Minus size={14} /></button>
          <button className="text-gray-400 hover:text-white"><Square size={12} /></button>
          <button onClick={() => toggleWindow('terminal')} className="text-red-400 hover:text-red-300"><X size={14} /></button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 p-4 font-mono text-sm overflow-y-auto">
        {history.map((line, i) => (
          <div key={i} className={`mb-1 ${line.type === 'user' ? 'text-white' : 'text-aether-green'}`}>
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
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default TerminalWindow;