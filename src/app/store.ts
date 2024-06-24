import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/products/productsSlice';
import userReducer from '../features/users/userSlice';
import addressReducer from '../features/addresses/addressSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    users: userReducer,
    addresses: addressReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
