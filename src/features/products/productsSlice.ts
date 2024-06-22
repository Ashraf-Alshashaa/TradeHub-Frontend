import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosConfig';
import { ProductsState } from './types';
import { FaFlagCheckered } from 'react-icons/fa';

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

export const fetchMyCart = createAsyncThunk(
  'products/fetchMyCart',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/products?products?cart%20of%20the%20user=${userId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchMyBids = createAsyncThunk(
  'products/fetchMyBids',
  async (bidderId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/products?bidder_id=${bidderId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const fetchSoldItems = createAsyncThunk(
  'products/fetchSoldItems',
  async ({ sellerId, flag }: { sellerId: string; flag: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/products?seller_id=${sellerId}&sold=${flag}`);
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
      })
      .addCase(fetchMyBids.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyBids.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchMyBids.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMyCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyCart.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchMyCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSoldItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSoldItems.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchSoldItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
})
;

export default productSlice.reducer;
