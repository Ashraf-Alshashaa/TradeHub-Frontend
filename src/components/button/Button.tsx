import React from 'react';
import { Button } from 'react-bootstrap';
import './button.css';
import { ButtonProps } from './types';

const CustomButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = 'primary',
  className,
}) => {
  const buttonClass = `custom-btn ${variant}`;

  return (
    <Button variant={variant} className={buttonClass} onClick={onClick}>
      {text}
    </Button>
  );
};

export default CustomButton;