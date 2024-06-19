import React from 'react';
import './product-listing.css';
import { Product } from './types';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';


interface ProductListingProps {
    product: Product;
    is_cart: boolean;
  }
  
const ProductListing: React.FC<ProductListingProps> = ({ product, is_cart }) =>
{
const type = 'checkbox'
  return (
    <Card style={{height: '6rem'}}>
    <div className='g-1 d-flex'>
      <Card.Img className='' variant="top" src={product.image} />
      <Card.Body className='col'>
        <div className='row d-flex'>
        <Card.Title className='col-sm-6'>{product.name}</Card.Title>
        <Card.Text className='col-sm-4'> {product.price} </Card.Text>
        {is_cart && (
              <Form.Check className='col-sm-2'
                type={type}
                id={`default-${type}`}
              />
            )}
        </div>
      </Card.Body>
    </div>
    </Card>
  );
}

export default ProductListing;