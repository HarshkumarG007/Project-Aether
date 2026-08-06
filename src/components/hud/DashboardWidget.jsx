import { useState, useEffect } from 'react';

const DashboardWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute top-6 left-6 z-10 pointer-events-none font-mono text-xs text-aether-green w-64 bg-black/40 backdrop-blur-sm border border-aether-green/20 p-4 rounded-lg shadow-[0_0_15px_rgba(0,255,65,0.1)]">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-aether-green/20">
        <span className="tracking-widest font-bold">SYSTEM_STATUS</span>
        <span className="text-white">{time.toLocaleTimeString()}</span>
      </div>
      
      <div className="space-y-3">
        <ProgressBar label="Frontend" percentage={96} />
        <ProgressBar label="Backend" percentage={78} />
        <ProgressBar label="UI Design" percentage={91} />
        <ProgressBar label="Problem Solving" percentage={89} />
        <ProgressBar label="Learning" percentage={100} />
      </div>
      
      <p className="text-[9px] text-gray-400 mt-4 tracking-wider uppercase">Drag to navigate scene</p>
    </div>
  );
};

const ProgressBar = ({ label, percentage }) => (
  <div className="flex flex-col gap-1">
    <div className="flex justify-between text-[10px]">
      <span className="text-white opacity-80">{label}</span>
      <span>{percentage}%</span>
    </div>
    <div className="h-1 w-full bg-gray-900 rounded overflow-hidden">
      <div 
        className="h-full bg-aether-green shadow-[0_0_5px_rgba(0,255,65,0.5)]" 
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

export default DashboardWidget;
