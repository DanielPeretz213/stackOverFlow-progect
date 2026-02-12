import { createContext, useContext, useEffect, useState } from "react";
import { type User } from "../types/User";
import React from "react";
import api from "../utils/api";

type autoContextType = {
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logOut: () => void;
};

const AutoContext = createContext<autoContextType | null>(null);

export const AutoProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuto = async () => {
      try {
        const res = await api.get("/auto/me");
        setUser(res.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuto();
  }, []);

  const login = (user: User) => {
    setUser(user);
  };

  const logOut = async () => {
    try{
    await api.post("/auto/logout");
    setUser(null);
    }catch(error){
        console.log("logOut faild ", error);   
    }

  };

  return (
    <AutoContext.Provider value={{user, isLoading, login, logOut}}>
      {children}
    </AutoContext.Provider>
  );
};

export const useAuto = () => {
    const res = useContext(AutoContext);
    if(!res) throw new Error("useAuth must be inside provider");
    return res;
};
