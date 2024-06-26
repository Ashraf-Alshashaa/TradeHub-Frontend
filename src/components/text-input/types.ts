export interface TextInputProps {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  type?: 'text' | 'password' | 'email' | 'price'; 
  className?: string;
  required?: boolean;
  showErrors?: boolean;
}