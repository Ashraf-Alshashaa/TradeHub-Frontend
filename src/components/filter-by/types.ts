import { Category } from "../../features/categories/types";

export interface FilterByProps {
  categories: Category[];
  priceRange: [number, number];
  onPriceChange: (values: number[]) => void;
  onCategoryChange: (categoryId: number| null) => void;
  selectedCategoryId?: number | null;
}