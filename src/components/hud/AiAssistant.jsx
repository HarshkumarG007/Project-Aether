import { useState, useRef, useEffect } from 'react';
import { useAetherStore } from '../../store/useAetherStore';
import { X, Sparkles, Send, Bot, User } from 'lucide-react';
import { queryAssistant } from '../../data/assistantIndex';

const AiAssistant = () => {
  const activeWindow = useAetherStore((state) => state.activeWindow);
  const toggleWindow = useAetherStore((state) => state.toggleWindow);
  
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm the Project Aether Assistant. Ask me about Harsh's projects, skills, or experience." }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeWindow]);

  if (activeWindow !== 'assistant') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');

    // Simulate network delay for effect
    setTimeout(() => {
      const response = queryAssistant(userMsg);
      let assistantMsg = '';
      
      if (response.type === 'text') {
        assistantMsg = response.content;
      } else if (response.type === 'projects') {
        assistantMsg = "Here are the relevant projects:\n" + response.data.map(p => `- ${p.title}: ${p.description}`).join('\n');
      } else if (response.type === 'skills') {
        assistantMsg = "Here are the relevant skills:\n" + response.data.map(s => `- ${s.name} (${s.proficiency}%)`).join('\n');
      }

      setMessages(prev => [...prev, { role: 'assistant', content: assistantMsg }]);
    }, 600);
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[450px] h-[75vh] md:h-[500px] z-30 flex flex-col bg-black/80 backdrop-blur-lg border border-aether-green/30 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,255,65,0.1)] animate-fade-in pointer-events-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-aether-green/10 border-b border-aether-green/20">
        <div className="flex items-center gap-2 text-xs font-mono text-aether-green">
          <Sparkles size={16} className="animate-pulse" />
          <span>AETHER // AI_ASSISTANT</span>
        </div>
        <button onClick={() => toggleWindow('assistant')} className="text-aether-green/60 hover:text-aether-green transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Holographic Projection Visuals */}
      <div className="h-24 w-full bg-gradient-to-b from-aether-green/10 to-transparent relative overflow-hidden flex items-center justify-center border-b border-white/5">
         <div className="absolute top-0 w-full h-[1px] bg-aether-green/50 shadow-[0_0_15px_#00ff41] animate-[scan_3s_linear_infinite]"></div>
         <Bot size={48} className="text-aether-green/40 mix-blend-screen animate-pulse" />
      </div>

      {/* Chat History */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col gap-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
            <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center border ${msg.role === 'user' ? 'border-blue-400/30 bg-blue-400/10 text-blue-400' : 'border-aether-green/30 bg-aether-green/10 text-aether-green'}`}>
              {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>
            <div className={`p-3 rounded-lg text-xs font-mono whitespace-pre-wrap leading-relaxed ${msg.role === 'user' ? 'bg-blue-400/10 text-blue-100 border border-blue-400/20' : 'bg-white/5 text-gray-300 border border-white/10'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 bg-white/5">
        <div className="relative flex items-center">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="w-full bg-black/50 border border-white/10 rounded-lg pl-4 pr-10 py-3 text-xs font-mono text-white outline-none focus:border-aether-green/50 transition-colors"
          />
          <button type="submit" className="absolute right-2 p-1.5 text-gray-400 hover:text-aether-green transition-colors">
            <Send size={14} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AiAssistant;
