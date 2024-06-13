import React from 'react';
import './button.css'; // Import the CSS file
import { ButtonProps } from './types';

const Button: React.FC<ButtonProps> = ({ text, onClick, variant = 'primary', className = '' }) => {
  const handleClick = () => {
    onClick(); // Call the provided onClick function
  };

  return (
    <button
      className={`custom-button ${variant} ${className}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;