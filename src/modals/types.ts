export type ProductTypes {
    id: number;
    name: string;
    description: string;
    price : number;
    date : string;
    condition : string;
    category_id : number;
    image: string;
    seller_id: number
}

export interface EditProductProps {
    existingData: ProductTypes
}