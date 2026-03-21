import type { RoomDetail } from "@/types/roomDetail";
import { create } from "zustand";

interface RoomDetailState {
  roomDetail: RoomDetail;

  setRoomDetail: (data: RoomDetail) => void;
  updateTitle: (title: string) => void;
}

export const useRoomDetailStore = create<RoomDetailState>(set => ({
  roomDetail: {
    id: 0,
    title: "",
    description: "",
    visibility: "PUBLIC",
    inviteCode: "",
    ownerId: 0,
    updatedAt: "",
    participants: [],
    note: {
      id: 0,
      content: "",
      updatedAt: "",
    },
    board: {
      id: 0,
      boardElements: [],
    },
  },

  setRoomDetail: data => set({ roomDetail: data }),

  updateTitle: title =>
    set(state => ({
      roomDetail: {
        ...state.roomDetail,
        title,
      },
    })),
}));
