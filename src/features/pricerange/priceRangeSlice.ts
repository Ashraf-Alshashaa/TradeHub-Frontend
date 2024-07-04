import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosConfig';
import { PriceRangeState } from './types';

const initialState: PriceRangeState = {
  min_price: 0,
  max_price: 4000,
  loading: false,
  error: null,
  
};

export const fetchPriceRange = createAsyncThunk(
  'products/fetchPriceRange',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/products/price-range');
      return { min_price: response.data.min_price, max_price: response.data.max_price};
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const priceRangeSlice = createSlice({
  name: 'pricerange',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPriceRange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPriceRange.fulfilled, (state, action) => {
        state.min_price = action.payload.min_price;
        state.max_price = action.payload.max_price;
        state.loading = false;
      })
      .addCase(fetchPriceRange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default priceRangeSlice.reducer;
