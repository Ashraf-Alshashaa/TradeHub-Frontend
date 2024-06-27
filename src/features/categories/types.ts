export interface Category{
    id: number;
    name: string;
}


export interface CategoryState {
    categories: [];
    category: Category | null;
    loading: boolean;
    error: string | null;
}