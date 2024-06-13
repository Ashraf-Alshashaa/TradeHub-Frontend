export interface ButtonProps {
    text: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
    className?: string;
  }