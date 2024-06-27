import { Address } from "../addresses/types";
export interface User {
  id: number;
  username: string;
  email: string;
  address: Address;
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