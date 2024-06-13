import { ImageComponentProps } from '../image/types';

export interface ProductCardProps {
  photo: ImageComponentProps;
  name: string;
  price: number;
  location: string;
}