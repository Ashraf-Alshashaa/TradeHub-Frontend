export interface Category {
    id: number
    name: string

}

export interface HeaderProps {
    onSearchSubmit: (searchQuery: string) => void;
    onCategorySelect: (categoryId: number | null) => void;
    selectedCategoryId: number | null;
    categories: Category[];  // Assuming you want to pass categories to the header as well
  }