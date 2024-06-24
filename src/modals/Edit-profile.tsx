import { useState, useEffect } from 'react';
import CustomButton from '../components/button/Button';
import Modal from 'react-bootstrap/Modal';
import TextInput from '../components/text-input/Text-input';
import { useDispatch } from 'react-redux';
import { useSelector} from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { editUser, fetchUser } from '../features/users/userSlice';
import { editAddress, fetchDefaultAddress } from '../features/addresses/addressSlice';

function EditProfile() {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [street_name, setStreet] = useState("");
  const [house_number, setHouseNumber] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  // Fetch from backend

  const dispatch = useDispatch<AppDispatch>();
  const { user: authUser } = useSelector((state: RootState) => state.auth);
  const { user, loading, error } = useSelector((state: RootState) => state.users);
  const { address } = useSelector((state: RootState) => state.addresses)

  const defaultAddress = address && address.length > 0 ? address[0] : null;

  useEffect(() => {
    if (authUser?.user_id) {
      dispatch(fetchUser(authUser.user_id));
      dispatch(fetchDefaultAddress({user_id : authUser.user_id, isDefault: true}));
      dispatch(editUser(authUser.user_id));
      dispatch(editAddress(defaultAddress.id))
    }
  }, [dispatch, authUser]);


  useEffect(() => {
    if (user && defaultAddress) {
      setUsername(user.username);
      setEmail(user.email);
      setPassword('password');  // Or you can set it to existing password or keep it blank for security
      setStreet(defaultAddress.street_name);
      setHouseNumber(defaultAddress.house_number);
      setPostcode(defaultAddress.postcode);
      setCity(defaultAddress.city);
      setCountry(defaultAddress.country);
    }
  }, [user, defaultAddress, show]);

  const handleEmailChange = (value) => setEmail(value);
  const handlePasswordChange = (value) => setPassword(value);
  const handleUsernameChange = (value) => setUsername(value);
  const handleStreetChange = (value) => setStreet(value);
  const handleHouseNumberChange = (value) => setHouseNumber(value);
  const handlePostcodeChange = (value) => setPostcode(value);
  const handleCityChange = (value) => setCity(value);
  const handleCountryChange = (value) => setCountry(value);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = () => {
    if (authUser?.user_id && defaultAddress) {
      const userData = {
        id: authUser.user_id,
        username,
        email,
        password,
      };
      const addressData = {
        ...defaultAddress,
        street_name: street_name,
        house_number: house_number,
        postcode,
        city,
        country,
      };
  
      dispatch(editUser(userData));
      dispatch(editAddress(addressData));
    }
    handleClose();
  };
  

  return (
    <>
      <CustomButton text="Edit Profile" onClick={handleShow} buttonType='secondary'/>

      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            {/* Personal Information Section */}
            <div className='col-12'>
              <h5>Personal Information</h5>
            </div>
            <div className='col-6'>
              <TextInput
                label="Username"
                value={username}
                onChange={handleUsernameChange}
                type="text"
              />
            </div>
            <div className='col-6'>
              <TextInput
                label="Email"
                value={email}
                onChange={handleEmailChange}
                type="email"
              />
            </div>
            <div className='col-6'>
              <TextInput
                label="Password"
                value={password}
                onChange={handlePasswordChange}
                type="password"
              />
            </div>

            {/* Address Section */}
            <div className='col-12 mt-4'>
              <h5>Address</h5>
            </div>
            <div className='col-6'>
              <TextInput
                label="Street"
                value={street_name}
                onChange={handleStreetChange}
                type="text"
              />
            </div>
            <div className='col-6'>
              <TextInput
                label="House Number"
                value={house_number}
                onChange={handleHouseNumberChange}
                type="text"
              />
            </div>
            <div className='col-6'>
              <TextInput
                label="Postcode"
                value={postcode}
                onChange={handlePostcodeChange}
                type="text"
              />
            </div>
            <div className='col-6'>
              <TextInput
                label="City"
                value={city}
                onChange={handleCityChange}
                type="text"
              />
            </div>
            <div className='col-12'>
              <TextInput
                label="Country"
                value={country}
                onChange={handleCountryChange}
                type="text"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <CustomButton text='Save' buttonType="primary" onClick={handleSave}/>
          <CustomButton text='Close' buttonType="secondary" onClick={handleClose}/>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProfile;
