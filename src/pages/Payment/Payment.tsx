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
    if (paymentId && paymentResult === 'succeeded') {
      dispatch(paymentStatus({ id: paymentId, status: paymentResult }));
    }
    setTimeout(() => {
        navigate('/products');
      }, 2000);
  }, [dispatch, navigate, paymentId, paymentResult]);

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
        <div className="rounded p-4 bg-secondary text-center">
          <h1 className="fw-bold text-white">Payment Status Unknown</h1>
        </div>
      )}
    </div>
  );
};

export default Payment;
