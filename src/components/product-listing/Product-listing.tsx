import React from 'react';
import './product-listing.css';
import { useNavigate, useParams } from "react-router-dom";
import { ProductListingProps } from './types';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';


  
const ProductListing: React.FC<ProductListingProps> = ({ product, is_cart }) =>
{
const type = 'checkbox'
const navigate = useNavigate();
const { id } = useParams<{ id: string }>(); 

  const handleClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className='py-1' onClick={() => handleClick(product.id)}>
    <Card style={{height: '6rem'}}>
    <div className='row d-flex'>
      <div className='product-card-list-container col-4 '>
      <Card.Img className='product-list-image' src={product.image} /> </div>
      <Card.Body className='col-8'>
        <div className='row d-flex'>
        <Card.Title className='col-6'>{product.name}</Card.Title>
        <Card.Text className='col-4'> €{product.price} </Card.Text>
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