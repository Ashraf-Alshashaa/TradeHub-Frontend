import { addNotification } from "../notification/notificationSlice";

const websocketMiddleware = storeAPI => {
  let socket = null;

  return next => action => {
    switch (action.type) {
      case 'websocket/connect':
        if (socket !== null) {
          socket.close();
        }

        socket = new WebSocket(`ws://localhost:8000/ws/${action.payload.userId}`);

        socket.onopen = () => {
          console.log('WebSocket connection opened');
        };

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          storeAPI.dispatch(addNotification(data));
        };

        socket.onerror = (error) => {
          console.error('WebSocket error', error);
        };

        socket.onclose = () => {
          console.log('WebSocket connection closed');
        };

        break;

      case 'websocket/disconnect':
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        break;

      case 'websocket/sendMessage':
        if (socket !== null && socket.readyState === WebSocket.OPEN) {
          socket.send(action.payload.message);
        }
        break;

      default:
        break;
    }

    return next(action);
  };
};

export default websocketMiddleware;
