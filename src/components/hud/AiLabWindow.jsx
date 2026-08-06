import React, { useState, useEffect, useRef } from 'react';
import { useAetherStore } from '../../store/useAetherStore';
import { X, BrainCircuit, Network, BarChart2, Share2 } from 'lucide-react';
import skillsData from '../../data/skills.json';
import SkillParticleGraph from './SkillParticleGraph';

const AiLabWindow = () => {
  const activeWindow = useAetherStore((state) => state.activeWindow);
  const toggleWindow = useAetherStore((state) => state.toggleWindow);

  const [loss, setLoss] = useState(0.0241);
  const [epoch, setEpoch] = useState(1402);
  const [logs, setLogs] = useState([
    "[SYSTEM] AI Lab Initialized...",
    "[INFO] Loading Skill Vectors...",
    "[INFO] Mapping Neural Connections..."
  ]);
  
  const logsEndRef = useRef(null);
  const [animateBars, setAnimateBars] = useState(false);

  useEffect(() => {
    if (activeWindow !== 'ailab') {
      setAnimateBars(false);
      return;
    }
    
    // Trigger bar animation after a short delay
    const timer = setTimeout(() => setAnimateBars(true), 300);

    const interval = setInterval(() => {
      setLoss((prev) => Math.max(0.001, prev - 0.0001 + (Math.random() * 0.0002 - 0.0001)).toFixed(4));
      setEpoch((prev) => prev + (Math.random() > 0.5 ? 1 : 0));

      const possibleLogs = [
        "[INFERENCE] Updating skill weights...",
        "[RAG] Semantic search mapped new project correlation.",
        "[TRAIN] Adjusting node distances in particle graph.",
        "[PIPELINE] Proficiency metrics stable.",
        "[WARN] Re-evaluating legacy technology stack... Correcting..."
      ];
      
      if (Math.random() > 0.6) {
        const newLog = possibleLogs[Math.floor(Math.random() * possibleLogs.length)];
        setLogs((prev) => {
          const updatedLogs = [...prev, newLog];
          return updatedLogs.length > 20 ? updatedLogs.slice(updatedLogs.length - 20) : updatedLogs;
        });
      }
    }, 1200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [activeWindow]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (activeWindow !== 'ailab') return null;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[750px] h-[85vh] md:h-[480px] z-30 flex flex-col bg-black/80 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden shadow-2xl animate-fade-in pointer-events-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/10 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs font-mono text-aether-green">
          <BrainCircuit size={14} />
          <span>NEURAL_CORE // SKILL_ANALYSIS</span>
        </div>
        <button onClick={() => toggleWindow('ailab')} className="text-red-400 hover:text-red-300 transition-colors">
          <X size={14} />
        </button>
      </div>

      {/* Dashboard Grid */}
      <div className="flex-1 p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 overflow-y-auto font-mono text-sm">
        
        {/* Module 1: Animated Skill Bars */}
        <div className="border border-white/10 bg-white/5 p-4 rounded-lg flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-aether-green to-transparent"></div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-white text-xs tracking-widest">PROFICIENCY VECTORS</span>
            <BarChart2 size={14} className="text-aether-green" />
          </div>
          <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
            {skillsData.map(skill => (
              <div key={skill.id}>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-gray-400">{skill.name.toUpperCase()}</span>
                  <span className="text-aether-green">{skill.proficiency}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-aether-green transition-all duration-1000 ease-out" 
                    style={{ width: animateBars ? `${skill.proficiency}%` : '0%' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Module 2: Skill Particle Graph */}
        <div className="border border-white/10 bg-white/5 p-4 rounded-lg flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white text-xs tracking-widest">KNOWLEDGE TOPOLOGY</span>
            <Share2 size={14} className="text-blue-400" />
          </div>
          <div className="flex-1 relative">
            <SkillParticleGraph />
          </div>
        </div>

        {/* Module 3: Active Training Pipeline & Logs */}
        <div className="md:col-span-2 border border-white/10 bg-white/5 p-4 rounded-lg flex flex-col h-48">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white text-xs tracking-widest">LIVE INFERENCE / LOGS</span>
            <Network size={14} className="text-purple-400" />
          </div>
          
          <div className="flex gap-4 h-full">
            {/* Stats */}
            <div className="w-1/3 space-y-3 text-[10px] text-gray-400 border-r border-white/10 pr-4">
              <div className="flex justify-between"><span>EPOCH</span> <span className="text-white">{epoch} / 5000</span></div>
              <div className="flex justify-between"><span>LOSS</span> <span className="text-white">{loss}</span></div>
              <div className="flex justify-between"><span>ACCURACY</span> <span className="text-purple-400">97.8%</span></div>
            </div>
            
            {/* Live Scrolling Terminal Logs */}
            <div className="w-2/3 flex flex-col overflow-y-auto text-[10px] text-gray-500 font-mono space-y-1 custom-scrollbar">
              {logs.map((log, i) => (
                <div key={i} className={`${log.includes('[WARN]') ? 'text-yellow-400' : log.includes('FAISS') || log.includes('Moodies') ? 'text-aether-green' : ''}`}>
                  {log}
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AiLabWindow;