export interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price : number;
  date : string;
  condition : string;
  category_id : number;
  seller_id: number
  seller_city: string;
  sold: boolean;
}
  
export interface ProductsState {
  products: Product[];
  myCart : Product[];
  myBids : Product[];
  searchProducts : Product [];
  boughtProducts : Product[];
  soldProducts : Product[];
  myListings: Product[];
  product: Product | null;
  loading: boolean;
  error: {detail: string} | null;
}