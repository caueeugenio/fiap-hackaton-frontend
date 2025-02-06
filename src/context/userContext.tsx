"use client";

import { User } from "@/types/globals";
import { redirect, usePathname } from "next/navigation";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

const INITIAL_STATE: User = {
  email: "",
  name: "",
  role: "",
  id: 0,
};

interface UserContextProps {
  user: User;
  setLoggedUser: (user: User) => void;
  resetUser: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(INITIAL_STATE);
  const pathname = usePathname();

  const resetUser = () => {
    setUser(INITIAL_STATE);
    localStorage.removeItem("user");
  };

  const setLoggedUser = (u: User) => {
    setUser(u);
  };

  useEffect(() => {
    const lsUser = localStorage.getItem("user");
    if (lsUser) {
      setUser(JSON.parse(lsUser));
    } else {
      localStorage.removeItem("user");

      if (pathname !== "/login") {
        redirect("/login");
      }
    }
  }, [pathname]);

  return (
    <UserContext.Provider value={{ user, setLoggedUser, resetUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
