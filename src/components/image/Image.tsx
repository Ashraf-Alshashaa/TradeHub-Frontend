import React from 'react';
import './image.css';
import { ImageComponentProps } from './types';

const Image: React.FC<ImageComponentProps> = ({ src, alt, width = 'auto', height = 'auto', className = '' }) => {
  return (
    <img src={src} alt={alt} width={width} height={height} className={className} />
  );
};

export default Image;
