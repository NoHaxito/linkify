"use client";

import { useEffect, type ReactNode } from "react";
import type { Session, User } from "lucia";
import { useAuth } from "@/store/auth";

export function AuthProvider({
  children,
  user,
  session,
}: {
  children: ReactNode;
  user: User | null;
  session: Session | null;
}) {
  const setAuth = useAuth((state) => state.setAuth);
  useEffect(() => {
    setAuth(user, session);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return children;
}
