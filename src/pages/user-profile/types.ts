import { ReactNode } from 'react';

export type ProductCount = {
    id: number;
    item: ReactNode;
  };
  
  export type TabContentDictionary = {
    [key: string]: ReactNode[] | string;
  };