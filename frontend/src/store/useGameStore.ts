import { create } from 'zustand';

interface GameState {
  playerName: string;
  score: number;
  setPlayerName: (name: string) => void;
  incrementScore: (points: number) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  playerName: '',
  score: 0,
  
  setPlayerName: (name) => set({ playerName: name }),
  
  incrementScore: (points) => set((state) => ({ score: state.score + points })),
  
  resetGame: () => set({ playerName: '', score: 0 }),
}));