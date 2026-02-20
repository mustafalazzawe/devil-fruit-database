export interface IAuthState {
  apiKey: string | null;
  login: (key: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}
