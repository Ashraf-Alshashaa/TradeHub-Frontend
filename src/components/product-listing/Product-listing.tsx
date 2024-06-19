import React from 'react';
import './product-listing.css';
import { ProductListingProps } from './types';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';


  
const ProductListing: React.FC<ProductListingProps> = ({ product, is_cart }) =>
{
  const CardClick = () => {
    console.log("Card clicked!");
  };
const type = 'checkbox'
  return (
    <div onClick={CardClick}>
    <Card style={{height: '6rem'}}>
    <div className='g-1 row d-flex'>
      <Card.Img className='col-4 card-img' src={product.image} />
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