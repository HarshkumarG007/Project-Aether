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

  const bootSequence = [
    "AETHER_OS v2.1 — INITIALIZING...",
    "LOADING IDENTITY: harsh_kumar_gupta.profile",
    "MOUNTING: ML_PROJECTS / RAG_SYSTEMS / LLM_INFRA",
    "COMPILING WEBGL ENVIRONMENT...",
    "SYSTEM READY. WELCOME TO AETHER."
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => { setShowChoices(true); }
    });
    textRefs.current.forEach((el, index) => {
      tl.fromTo(el,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
        index === 0 ? 0.5 : "+=0.3"
      );
    });

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress > 100) { currentProgress = 100; clearInterval(interval); }
      setLocalProgress(currentProgress);
    }, 200);
    return () => { clearInterval(interval); tl.kill(); };
  }, []);

  const handleEnter = () => {
    setStoryPath('architecture');
    gsap.to(containerRef.current, {
      opacity: 0, scale: 1.05, duration: 0.6, ease: "power2.inOut",
      onComplete: () => setPhase('city')
    });
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 bg-[#030303] flex flex-col justify-center items-start pl-8 md:pl-32 font-mono text-aether-green z-50 select-none"
    >
      <div className="mb-6 text-[10px] text-gray-600 tracking-widest uppercase">Applied AI/ML Engineer Portfolio</div>
      <div className="flex flex-col gap-2">
        {bootSequence.map((text, index) => (
          <div
            key={index}
            ref={(el) => (textRefs.current[index] = el)}
            className="text-sm md:text-base opacity-0 flex items-center gap-3"
          >
            <span className="text-aether-green/40 select-none">{'>'}</span>
            <span className={index === bootSequence.length - 1 ? 'text-white font-semibold' : 'text-aether-green/80'}>
              {text}
            </span>
          </div>
        ))}
      </div>

      {!showChoices && (
        <div className="mt-10 w-72 max-w-full">
          <div className="flex justify-between text-[10px] mb-2 opacity-60">
            <span>INITIALIZING ENVIRONMENT</span>
            <span>{progress}%</span>
          </div>
          <div className="h-px w-full bg-gray-900 overflow-hidden">
            <div
              className="h-full bg-aether-green transition-all duration-200 ease-linear shadow-[0_0_6px_rgba(0,255,65,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {showChoices && (
        <div className="mt-10 flex flex-col gap-4 animate-fade-in">
          <p className="text-xs text-gray-400 tracking-widest">PRESS ENTER TO ACCESS PORTFOLIO</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleEnter}
              className="px-8 py-3 border border-aether-green/60 bg-aether-green/10 hover:bg-aether-green/20 text-aether-green text-xs tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(0,255,65,0.1)] hover:shadow-[0_0_30px_rgba(0,255,65,0.25)] focus:outline-none focus:ring-2 focus:ring-aether-green/50"
            >
              [ ENTER AETHER ]
            </button>
            <div className="text-[10px] text-gray-600 font-mono self-center">
              Harsh Kumar Gupta · Applied AI/ML Engineer · Varanasi, India
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BootScreen;
