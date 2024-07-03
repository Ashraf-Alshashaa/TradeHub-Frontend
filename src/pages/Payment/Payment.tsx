import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { paymentStatus, selectPaymentId } from '../../features/payments/paymentSlice';
import { fetchMyCart } from '../../features/products/productsSlice';


const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const paymentId = useSelector(selectPaymentId);
  const location = useLocation();
  const paymentResult = location.state?.paymentResult || null;
  const localStorageUser = localStorage.getItem("user");
  const user_id = localStorageUser ? JSON.parse(localStorageUser).user_id : null;

  useEffect(() => {
    if (paymentId && paymentResult === 'succeeded') {
      dispatch(paymentStatus({ id: paymentId, status: paymentResult }));
      dispatch(fetchMyCart(user_id));
    }
    setTimeout(() => {
        navigate('/products');
      }, 2000);
  }, [dispatch, navigate, paymentId, paymentResult, user_id]);

  return (
<div className="d-flex justify-content-center align-items-center vh-100">
      {paymentResult === 'succeeded' ? (
        <div className="rounded p-4 border border-success alert alert-success text-center">
          <h3 className='p-5'>Payment Succeeded</h3>
        </div>
      ) : paymentResult === 'failed' ? (
        <div className="rounded p-4 border border-danger alert alert-danger text-center">
          <h3 className='p-5'>Payment Failed</h3>
        </div>
      ) : (
        <div className="rounded p-4 border border-dark alert alert-dark text-center">
          <h3 className='p-5'>Payment Status Unknown</h3>
        </div>
      )}
    </div>
  );
};

export default Payment;
