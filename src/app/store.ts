// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/products/productsSlice';
import userReducer from '../features/users/userSlice';
import bidReducer from '../features/bids/bidSlice';
import addressReducer from '../features/addresses/addressSlice';
import priceRangeReducer from '../features/pricerange/priceRangeSlice';
import categoryReducer from '../features/categories/categorySlice';
import paymentReducer from '../features/payments/paymentSlice';
import notificationReducer from '../features/notification/notificationSlice';
import websocketMiddleware from '../features/websocket/websocket';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    users: userReducer,
    bids: bidReducer,
    pricerange: priceRangeReducer,
    addresses: addressReducer,
    categories: categoryReducer,
    payments: paymentReducer,
    notifications: notificationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(websocketMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
