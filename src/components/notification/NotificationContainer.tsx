import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-bootstrap';
import { RootState } from '../../app/store';
import Notification from './Notification';


function NotificationWS({ user_id }: { user_id: number }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { notifications } = useSelector((state: RootState) => state.notifications);

    useEffect(() => {
        dispatch({ type: 'websocket/connect', payload: { userId: user_id } });

        return () => {
            dispatch({ type: 'websocket/disconnect' });
        };
    }, [dispatch, user_id]);

    const notificationClick = (productId: number) => {
        navigate(`/product/${productId.toString()}`);
    };

    return (
        <>
            <ToastContainer position='bottom-end' className='position-fixed m-4' style={{ zIndex: 999999 }}>
                {notifications.map((notification, index) => (
                    (notification.user_id === user_id &&
                        <Notification
                            key={index}
                            message={notification.message}
                            onClick={() => notificationClick(notification.product_id)}
                            show={true}
                            index={index} // Pass index prop to Notification component
                        />)
                ))}
            </ToastContainer>
        </>
    );
}

export default NotificationWS;
