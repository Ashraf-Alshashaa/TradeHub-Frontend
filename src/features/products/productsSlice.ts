import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosConfig';
import { ProductsState, Product } from './types';

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

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }: { id: number, productData: any }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/products/${id}`, productData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/products/${id}`);
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
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        const index = state.products.findIndex(product => product.id === updatedProduct.id);
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
}});

export default productSlice.reducer;
