export interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price : number;
  date : Date;
  condition : string;
  category_id : number;
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
  error: string | null;
}