import { useState, useEffect } from 'react';
import Notification from './Notification';
import { useNavigate } from 'react-router-dom';


function NotificationWS() {
    const navigate = useNavigate();

  const [messages, setMessages] = useState<string[]>([]);
  const [productID, setProductID] = useState<string>();
  let socket;

  useEffect(() => {
    socket = new WebSocket('ws://localhost:8000/ws/1');

    socket.addEventListener('open', function (event) {
      console.log('Connected to WebSocket');
    });

    // Listen for messages
    socket.addEventListener('message', function (event) {
    const data = JSON.parse(event.data);
    const userID = data.userId;
    const productID = data.productId;
    const message = data.message;
    console.log(data)
    setMessages(prevMessages => prevMessages.concat(message));
    setProductID(productID);
  
    });
    return () => {
      socket.close();
    };
  }, []);
  const notificationClick = () => navigate(`/product/${productID?.toString()}`);

    return (
      <Notification message={messages} onClick={notificationClick}/>
    )
  }

export default NotificationWS;