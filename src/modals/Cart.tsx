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


function Cart() {
  const [show, setShow] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch<AppDispatch>();
  const { user: authUser } = useSelector((state: RootState) => state.auth);
  const { myCart, loading, error } = useSelector((state: RootState) => state.products)
  const { payment } = useSelector((state:RootState) => state.payments )


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
    if (authUser?.user_id) {
      dispatch(fetchUser(authUser.user_id));
      dispatch(fetchMyCart(authUser.user_id));
    }
  }, [dispatch, authUser]);

  const handlePay = (productIds: number[]) => {
    dispatch(initiatePayment(
      {
        product_ids : productIds,
        currency: 'eur',
        user_id: authUser.user_id,
      }));
      console.log( {
        product_ids : productIds,
        currency: 'eur',
        user_id: authUser.user_id,
      })
    handleClose();
  };
  

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
