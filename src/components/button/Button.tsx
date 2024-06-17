// CustomButton.tsx
import React from 'react';
import { Button } from 'react-bootstrap';
import { CustomButtonProps } from './types';


const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  buttonType,
  className = '',
  ...rest
}) => {
  // Map buttonType to specific Bootstrap variants
  const variant = buttonType === 'primary' ? 'success' : 'light';

  return (
    <Button onClick={onClick} variant={variant} className={className} {...rest}>
      {text}
    </Button>
  );
};

export default CustomButton;
