import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/products/productsSlice';
import userReducer from '../features/users/userSlice';
import bidReduser from '../features/bids/bidSlice'
import addressReducer from '../features/addresses/addressSlice'
import priceRangeReducer from '../features/pricerange/priceRangeSlice';
import categoryReducer from '../features/categories/categorySlice';
import paymentReducer from '../features/payments/paymentSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    users: userReducer,
    bids: bidReduser,
    pricerange: priceRangeReducer,
    addresses: addressReducer,
    categories: categoryReducer,
    payments: paymentReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
