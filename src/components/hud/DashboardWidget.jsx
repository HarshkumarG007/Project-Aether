import { useState, useEffect } from 'react';

const DashboardWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute top-6 left-6 z-10 pointer-events-none font-mono text-xs w-56">
      <div className="bg-black/50 backdrop-blur-md border border-aether-green/15 p-4 rounded-xl shadow-[0_0_20px_rgba(0,255,65,0.05)]">
        <div className="flex justify-between items-center mb-3 pb-2 border-b border-aether-green/15">
          <span className="text-[10px] tracking-widest text-aether-green opacity-70">AETHER_OS</span>
          <span className="text-white text-[10px]">{time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
        </div>
        <div className="space-y-1.5">
          <InfoRow label="IDENTITY" value="Harsh Kumar Gupta" />
          <InfoRow label="ROLE" value="Applied AI/ML Eng." />
          <InfoRow label="BASE" value="Varanasi, India" />
          <InfoRow label="STATUS" value="Open to Opportunities" valueColor="text-aether-green" />
        </div>
        <p className="text-[8px] text-gray-700 mt-3 tracking-wider">DRAG SCENE TO NAVIGATE</p>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value, valueColor = 'text-white/70' }) => (
  <div className="flex flex-col gap-0">
    <span className="text-[8px] text-gray-600 tracking-widest">{label}</span>
    <span className={`text-[10px] ${valueColor} truncate`}>{value}</span>
  </div>
);

export default DashboardWidget;
