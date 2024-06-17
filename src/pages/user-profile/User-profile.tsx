import React from 'react';
import ProductListing from '../../components/product-listing/Product-listing';
import { Product } from '../../components/product-listing/types';
import Footer from '../../components/footer/Footer';
import CustomImage from '../../components/image/Image';
import CustomButton from '../../components/button/Button';


const product: Product = {
  image: 'https://cdn.pixabay.com/photo/2019/12/29/08/37/women-4726513_640.jpg',
  name: 'Product name',
  price: '$XX.YY',
};

const UserProfile: React.FC = () => {
    
  return (
    <div className="UserProfile">
        <h1> Header goes here </h1>
      <div className='row py-5'>
          <div className='col-md-3 pt-5 px-5'>
               <CustomImage src='https://images.snapwi.re/65b9/5e8869d63f5c6c4063b87ccf.w800.jpg'/>
          </div>
          <div className='col-md-5 pt-5 text-start'>
               <div className='row'>
                   <p> Username: user342 </p>
               </div>
               <div className='row'>
                   <p> Email: useremail@example.com </p>
                </div>
                <div className='row'>
                   <p> Address: Rosestraat 23, 4343AL Amsterdam </p>
                </div>
          </div>
          <div className='col-md-2 pt-5'>
            <CustomButton text='Edit Profile'/>
          </div>
      </div>
      <div className='row my-5'>
<div className='col-md-8'>
    <nav>
  <div className="nav nav-tabs" id="nav-tab" role="tablist">
    <button className="nav-link active" id="mycart-tab" data-bs-toggle="tab" data-bs-target="#mycart" type="button" role="tab" aria-controls="mycart" aria-selected="true">My Cart</button>
    <button className="nav-link" id="mybids-tab" data-bs-toggle="tab" data-bs-target="#mybids" type="button" role="tab" aria-controls="mybids" aria-selected="false">My Bids</button>
    <button className="nav-link" id="mylistings-tab" data-bs-toggle="tab" data-bs-target="#my-listings" type="button" role="tab" aria-controls="my-listings" aria-selected="false">My Listings</button>
    <button className="nav-link" id="solditems-tab" data-bs-toggle="tab" data-bs-target="#solditems" type="button" role="tab" aria-controls="solditems" aria-selected="false">Sold Items</button>
    <button className="nav-link" id="boughtitems-tab" data-bs-toggle="tab" data-bs-target="#boughtitems" type="button" role="tab" aria-controls="boughitems" aria-selected="false">My Bought Items</button>
  </div>
</nav>
<div className="tab-content my-4" id="nav-tabContent">
  <div className="tab-pane fade show active" id="mycart" role="tabpanel" aria-labelledby="mycart-tab">
  <ProductListing product={product} />
  <ProductListing product={product} />
  <ProductListing product={product} />
  </div>
  <div className="tab-pane fade" id="mybids" role="tabpanel" aria-labelledby="mybids-tab">
  <ProductListing product={product} />
  </div>
  <div className="tab-pane fade" id="mylistings" role="tabpanel" aria-labelledby="mylistings-tab">
  <ProductListing product={product} />
  </div>
</div>
</div>
      </div>
      <Footer githubUrl="https://github.com/yourprofile" email="your.email@example.com" />
    </div>
  );
};



export default UserProfile;
