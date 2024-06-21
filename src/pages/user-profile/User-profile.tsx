import React from 'react';
import { Product } from '../../components/product-listing/types';
import Footer from '../../components/footer/Footer';
import EditProfile from '../../modals/Edit-profile';
import ProfileTab from './Tab';
import Header from '../../components/header/Header';
import Avatar, { genConfig } from 'react-nice-avatar';



const product: Product = {
  image: 'https://cdn.pixabay.com/photo/2019/12/29/08/37/women-4726513_640.jpg',
  name: 'Product name',
  price: '$XX.YY',
};


const existingData = {
  username: "user1",
  email: "user1@example.com",
  password: "password1",
  street: "example street",
  houseNumber: "123",
  postcode: "1234AL",
  city: "somewhere",
  country: "The Netherlands"
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
                   <p> Username: {existingData.username} </p>
               </div>
               <div className='row'>
                   <p> Email: {existingData.email} </p>
                </div>
                <div className='row'>
                   <p> Address: </p>
                    <p>{existingData.street} {existingData.houseNumber}, {existingData.postcode}, {existingData.city}, {existingData.country} </p>
                </div>
          </div>
          <div className='col-2 pt-5'>
            <EditProfile />
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