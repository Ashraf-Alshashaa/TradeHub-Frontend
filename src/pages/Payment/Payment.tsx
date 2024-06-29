import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { paymentStatus, selectPaymentId } from '../../features/payments/paymentSlice';

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const paymentId = useSelector(selectPaymentId);
  const location = useLocation();
  const paymentResult = location.state?.paymentResult || null;

  useEffect(() => {
    if (paymentId && paymentResult) {
      dispatch(paymentStatus({ id: paymentId, status: 'succeeded' })); // Correctly dispatch paymentStatus
      setTimeout(() => {
        navigate(-1); // Go back to the previous page
      }, 2000);
    }
  }, [dispatch, navigate, paymentId, paymentResult]);

  return (
    <div>
      {paymentResult === 'succeeded' ? (
        <h1>Payment Succeeded</h1>
      ) : paymentResult === 'failed' ? (
        <h1>Payment Failed</h1>
      ) : (
        <h1>Payment Status Unknown</h1>
      )}
    </div>
  );
};

export default Payment;
