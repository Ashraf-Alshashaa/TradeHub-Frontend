import React from 'react';
import './product-card.css';
import {ProductCardProps} from './types'
import Image from '../image/Image'


const ProductCard: React.FC<ProductCardProps> = ({ photo, name, price, location }) => {
    const defaultWidth = 267;
    const defaultHeight = 95;
    const className='responsive-image';

    const photoProps = {
      ...photo,
      width: photo.width || defaultWidth,
      height: photo.height || defaultHeight,
      className: photo.className || className
    };


    return (
        <div className="product-card-frame">
          <Image {...photoProps} />
          <h2 className="product-card-name">{name}</h2>
          <p className="product-card-price">${price.toFixed(2)}</p>
          <p className="product-card-location">{location}</p>
        </div>
      );
    };

  export default ProductCard;
