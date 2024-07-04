export interface Product {
    id : number;
    image: string;
    name: string;
    price: number;
  }
  

  export interface ProductListingProps {
    product: Product;
    is_cart: boolean;
    handleCheckbox: (id: number) => void;
  }