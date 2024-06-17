import { ButtonProps } from 'react-bootstrap'
import { ReactNode } from 'react';

export interface CustomButtonProps extends ButtonProps {
    text: string | ReactNode;
    onClick: () => void;
    buttonType: 'primary' | 'secondary'; // Specify button type
  }