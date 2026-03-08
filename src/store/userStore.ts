import { create } from "zustand";
import { api } from "@/api/api";

interface UserState {
  userId: number;
  email: string;
  nickname: string;
  role: string;
  signupDate: string;
  fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserState>(set => ({
  userId: 0,
  email: "",
  nickname: "Guest",
  role: "",
  signupDate: "",
  fetchUser: async () => {
    try {
      // GET 요청
      const res = await api.get("/users/profile");
      const data = res.data.data;
      set({
        userId: data.userId,
        email: data.email,
        nickname: data.nickname,
        role: data.role,
        signupDate: data.signupDate,
      });

      console.log("성공", res.data.data);
    } catch (err) {
      console.error(err);
    }
  },
}));
