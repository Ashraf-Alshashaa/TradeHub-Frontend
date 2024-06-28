export interface Payment {
    product_ids: number[] | null;
    currency: string;
    user_id: number;
  }
    
  export interface PaymentState {
    payment: Payment | null;
    paymentId: string | null;
    loading: boolean;
    error: string | null;
  }