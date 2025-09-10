import React, { createContext, useState, ReactNode, useEffect } from "react";

interface LoginContextType {
    isLogin: boolean;
    setIsLogin: (value: boolean) => void;
  }

  export const LoginContext = createContext<LoginContextType>({
    isLogin: false,
    setIsLogin: () => {},
  });

  interface LoginProviderProps {
    children: ReactNode;
  }
  
  export const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
    const [isLogin, setIsLogin] = useState<boolean>(false);

    useEffect(()=>{
      const checkLogin = ()=>{
        const auth = localStorage.getItem('token');
        if(auth)
        {
          setIsLogin(true);
        }
        else{
          setIsLogin(false);
        }
      }
      checkLogin();
    },[])
  
    return (
      <LoginContext.Provider value={{ isLogin, setIsLogin }}>
        {children}
      </LoginContext.Provider>
    );
  };