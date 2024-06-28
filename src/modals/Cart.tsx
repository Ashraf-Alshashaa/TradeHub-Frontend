import { useState, useEffect } from 'react';
import CustomButton from '../components/button/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { fetchUser } from '../features/users/userSlice';
import ProductListing from '../components/product-listing/Product-listing';
import { Product } from '../features/products/types';
import { fetchMyCart } from '../features/products/productsSlice';


function Cart() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch<AppDispatch>();
  const { user: authUser } = useSelector((state: RootState) => state.auth);
  const { user, loading, error } = useSelector((state: RootState) => state.users);
  const { myCart } = useSelector((state: RootState) => state.products.myCart)


  const renderProducts = (products: Product[], isCart = true) => {
    if (products.length > 0) {
      return products.map(product => (
        <ProductListing key={product.id} product={product} is_cart={isCart} />
      ));
    }
    return 'No content';
  };




  useEffect(() => {
    if (authUser?.user_id) {
      dispatch(fetchUser(authUser.user_id));
      dispatch(fetchMyCart(authUser.user_id))
    }
  }, [dispatch, authUser]);

  useEffect(() => {
    
  }, [show]);

  return (
    <>
      <CustomButton text="Cart" onClick={handleShow} buttonType='primary' />

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
        {loading ? 'Loading...' : error ? error : renderProducts(myCart)}
        </Modal.Body>
        <Modal.Footer>
          <CustomButton text='Save' buttonType="primary" onClick={handleClose} />
          <CustomButton text='Close' buttonType="secondary" onClick={handleClose} />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Cart;
