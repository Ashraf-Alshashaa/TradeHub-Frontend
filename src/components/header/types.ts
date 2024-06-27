export interface Category {
    id: number
    name: string

}

export interface HeaderProps {
    onSearchSubmit: (searchQuery: string) => void;
  }