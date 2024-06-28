import { Bid } from "../features/bids/types"

export type ProductTypes = {
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

export interface AddProductProps {
    show: boolean;
    handleClose: () => void;
    user: any;
  }

export interface ChooseBidProps {
    bidsData: Bid[]
}

export enum ProductCondition {
    New = "new",
    GoodAsNew = "good as new",
    Used = "used",
  }