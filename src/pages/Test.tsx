import React from 'react';
import ProductListing from '../components/product-listing/Product-listing';
import { Product } from '../components/product-listing/types'




const product: Product = {
  image: 'https://cdn.pixabay.com/photo/2019/12/29/08/37/women-4726513_640.jpg',
  name: 'Product name',
  price: '$XX.YY',
  onClick: () => alert("Card clicked")
};


const Test: React.FC = () => {
  return (
    <div className="App">

      <div className='col-md-12'> 
      <ProductListing product={product} is_cart={true} />
      </div>
      <div className='col-md-12'> 
      <ProductListing product={product} is_cart={false} />
      </div>
    </div>
  );
};

export default Test;
