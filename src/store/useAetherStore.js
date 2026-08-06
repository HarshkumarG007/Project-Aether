import { create } from 'zustand';

export const useAetherStore = create((set, get) => ({
  currentPhase: 'booting', 
  progress: 0,
  activeWindow: null, // Tracks which HUD window is open ('terminal', 'lab', etc.)
  
  // Phase 1 additions
  cameraTarget: [0, 4, 10], // Default focus
  deviceTier: 'full',
  theme: 'dark',
  tourState: 'idle',
  storyPath: 'architecture', // 'architecture' | 'imagination'
  spawnCoffee: false,

  setProgress: (val) => set({ progress: val }),
  setPhase: (phase) => set({ currentPhase: phase }),
  
  // Setters for new fields
  setCameraTarget: (target) => set({ cameraTarget: target }),
  setDeviceTier: (tier) => set({ deviceTier: tier }),
  setTheme: (theme) => set({ theme }),
  setTourState: (state) => set({ tourState: state }),
  setStoryPath: (path) => set({ storyPath: path }),
  triggerCoffee: () => set({ spawnCoffee: true }),
  
  // Toggle windows open and closed
  toggleWindow: (windowName) => set((state) => ({ 
    activeWindow: state.activeWindow === windowName ? null : windowName 
  })),

  // Phase 2 Quick Tour
  startTour: () => {
    set({ tourState: 'active' });
    let timeline = [
      { window: 'ailab', delay: 2000 },
      { window: 'projects', delay: 8000 },
      { window: 'network', delay: 14000 },
      { window: 'terminal', delay: 20000 },
      { window: null, delay: 26000 }
    ];

    timeline.forEach(step => {
      setTimeout(() => {
        const state = get();
        if (state.tourState === 'active') {
          set({ activeWindow: step.window });
          
          if (step.window === 'terminal') {
            set({ cameraTarget: { position: [-3, 1, 6], lookAt: [0, 2, 0] } });
          } else if (step.window === 'ailab') {
            set({ cameraTarget: { position: [0, 1.5, 4], lookAt: [0, 4, 0] } });
          } else if (step.window === 'projects') {
            set({ cameraTarget: { position: [5, 6, 5], lookAt: [0, 1, 0] } });
          } else if (step.window === 'network') {
            set({ cameraTarget: { position: [0, 8, 8], lookAt: [0, 3, 0] } });
          } else {
            set({ cameraTarget: { position: [0, 4, 10], lookAt: [0, 0, 0] }, tourState: 'idle' });
          }
        }
      }, step.delay);
    });
  },
  
  stopTour: () => set({ tourState: 'idle' })
}));