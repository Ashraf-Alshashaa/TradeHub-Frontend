import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosConfig';
import { ProductsState } from './types';

const initialState: ProductsState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/products');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const fetchBoughtProducts = createAsyncThunk(
  'products/fetchBoughtProducts',
  async (buyerId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/products?buyer_id=${buyerId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);


const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchBoughtProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoughtProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchBoughtProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
