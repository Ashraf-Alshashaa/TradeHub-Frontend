import { useState, useEffect } from 'react';
import CustomButton from '../components/button/Button';
import Modal from 'react-bootstrap/Modal';
import TextInput from '../components/text-input/Text-input';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { editUser, fetchUser } from '../features/users/userSlice';
import { editAddress } from '../features/addresses/addressSlice';

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


  const dispatch = useDispatch<AppDispatch>();
  const { user: authUser } = useSelector((state: RootState) => state.auth);
  const { user, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (authUser?.user_id) {
      dispatch(fetchUser(authUser.user_id));
    }
  }, [dispatch, authUser]);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setPassword('password');  // Or you can set it to existing password or keep it blank for security
      if (user.address) {
        setStreet(user.address.street_name);
        setHouseNumber(user.address.house_number);
        setPostcode(user.address.postcode);
        setCity(user.address.city);
        setCountry(user.address.country);
      }
    }
  }, [user, user?.address,  show]);

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

  const handleSave = async() => {
    if (!username || !email || !password) {
      alert("Username, email, and password fields are required.");
      return;
    }
    if (authUser?.user_id) {
      const userData = {
        id: authUser.user_id,
        username,
        email,
        password,
      };
      const addressData = {
        street_name,
        city,
        country,
        postcode,
        house_number,
        user_id: user?.id,
        default: true
      };

      await dispatch(editUser(userData));
      if (user?.address?.id) {
        await dispatch(editAddress({ addressData, id: user.address.id }));
      }
      dispatch(fetchUser(authUser.user_id)); // Refetch user data to update the profile
    }
    handleClose();
  };

  return (
    <>
      <CustomButton text="Edit Profile" onClick={handleShow} buttonType='secondary' />

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
          <CustomButton text='Save' buttonType="primary" onClick={handleSave} />
          <CustomButton text='Close' buttonType="secondary" onClick={handleClose} />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProfile;
