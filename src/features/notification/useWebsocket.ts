import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from './notificationSlice';

const useWebSocket = (user_id: number | null) => {
  const dispatch = useDispatch();
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost.:8000/ws/${user_id}`);

    ws.current.onopen = () => {
      console.log('WebSocket connection opened for', user_id
      );
    };

    ws.current.onmessage = (event) => {

    const data = JSON.parse(event.data);
    console.log('Received', data);
    dispatch(addNotification(data));
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [user_id, dispatch]);

  const sendMessage = (message: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    }
  };

  return sendMessage;
};

export default useWebSocket;
