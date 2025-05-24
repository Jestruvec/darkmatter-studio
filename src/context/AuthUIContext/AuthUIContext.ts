import { createContext, useContext } from "react";

export type AuthUIStateType = "login" | "register" | "recover";

export interface AuthUIContextType {
  authUIState: AuthUIStateType;
  goToLogin: () => void;
  goToRecover: () => void;
  goToRegister: () => void;
}

export const AuthUIContext = createContext<AuthUIContextType | null>(null);

export const useAuthUIContext = (): AuthUIContextType => {
  const context = useContext(AuthUIContext);

  if (!context) {
    throw new Error("useAuthUIContext must be used within an AuthUIProvider");
  }

  return context;
};
