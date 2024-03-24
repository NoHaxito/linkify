import type { User, Session } from "lucia";

import { create } from "zustand";

type AuthStore = {
  user: User | null;
  session: Session | null;
  setAuth: (user: User | null, session: Session | null) => void;
};

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  session: null,
  setAuth: (user: User | null, session: Session | null) => {
    set({ user, session });
  },
}));
