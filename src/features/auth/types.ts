export interface AuthState {
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
  error: {detail: string} | null
}