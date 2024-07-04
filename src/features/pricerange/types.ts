export interface PriceRange {
    min_price: number;
    max_price : number;
  }
    
  export interface PriceRangeState {
    min_price: number;
    max_price : number;
    loading: boolean;
    error: {detail: string} | null;
  }