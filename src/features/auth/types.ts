export interface AuthState {
  user: any;
  user_id: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}