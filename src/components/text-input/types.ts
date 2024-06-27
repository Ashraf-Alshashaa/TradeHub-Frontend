export interface TextInputProps {
  label: string; // Label for the input field
  value: string | number | undefined; // Value of the input field
  onChange: (value: string | number) => void; // Function to handle input change
  type?: 'text' | 'password' | 'email' | 'price'; // Type of the input field (default is 'text')
  className?: string; // Optional className for styling
  required?: boolean; // Optional flag indicating if the field is required
}