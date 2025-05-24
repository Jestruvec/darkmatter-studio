export interface AuthContextType {
  loading: boolean;
  error: string | null;
  authResponse: AuthResponse | null;
  signUpResponse: AuthResponse | null;
  recoverResponse: {} | null;
  login: (email: string, password: string) => promise<void>;
  logout: () => promise<void>;
  signUp: (email: string, password: string) => promise<void>;
  recoverPassword: (email: string) => promise<void>;
}

export interface AuthResponse {
  user: User;
  session: Session;
  weakPassword?: WeakPassword;
}
