import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { fetchUser } from '../../features/users/userSlice';
import { fetchAddressById, fetchDefaultAddress } from '../../features/addresses/addressSlice';
import Footer from '../../components/footer/Footer';
import EditProfile from '../../modals/Edit-profile';
import ProfileTab from './Tab';
import Header from '../../components/header/Header';
import Avatar, { genConfig } from 'react-nice-avatar';

const UserProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user: authUser, loading, error } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.users);
  const { address } = useSelector((state: RootState) => state.addresses);

  useEffect(() => {
    if (authUser?.user_id) {
      dispatch(fetchUser(authUser.user_id));
    }
  }, [dispatch, address, authUser]);

  const config = user ? genConfig(user.username) : genConfig("default");
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div className="UserProfile">
      <Header />
      <div className='row py-5'>
        <div className='col-3 pt-5 px-5 ml-5'>
          <Avatar style={{ width: '13rem', height: '10rem' }} shape='rounded' {...config} />
        </div>
        <div className='col-5 pt-5 text-start'>
          <div className='row'>
            <p> Username: {user?.username || 'Loading...'} </p>
          </div>
          <div className='row'>
            <p> Email: {user?.email || 'Loading...'} </p>
          </div>
          <div className='row'>
            <p> Address: &nbsp;&nbsp;
              {user?.address?.street_name}&nbsp;&nbsp; 
              {user?.address?.house_number}, &nbsp;&nbsp;
              {user?.address?.postcode}, &nbsp;&nbsp;
              {user?.address?.city}, &nbsp;&nbsp;
              {user?.address?.country}</p>
          </div>
        </div>
        <div className='col-2 pt-5'>
          <EditProfile />
        </div>
      </div>
      <div className='row my-5'>
        <div className='col-8'>
          <ProfileTab />
        </div>
      </div>
      <Footer githubUrl="https://github.com/yourprofile" email="your.email@example.com" />
    </div>
  );
};

export default UserProfile;
