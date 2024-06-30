import { useState, useEffect } from 'react';
import Notification from './Notification';


function NotificationWS() {
  
  const [message, setMessage] = useState<string>();
  let socket;

  useEffect(() => {
    socket = new WebSocket('ws://localhost:8000/ws/1');

    socket.addEventListener('open', function (event) {
      console.log('Connected to WebSocket');
    });

    // Listen for messages
    socket.addEventListener('message', function (event) {
    const data = JSON.parse(event.data);
    const userID = data.userID;
    const productID = data.productID;
    const message = data.message;
    console.log(data)
      setMessage(message);
    });

    return () => {
      socket.close();
    };
  }, []);

    return (
      <Notification message={message}/>
    )
  }

export default NotificationWS;