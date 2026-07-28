import { create } from 'zustand';

export const useAetherStore = create((set) => ({
  currentPhase: 'booting', 
  progress: 0,
  activeWindow: null, // Tracks which HUD window is open ('terminal', 'lab', etc.)
  
  setProgress: (val) => set({ progress: val }),
  setPhase: (phase) => set({ currentPhase: phase }),
  
  // Toggle windows open and closed
  toggleWindow: (windowName) => set((state) => ({ 
    activeWindow: state.activeWindow === windowName ? null : windowName 
  })),
}));