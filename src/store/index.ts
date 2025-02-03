import { create } from 'zustand';

interface States {
  points: number;
}

interface Actions {
  changePoints: (newPoints: number) => void;
  addToPoints: (numToAdd: number) => void;
}

export const usePointsStore = create<States & Actions>((set) => ({
  points: 0,

  changePoints: (newPoints) => set(() => ({ points: newPoints })),
  addToPoints: (numToAdd) => set((state) => ({ points: state.points + numToAdd })),
}));