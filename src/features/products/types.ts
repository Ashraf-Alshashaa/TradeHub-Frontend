export interface Product {
  id?: number;
  name: string;
  description: string;
  price : number;
  date : string;
  condition : string;
  category_id : number;
  seller_id: number;
  image: string
}
  
export interface ProductsState {
  products: Product[];
  product: Product | null;
  loading: boolean;
  error: string | null;
}