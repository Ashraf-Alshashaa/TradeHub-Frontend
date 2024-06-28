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
    <div className='py-1'>
    <Card className="pt-3" style={{height: '6rem'}}>
    <div className='row d-flex px-3 align-items-center'>
      <div className='product-card-list-container col-4 '>
      <Card.Img className='product-list-image' src={product.image} onClick={() => handleClick(product.id)} /> </div>
      <Card.Body className='col-8'>
        <div className='row d-flex'>
        <Card.Title className='col-6'  onClick={() => handleClick(product.id)}>{product.name}</Card.Title>
        <Card.Text className='col-4'  onClick={() => handleClick(product.id)}> €{product.price} </Card.Text>
        {is_cart && (
              <Form.Check className='col-2 align-items-center'
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