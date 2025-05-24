import { useState, useEffect, ReactNode } from "react";
import { AuthContext } from "@/context";
import { AuthContextType, AuthResponse } from "@/types";
import { authService } from "@/services";
import { apiErrorHandler } from "@/utils";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [authResponse, setAuthResponse] = useState<AuthResponse | null>(null);
  const [recoverResponse, setRecoverResponse] = useState<{} | null>(null);
  const [signUpResponse, setSignUpResponse] = useState<AuthResponse | null>(
    null
  );

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      setError(null);

      try {
        const storedSesion = await authService.getSession();
        if (storedSesion) {
          const { user, ...rest } = storedSesion;
          setAuthResponse({ session: rest, user });
        }
      } catch (error) {
        apiErrorHandler(error, setError, "Error al iniciar sesion");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login(email, password);
      setAuthResponse(response);
    } catch (error) {
      apiErrorHandler(error, setError, "Error al iniciar sesion");
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.register(email, password);
      setSignUpResponse(response);

      //para ocultar mensaje
      setTimeout(() => {
        setSignUpResponse(null);
      }, 3000);
    } catch (error) {
      apiErrorHandler(error, setError, "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setAuthResponse(null);
    } catch (error) {
      apiErrorHandler(error, setError, "Error al cerrar sesion");
    } finally {
      setLoading(false);
    }
  };

  const recoverPassword = async (email: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.recoverPassword(email);
      setRecoverResponse(response);

      //para ocultar mensaje
      setTimeout(() => {
        setRecoverResponse(null);
      }, 3000);
    } catch (error) {
      apiErrorHandler(error, setError, "Error al recuperar la contrasena");
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    loading,
    error,
    authResponse,
    signUpResponse,
    login,
    signUp,
    logout,
    recoverPassword,
    recoverResponse,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
