export interface Product {
    id : number;
    image: string;
    name: string;
    price: string;
  }
  

  export interface ProductListingProps {
    product: Product;
    is_cart: boolean;
  }