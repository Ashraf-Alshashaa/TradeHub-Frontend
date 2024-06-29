import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosConfig';
import { Payment, PaymentState } from './types';
import { RootState } from '../../app/store';

const initialState: PaymentState = {
  paymentId: '',
  payment: null,
  loading: false,
  error: null,
};

export const initiatePayment = createAsyncThunk(
  'payments/initiatePayment',
  async (paymentData: Payment, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/payments', paymentData);
      console.log(response.data)
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const paymentStatus = createAsyncThunk(
  'payments/paymentStatus',
  async ({ id, status }: { id: string | null; status: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/payments/${id}`, { status: status });
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
        state.payment = action.payload;
        state.paymentId = action.payload.payment_id;
        state.loading = false;
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(paymentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(paymentStatus.fulfilled, (state, action) => {
        state.payment = action.payload;
        state.paymentId = null;
        state.loading = false;
      })
      .addCase(paymentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});


export const selectPaymentId = (state: RootState) => state.payments.paymentId;
export default paymentSlice.reducer;
