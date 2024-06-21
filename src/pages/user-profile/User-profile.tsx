import React from 'react';
import { Product } from '../../components/product-listing/types';
import Footer from '../../components/footer/Footer';
import CustomButton from '../../components/button/Button';
import ProfileTab from './Tab';
import Header from '../../components/header/Header';
import Avatar, { genConfig } from 'react-nice-avatar';



const product: Product = {
  image: 'https://cdn.pixabay.com/photo/2019/12/29/08/37/women-4726513_640.jpg',
  name: 'Product name',
  price: '$XX.YY',
};

const Click = () => {
  console.log("Edit button clicked!");
};


const UserProfile: React.FC = () => {

  const config = genConfig() 
    
  return (
    <div className="UserProfile">
        <Header/>
      <div className='row py-5'>
          <div className='col-3 pt-5 px-5 ml-5'>
          <Avatar style={{ width: '13rem', height: '10rem' }} shape='rounded' {...config} />
          </div>
          <div className='col-5 pt-5 text-start'>
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
          <div className='col-2 pt-5'>
            <CustomButton onClick={Click} text='Edit Profile'/>
          </div>
      </div>
      <div className='row my-5'>
<div className='col-8'>
    <ProfileTab/>
</div>
      </div>
      <Footer githubUrl="https://github.com/yourprofile" email="your.email@example.com" />
    </div>
  );
};



export default UserProfile;
