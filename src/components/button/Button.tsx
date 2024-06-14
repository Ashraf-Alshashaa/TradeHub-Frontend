// CustomButton.tsx
import React from 'react';
import { Button, ButtonProps } from 'react-bootstrap';

interface CustomButtonProps extends ButtonProps {
  text: string;
  onClick: () => void;
  buttonType: 'primary' | 'secondary'; // Specify button type
}

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
