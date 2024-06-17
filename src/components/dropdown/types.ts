import { ReactNode } from 'react';
import { VariantType } from '../../types';

export interface DropdownItemProps{
    id: string,
    onClick: () => void,
    content: ReactNode | string
}

export interface DropDownMenuProps{
    title: string
    data: DropdownItemProps[]
    variant?: VariantType
}