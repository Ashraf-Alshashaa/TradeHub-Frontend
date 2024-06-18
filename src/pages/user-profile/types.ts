import { ReactNode } from 'react';
import { Product } from '../../components/product-listing/types'


export type ProductCount = {
    id: number;
    item: ReactNode;
  };
  
  export type TabContentDictionary = {
    [key: string]: ReactNode[] | string;
  };