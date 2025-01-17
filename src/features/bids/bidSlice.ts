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
      const bids = response.data;

      const bidsWithUserPromises = bids.map(async (bid: Bid) => {
        const userResponse = await axiosInstance.get(`/users?id=${bid.bidder_id}`);
        const username = userResponse.data.username;
        return { ...bid, username };
      });

      const bidsWithUser = await Promise.all(bidsWithUserPromises);
      return bidsWithUser;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const chooseBuyer = createAsyncThunk(
  'bids/chooseBuyer',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/bids/${id}`);
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
        state.error = action.payload as BidState["error"];
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
        state.error = action.payload as BidState["error"];
      });
  },
});

export default bidSlice.reducer;
