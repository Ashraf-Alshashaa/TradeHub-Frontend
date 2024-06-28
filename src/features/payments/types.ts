export interface Payment {
    product_ids: number[] | null;
    currency: string;
    user_id: number;
  }
    
  export interface PaymentState {
    payment: boolean;
    loading: boolean;
    error: string | null;
  }