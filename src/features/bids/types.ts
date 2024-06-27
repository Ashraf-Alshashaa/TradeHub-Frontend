export interface Bid {
  id?:number
  product_id: number;
  date: string;
  price: number;
  bidder_id: number;
  status: string;
  username?: string
}

export interface BidState {
    bids: Bid[];
    loading: boolean;
    error: string | null;
  }