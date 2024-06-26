import React from 'react';
import './product-listing.css';
import { ProductListingProps } from './types';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';


  
const ProductListing: React.FC<ProductListingProps> = ({ product, is_cart }) =>
{
const type = 'checkbox'
  return (
    <div className='py-1' onClick={product.onClick}>
    <Card style={{height: '6rem'}}>
    <div className='row d-flex'>
      <div className='product-card-list-container col-4 '>
      <Card.Img className='product-list-image' src={product.image} /> </div>
      <Card.Body className='col-8'>
        <div className='row d-flex'>
        <Card.Title className='col-6'>{product.name}</Card.Title>
        <Card.Text className='col-4'> {product.price} </Card.Text>
        {is_cart && (
              <Form.Check className='col-2'
                type={type}
                id={`default-${type}`}
              />
            )}
        </div>
      </Card.Body>
    </div>
    </Card>
  </div>
  );
}

export default ProductListing;