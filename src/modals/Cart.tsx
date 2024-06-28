import { useState, useEffect } from 'react';
import CustomButton from '../components/button/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { fetchUser } from '../features/users/userSlice';
import ProductListing from '../components/product-listing/Product-listing';
import { Product } from '../features/products/types';
import { fetchMyCart } from '../features/products/productsSlice';
import Icon from '../components/icon/Icon';


function Cart() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch<AppDispatch>();
  const { user: authUser } = useSelector((state: RootState) => state.auth);
  const { myCart, loading, error } = useSelector((state: RootState) => state.products)


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


  return (
    <>
      <Icon name="shopping_cart" onclick={handleShow} />

      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {loading ? 'Loading...' : error ? error : renderProducts(myCart)}
        <div className='row my-3'>
            <div className='col-4'>
                <h5> Total price: </h5>
            </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <CustomButton text='Pay' buttonType="primary" onClick={handleClose} />
          <CustomButton text='Close' buttonType="secondary" onClick={handleClose} />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Cart;
