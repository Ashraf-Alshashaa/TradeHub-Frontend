export interface User {
  id: number;
  username: string;
  email: string;
}
  
export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
  
export  interface UserBase {
  username: string;
  email: string;
  password: string;
}