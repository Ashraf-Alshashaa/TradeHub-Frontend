import React from 'react';
import './text-input.css';
import { TextInputProps } from './types';

const TextInput: React.FC<TextInputProps> = ({ value, onChange, placeholder, type = 'text', className}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      type={type}
      className={`custom-text-input ${className}`}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

export default TextInput;