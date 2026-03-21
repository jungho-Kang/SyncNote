import { create } from "zustand";

interface ParticipantsPanelState {
  isOpen: boolean;
  toggle: () => void;
}

export const useParticipantsPanelStore = create<ParticipantsPanelState>(
  set => ({
    isOpen: true,
    toggle: () => set(state => ({ isOpen: !state.isOpen })),
  }),
);
