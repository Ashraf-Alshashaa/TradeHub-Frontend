export interface FilterByProps {
  categories: string[];
  priceRange: [number, number];
  onPriceChange: (values: number[]) => void;
}