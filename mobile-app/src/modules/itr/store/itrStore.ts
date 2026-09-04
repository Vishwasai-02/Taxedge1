import { create } from 'zustand';

interface ITRState {
  currentStep: number;
  setStep: (step: number) => void;
}

export const useITRStore = create<ITRState>((set) => ({
  currentStep: 0,
  setStep: (currentStep) => set({ currentStep }),
}));
export default useITRStore;
