import { useState, useRef, useEffect } from 'react';
import { useAetherStore } from '../../store/useAetherStore';
import { X, Minus, Square } from 'lucide-react';
import { parseCommand } from './commandParser';
import ParallaxWrapper from '../ui/ParallaxWrapper';

const TerminalWindow = () => {
  const activeWindow = useAetherStore((state) => state.activeWindow);
  const toggleWindow = useAetherStore((state) => state.toggleWindow);
  
  const [history, setHistory] = useState([
    { type: 'system', text: 'AETHER OS Terminal v2.0.0 initialized.' },
    { type: 'system', text: 'Type "help" for a list of available commands.' }
  ]);
  const [input, setInput] = useState('');
  
  // Command history buffer
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const bottomRef = useRef(null);

  // Auto-scroll to the bottom when new commands are entered
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, activeWindow]);

  if (activeWindow !== 'terminal') return null;

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim();
      if (!cmd) return;

      // Update command history
      const newCommandHistory = [...commandHistory, cmd];
      setCommandHistory(newCommandHistory);
      setHistoryIndex(newCommandHistory.length);

      const result = parseCommand(cmd);

      if (result.action === 'CLEAR') {
        setHistory([]);
        setInput('');
        return;
      }

      if (result.action === 'DOWNLOAD_RESUME') {
        // Trigger a dummy download
        const link = document.createElement('a');
        link.href = '/resume.pdf'; // Must exist in public folder
        link.download = 'resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      if (result.action === 'SPAWN_COFFEE') {
        useAetherStore.getState().triggerCoffee();
      }

      const newHistory = [
        ...history, 
        { type: 'user', text: `> ${cmd}` },
        ...(result.output || [])
      ];

      setHistory(newHistory);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(commandHistory.length);
        setInput('');
      }
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto">
      <ParallaxWrapper amount={20}>
        <div className="w-[95vw] md:w-[600px] h-[75vh] md:h-[400px] flex flex-col bg-black/80 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden shadow-2xl animate-fade-in">
          
          {/* Window Header */}
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
      </ParallaxWrapper>
    </div>
  );
};

export default TerminalWindow;