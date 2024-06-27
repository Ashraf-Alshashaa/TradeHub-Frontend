export interface Category {
    id: number
    name: string

}

export interface HeaderProps {
    onSearch: (searchQuery: string) => void;
    searchQuery: string;
    onSearchSubmit: (searchQuery: string) => void;
  }