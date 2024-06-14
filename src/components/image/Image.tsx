import React from 'react';
import './image.css';
import { ImageComponentProps } from './types';
import { Image } from 'react-bootstrap';


const CustomImage: React.FC<ImageComponentProps> = ({ src, alt, width = 'auto', height = 'auto'}) => {
  return (
  <Image
    src={src} 
    alt={alt} 
    width={width} 
    height={height} 
    fluid 
    className="custom-img"
    rounded
    />
  );
};

export default CustomImage;
