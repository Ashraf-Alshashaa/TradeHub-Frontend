import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosConfig';
import { BidState, Bid } from './types';



const initialState: BidState = {
  bids: [],
  loading: false,
  error: null,
};

export const sendBidData = createAsyncThunk(
  'bids/sendBidData',
  async (bidData: Bid, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post('/bids', bidData);
      dispatch(fetchAllBids(bidData.product_id));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data ?? error.message);
    }
  }
);

export const fetchAllBids = createAsyncThunk(
  'bids/fetchAllBids',
  async (productId: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/bids?product_id=${productId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data ?? error.message);
    }
  }
);

const bidSlice = createSlice({
  name: 'bids',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendBidData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendBidData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendBidData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllBids.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBids.fulfilled, (state, action) => {
        state.bids = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllBids.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bidSlice.reducer;
