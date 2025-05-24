import { useState, ReactNode } from "react";
import { AuthUIContext, AuthUIContextType, AuthUIStateType } from "@/context";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthUIProvider = ({ children }: AuthProviderProps) => {
  const [authUIState, setAuthUIState] = useState<AuthUIStateType>("login");

  const goToLogin = () => setAuthUIState("login");
  const goToRegister = () => setAuthUIState("register");
  const goToRecover = () => setAuthUIState("recover");

  const value: AuthUIContextType = {
    authUIState,
    goToLogin,
    goToRecover,
    goToRegister,
  };

  return (
    <AuthUIContext.Provider value={value}>{children}</AuthUIContext.Provider>
  );
};
