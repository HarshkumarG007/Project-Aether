import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useAetherStore } from '../../store/useAetherStore';

const BootScreen = () => {
  const containerRef = useRef(null);
  const textRefs = useRef([]);
  const setPhase = useAetherStore((state) => state.setPhase);
  const setStoryPath = useAetherStore((state) => state.setStoryPath);
  const [progress, setLocalProgress] = useState(0);
  const [showChoices, setShowChoices] = useState(false);

  // The sequence of terminal commands we want to display
  const bootSequence = [
    "INITIALIZING NEURAL INTERFACE...",
    "LOADING ENVIRONMENT...",
    "COMPILING WEBGL SHADERS...",
    "BYPASSING SECURITY PROTOCOLS...",
    "ACCESS GRANTED."
  ];

  useEffect(() => {
    // Create a GSAP timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Show branching choices instead of auto-transitioning
        setShowChoices(true);
      }
    });

    // Animate each line appearing one after the other
    textRefs.current.forEach((el, index) => {
      tl.fromTo(el, 
        { opacity: 0, x: -20 }, 
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
        index === 0 ? 0.5 : "+=0.3" // Stagger the timing
      );
    });

    // Simulate a fake loading percentage
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress > 100) {
        currentProgress = 100;
        clearInterval(interval);
      }
      setLocalProgress(currentProgress);
    }, 200);

    return () => {
      clearInterval(interval);
      tl.kill(); // Cleanup animation if component unmounts
    };
  }, []);

  const handleChoice = (path) => {
    setStoryPath(path);
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => setPhase('city') // Move to the 3D City phase
    });
  };

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 bg-[#030303] flex flex-col justify-center items-start pl-10 md:pl-32 font-mono text-aether-green z-50 select-none"
    >
      <div className="flex flex-col gap-2">
        {bootSequence.map((text, index) => (
          <p 
            key={index} 
            ref={(el) => (textRefs.current[index] = el)}
            className="text-sm md:text-base opacity-0"
          >
            <span className="opacity-50 mr-2">{">"}</span> {text}
          </p>
        ))}
      </div>
      
      {/* Loading Bar */}
      {!showChoices && (
        <div className="mt-8 w-64 max-w-full">
          <div className="text-xs mb-1 opacity-70">SYSTEM LOAD: {progress}%</div>
          <div className="h-1 w-full bg-gray-900 overflow-hidden">
            <div 
              className="h-full bg-aether-green transition-all duration-200 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Story Branching Choices */}
      {showChoices && (
        <div className="mt-8 flex flex-col gap-4 animate-fade-in">
          <p className="text-sm text-white mb-2">CHOOSE INITIALIZATION PATH:</p>
          <div className="flex gap-4">
            <button 
              onClick={() => handleChoice('architecture')}
              className="px-6 py-3 border border-aether-green/50 bg-aether-green/10 hover:bg-aether-green/30 text-aether-green text-xs tracking-widest transition-all shadow-[0_0_15px_rgba(0,255,65,0.1)] hover:shadow-[0_0_25px_rgba(0,255,65,0.3)]"
            >
              [1] ARCHITECTURE (CODE)
            </button>
            <button 
              onClick={() => handleChoice('imagination')}
              className="px-6 py-3 border border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/30 text-purple-400 text-xs tracking-widest transition-all shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]"
            >
              [2] IMAGINATION (VISUALS)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BootScreen;