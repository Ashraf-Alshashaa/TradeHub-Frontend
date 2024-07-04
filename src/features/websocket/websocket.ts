import { addNotification } from "../notification/notificationSlice";
import { MiddlewareAPI, Dispatch, AnyAction } from 'redux';


type StoreAPI = MiddlewareAPI<Dispatch<AnyAction>, RootState>;

type MiddlewareFunction = (storeAPI: StoreAPI) => (next: Dispatch<AnyAction>) => (action) => any;

const websocketMiddleware: MiddlewareFunction = storeAPI => {
  let socket : WebSocket|null = null;

  return next => action => {
    switch (action.type) {
      case 'websocket/connect':

        socket = new WebSocket(`ws://localhost:8000/ws/${action.payload.userId}`);

        socket.onopen = () => {
        };

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          storeAPI.dispatch(addNotification(data));
        };

        socket.onerror = (error) => {
          console.error('WebSocket error', error);
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
