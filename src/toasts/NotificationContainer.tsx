import Notification from './Notification';
import { useNavigate } from 'react-router-dom';
import useWebSocket from '../features/notification/useWebsocket';
import { RootState } from '../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-bootstrap';
import { addNotification } from '../features/notification/notificationSlice'; // Adjust the import path as needed

function NotificationWS({ user_id }: { user_id: number }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initiatingConnection = useWebSocket(user_id);
  const { notifications } = useSelector((state: RootState) => state.notifications);

  const receiveMessage = (messageData: { message: string; product_id: number | null }) => {
    dispatch(addNotification(messageData));
  };

  console.log(receiveMessage)
  const notificationClick = (productId: number) => {
    navigate(`/product/${productId.toString()}`);
  };

  return (
    <>
      <ToastContainer position='bottom-end' className='position-fixed m-4' style={{ zIndex: 1 }}>
        {notifications.map((notification, index) => (
          <Notification
            key={index}
            message={notification.message}
            onClick={() => notificationClick(notification.product_id)}
            show={true}
          />
        ))}
      </ToastContainer>
    </>
  );
}

export default NotificationWS;