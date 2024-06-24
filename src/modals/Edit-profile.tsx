import { useState, useEffect } from 'react';
import CustomButton from '../components/button/Button';
import Modal from 'react-bootstrap/Modal';
import TextInput from '../components/text-input/Text-input';
import { useDispatch } from 'react-redux';
import { useSelector} from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { fetchUser } from '../features/users/userSlice';
import { fetchDefaultAddress } from '../features/addresses/addressSlice';

function EditProfile() {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  // Fetch from backend

  const dispatch = useDispatch<AppDispatch>();
  const { user: authUser } = useSelector((state: RootState) => state.auth);
  console.log (authUser.user_id)
  const { user, loading, error } = useSelector((state: RootState) => state.users);
  const { address, loading, error} = userSelector((state: RootState) => state.addresses)

  useEffect(() => {
    if (authUser?.user_id) {
      dispatch(fetchUser(authUser.user_id));
      dispatch(fetchDefaultAddress({user_id : authUser.user_id, isDefault: true}))
    }
  }, [dispatch, authUser]);

  const defaultAddress = address && address.length > 0 ? address[0] : null;

  const existingData = {
    username: user?.username,
    email: user?.email,
    password: 'password1',
    street: defaultAddress?.street_name,
    houseNumber: defaultAddress?.house_number,
    postcode: defaultAddress?.postcode,
    city: defaultAddress?.city,
    country: defaultAddress?.country
  };

  useEffect(() => {
    // Set initial values when modal opens
    setUsername(existingData.username);
    setEmail(existingData.email);
    setPassword(existingData.password);
    setStreet(existingData.street);
    setHouseNumber(existingData.houseNumber);
    setPostcode(existingData.postcode);
    setCity(existingData.city);
    setCountry(existingData.country);
  }, [show]);

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
    // Logic to save changes (send to backend)
    console.log(`Saving changes for: 
      Username - ${username}, 
      Email - ${email}, 
      Password - ${password}, 
      Street - ${street}, 
      House Number - ${houseNumber}, 
      Postcode - ${postcode}, 
      City - ${city}, 
      Country - ${country}`);
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
                value={street}
                onChange={handleStreetChange}
                type="text"
              />
            </div>
            <div className='col-6'>
              <TextInput
                label="House Number"
                value={houseNumber}
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
