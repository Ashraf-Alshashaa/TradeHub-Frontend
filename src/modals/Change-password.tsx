import { useState } from 'react';
import CustomButton from '../components/button/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { editUser } from '../features/users/userSlice';
import { fetchDefaultAddress } from '../features/addresses/addressSlice';

function ChangePassword() {

  const dispatch = useDispatch<AppDispatch>();

  const [show, setShow] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { user: authUser } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.users);


  const handleClose = () => {
    setShow(false);
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  const handleShow = () => setShow(true);

  const handleSave = async() => {
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    if (authUser?.user_id) {
      const userData = {
        id: authUser.user_id,
        username: user?.username,
        email: user?.email,
        password, // Use the updated password state
      };
      await dispatch(editUser(userData));
      await dispatch(fetchDefaultAddress({ user_id: userData.id, isDefault: true} ))
    console.log('Password saved to database:', password);
    handleClose();
  }
};
  return (
    <>
      <CustomButton text="Change Password" buttonType='primary' onClick={handleShow}/>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group controlId="formPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword" className="mt-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <CustomButton text='Save' buttonType="primary" onClick={handleSave} />
        <CustomButton text='Close' buttonType="secondary" onClick={handleClose} />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ChangePassword;
