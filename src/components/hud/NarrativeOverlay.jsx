import { useState, useEffect } from 'react';

const NarrativeOverlay = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 0: "Welcome."
    const t1 = setTimeout(() => setStage(1), 3000);
    // Stage 1: "I've been expecting you."
    const t2 = setTimeout(() => setStage(2), 6000);
    // Stage 2: "Mission: Find the Architect."
    const t3 = setTimeout(() => setStage(3), 9000);
    // Stage 3: Fade out completely
    const t4 = setTimeout(() => setStage(4), 12000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  if (stage === 4) return null;

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center bg-transparent">
      <div className="text-center font-mono tracking-widest text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
        {stage === 0 && <p className="animate-fade-in text-2xl">Welcome.</p>}
        {stage === 1 && <p className="animate-fade-in text-2xl text-gray-300">I've been expecting you.</p>}
        {stage === 2 && (
          <div className="animate-fade-in">
            <p className="text-sm text-gray-400 mb-2 uppercase">New Objective</p>
            <p className="text-3xl text-aether-green drop-shadow-[0_0_15px_rgba(0,255,65,0.8)] font-bold uppercase">Mission: Find the Architect.</p>
          </div>
        )}
        {stage === 3 && (
          <div className="opacity-0 transition-opacity duration-1000">
             <p className="text-3xl text-aether-green font-bold uppercase">Mission: Find the Architect.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NarrativeOverlay;
