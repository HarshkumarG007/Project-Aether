import React, { useState, useEffect, useRef } from 'react';
import { useAetherStore } from '../../store/useAetherStore';
import { X, Activity, BrainCircuit, Cpu, Network, Database } from 'lucide-react';

const AiLabWindow = () => {
  const activeWindow = useAetherStore((state) => state.activeWindow);
  const toggleWindow = useAetherStore((state) => state.toggleWindow);

  // Dynamic State for the live dashboard feel
  const [cpuUsage, setCpuUsage] = useState(42);
  const [vramUsage, setVramUsage] = useState(6.2);
  const [loss, setLoss] = useState(0.0241);
  const [epoch, setEpoch] = useState(1402);
  const [logs, setLogs] = useState([
    "[SYSTEM] AI Lab Initialized...",
    "[INFO] Loading Multi-Agent Adversarial Inference Engine...",
    "[INFO] Connecting to local PostgreSQL knowledge base..."
  ]);
  
  const logsEndRef = useRef(null);

  // Simulation Loop: Updates numbers and pushes fake logs every second
  useEffect(() => {
    if (activeWindow !== 'ailab') return;

    const interval = setInterval(() => {
      // Jitter hardware stats
      setCpuUsage(Math.floor(Math.random() * (65 - 35 + 1) + 35));
      setVramUsage((Math.random() * (7.8 - 5.5) + 5.5).toFixed(1));
      
      // Progress training metrics
      setLoss((prev) => Math.max(0.001, prev - 0.0001 + (Math.random() * 0.0002 - 0.0001)).toFixed(4));
      setEpoch((prev) => prev + (Math.random() > 0.5 ? 1 : 0));

      // Push random inference logs
      const possibleLogs = [
        "[INFERENCE] Moodies™ Engine: Updating sentiment vectors...",
        "[RAG] Semantic search via FAISS index completed in 14ms.",
        "[TRAIN] Adjusting kinematics joint angles (Theta 1, Theta 2).",
        "[PIPELINE] Local LLM optimization stable.",
        "[WARN] Slight divergence in adversarial network detected. Correcting..."
      ];
      
      if (Math.random() > 0.6) {
        const newLog = possibleLogs[Math.floor(Math.random() * possibleLogs.length)];
        setLogs((prev) => {
          const updatedLogs = [...prev, newLog];
          return updatedLogs.length > 20 ? updatedLogs.slice(updatedLogs.length - 20) : updatedLogs;
        });
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [activeWindow]);

  // Auto-scroll logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (activeWindow !== 'ailab') return null;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[750px] h-[480px] z-30 flex flex-col bg-black/80 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden shadow-2xl animate-fade-in pointer-events-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/10 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs font-mono text-aether-green">
          <BrainCircuit size={14} />
          <span>NEURAL_CORE // LIVE_INFERENCE</span>
        </div>
        <button onClick={() => toggleWindow('ailab')} className="text-red-400 hover:text-red-300 transition-colors">
          <X size={14} />
        </button>
      </div>

      {/* Dashboard Grid */}
      <div className="flex-1 p-6 grid grid-cols-2 gap-6 overflow-y-auto font-mono text-sm">
        
        {/* Module 1: Architecture Status */}
        <div className="border border-white/10 bg-white/5 p-4 rounded-lg flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-aether-green to-transparent"></div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-white text-xs tracking-widest">RAG & INFERENCE PIPELINE</span>
            <Activity size={14} className="text-aether-green animate-pulse" />
          </div>
          <div className="space-y-3 text-[10px] text-gray-400">
            <div className="flex justify-between items-center"><span className="flex items-center gap-1"><Database size={10}/> FAISS INDEX</span> <span className="text-white">ONLINE</span></div>
            <div className="flex justify-between"><span>MULTI-AGENT SYSTEM</span> <span className="text-white">ACTIVE</span></div>
            <div className="flex justify-between"><span>POSTGRESQL KNOWLEDGE</span> <span className="text-white">SYNCED</span></div>
            <div className="flex justify-between"><span>MOODIES VECTORS</span> <span className="text-aether-green">STABLE</span></div>
          </div>
        </div>

        {/* Module 2: Hardware Telemetry */}
        <div className="border border-white/10 bg-white/5 p-4 rounded-lg flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white text-xs tracking-widest">LOCAL HARDWARE</span>
            <Cpu size={14} className="text-blue-400" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-gray-400">RTX 4060 VRAM</span>
                <span className="text-blue-400">{vramUsage} / 8.0 GB</span>
              </div>
              <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 transition-all duration-700 ease-in-out" style={{ width: `${(vramUsage / 8) * 100}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-gray-400">i7 CPU USAGE</span>
                <span className="text-blue-400">{cpuUsage}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 transition-all duration-700 ease-in-out" style={{ width: `${cpuUsage}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Module 3: Active Training Pipeline & Logs */}
        <div className="col-span-2 border border-white/10 bg-white/5 p-4 rounded-lg flex flex-col h-48">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white text-xs tracking-widest">LIVE TRAINING / LOGS</span>
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