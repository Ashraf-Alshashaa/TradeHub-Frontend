import { useState, useEffect } from 'react';
import CustomButton from '../components/button/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { fetchUser } from '../features/users/userSlice';
import ProductListing from '../components/product-listing/Product-listing';
import { Product } from '../features/products/types';
import { fetchMyCart } from '../features/products/productsSlice';
import { initiatePayment } from '../features/payments/paymentSlice';
import Icon from '../components/icon/Icon';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [show, setShow] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handleClose = () => {
    setShow(false);
    setSelectedProducts([]);
    setTotalPrice(0);
  };
  
  const handleShow = () => setShow(true);
  const dispatch = useDispatch<AppDispatch>();
  const { user: authUser } = useSelector((state: RootState) => state.auth);
  const { myCart, loading, error } = useSelector((state: RootState) => state.products);
  const navigate = useNavigate();
  

  

  const handleCheckbox = (productId: number) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        // If the product is already selected, remove it from the list
        return prevSelected.filter(id => id !== productId);
      } else {
        // If the product is not selected, add it to the list
        return [...prevSelected, productId];
      }
    });
}

useEffect(() => {
  const newTotalPrice = myCart.filter(product => selectedProducts.includes(product.id))
    .reduce((total, product) => total + product.price, 0);
  setTotalPrice(newTotalPrice);
}, [selectedProducts, myCart]);


  const renderProducts = (products: Product[], isCart = true) => {
    if (products.length > 0) {
      return products.map(product => (
        <ProductListing key={product.id} product={product} is_cart={isCart} handleCheckbox={handleCheckbox} />
      ));
    }
    return 'No content'; }


    useEffect(() => {
      if (!show && authUser?.user_id) {
        dispatch(fetchMyCart(authUser.user_id));
      }
    }, [show, dispatch, authUser]);
  
    const handlePay = (productIds: number[]) => {
      if (productIds.length > 0) {
        const paymentRequest = {
          product_ids: productIds,
          currency: 'eur',
          user_id: authUser.user_id,
        };
  
        const randomStatus = Math.random() < 0.8 ? "succeeded" : "failed";
        if (randomStatus === 'succeeded') {
          dispatch(initiatePayment(paymentRequest));
        }
        navigate('/payment', { state: { paymentResult: randomStatus } });
      }  
      handleClose();
    };


  return (
    <>
    
    <div style={{position: 'relative',display: 'inline-block'}}>
      <Icon name="shopping_cart" onclick={handleShow} />
      {myCart.length > 0 && <div style={{
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    width: '10px',
    height: '10px',
    backgroundColor: 'red',
    borderRadius: '50%'
  }}></div>}
      </div>

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
                <h5> Total price: €{totalPrice} </h5>
            </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <CustomButton text='Pay' buttonType="primary" onClick={() => handlePay(selectedProducts)} />
          <CustomButton text='Close' buttonType="secondary" onClick={handleClose} />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Cart;
