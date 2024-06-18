import React from 'react';
import './product-listing.css';
import { Product } from './types';
import { ProductListingProps } from './types';

  
  const ProductListing: React.FC<ProductListingProps> = ({ product }) => {
    return (
      <div className="card mb-3">
        <div className="row g-0">
            <div className="col-md-3 image-container">
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
            <div className="col-md-1">
            <div className="col-md-1 form-check my-4">
          <input
            className="form-check-input"
            type="checkbox"
            id={`flexCheckDefault-${product.id}`}
          />
          <label
            className="form-check-label"
            htmlFor={`flexCheckDefault-${product.id}`}
          ></label>
        </div>
            </div>
        </div>
        </div>
    );
  };
  
  export default ProductListing;
