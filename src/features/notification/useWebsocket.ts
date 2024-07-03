// useWebSocket.ts
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateData } from './notificationSlice';

const useWebSocket = (url: string) => {
  const dispatch = useDispatch();
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.current.onmessage = (event) => {

    const data = JSON.parse(event.data);
    console.log('Received', data);
    dispatch(updateData(data));
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [url, dispatch]);

  const sendMessage = (message: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    }
  };

  return sendMessage;
};

export default useWebSocket;
