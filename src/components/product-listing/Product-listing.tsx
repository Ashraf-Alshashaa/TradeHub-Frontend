import React from 'react';
import './product-listing.css';
import { Product } from './types';

interface ProductListingProps {
    product: Product;
  }
  
  const ProductListing: React.FC<ProductListingProps> = ({ product }) => {
    return (
      <div className="card mb-3">
        <div className="row g-0">
            <div className="col-md-4 image-container">
                <img src={product.image} className="image img-fluid rounded-start" alt={product.name} />
            </div>
            <div className="col-md-4">
                <div className="card-body justify-content-center">
                    <h5 className="my-2">{product.name}</h5>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card-body justify-content-center">
                    <p className="card-text my-2">{product.price}</p>
                </div>
            </div>
        </div>
        </div>
    );
  };
  
  export default ProductListing;
