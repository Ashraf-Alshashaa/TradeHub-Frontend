export interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'password' | 'email'; 
  className?: string;
  required?: boolean;
  showErrors?: boolean;
}