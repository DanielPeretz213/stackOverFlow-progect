import { createContext, useContext, useEffect, useState } from "react";
import { type User } from "../types/User";
import React from "react";

type autoContextType = {
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
};

const AutoContext = createContext<autoContextType | null>(null);

export const autoProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(()=>{
    
  },[]);
};
