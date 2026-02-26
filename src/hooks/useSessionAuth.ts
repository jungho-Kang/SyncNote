import { useState } from "react";

export const useSessionAuth = () => {
  const [isLogin, setIsLogin] = useState(
    sessionStorage.getItem("isLogin") === "true",
  );

  const login = () => {
    sessionStorage.setItem("isLogin", "true");
    setIsLogin(true);
  };

  const logout = () => {
    sessionStorage.removeItem("isLogin");
    setIsLogin(false);
  };

  return { isLogin, login, logout };
};
