// stores/useAuthStore.ts
import { create } from "zustand";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../app/firebase/fire";

type AuthState = {
  user: User | null;
  loading: boolean;
  init: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  init: () => {
    onAuthStateChanged(auth, (user) => {
      set({ user, loading: false });
    });
  },
}));
