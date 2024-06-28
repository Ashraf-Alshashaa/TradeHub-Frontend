import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosConfig';
import { Payment, PaymentState } from './types';

const initialState: PaymentState = {
  payment: false,
  loading: false,
  error: null,
  
};

export const initiatePayment = createAsyncThunk(
  'payments/initiatePayment',
  async (productData : Payment, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put('/payments', productData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const paymentSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initiatePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initiatePayment.fulfilled, (state, action) => {
        state.payment = action.payload.min_price;
        state.loading = false;
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default paymentSlice.reducer;
