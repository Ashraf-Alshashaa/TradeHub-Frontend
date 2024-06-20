import { ButtonProps } from 'react-bootstrap'
import { ReactNode, MouseEventHandler } from 'react';

export interface CustomButtonProps extends ButtonProps {
    text: string | ReactNode;
    onClick: MouseEventHandler<HTMLButtonElement>;
    buttonType: 'primary' | 'secondary'; // Specify button type
  }