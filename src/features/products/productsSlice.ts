import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosConfig';
import { ProductsState, Product } from './types';

const initialState: ProductsState = {
  products: [],
  myCart : [],
  myBids : [],
  boughtProducts : [],
  soldProducts : [],
  myListings: [],
  product: null,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ min_price, max_price, category_id, search_str }: { min_price?: number; max_price?: number; category_id?: number; search_str?: string;}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/products', {
        params: {
          min_price,
          max_price,
          category_id,
          search_str,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
  
export const fetchBoughtProducts = createAsyncThunk(
  'products/fetchBoughtProducts',
  async (buyer_id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/products?buyer_id=${buyer_id}`);
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

export const fetchMyCart = createAsyncThunk(
  'products/fetchMyCart',
  async (user_id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/products?user_id=${user_id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchMyBids = createAsyncThunk(
  'products/fetchMyBids',
  async (bidder_id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/products?bidder_id=${bidder_id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const fetchSoldProducts = createAsyncThunk(
  'products/fetchSoldProducts',
  async ({ seller_id, sold }: { seller_id: string; sold: boolean }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/products', {
        params: { seller_id , sold }} );
      return { data: response.data, sold };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/products', productData);
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
      // Handle fetchProductById states
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
      })
      .addCase(fetchBoughtProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoughtProducts.fulfilled, (state, action) => {
        state.boughtProducts = action.payload;
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
        state.myBids = action.payload;
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
        state.myCart = action.payload;
        state.loading = false;
      })
      .addCase(fetchMyCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSoldProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSoldProducts.fulfilled, (state, action) => {
        const { data, sold } = action.payload;
      if (sold) {
        state.soldProducts = data;
      } else {
        state.myListings = data;
      }
      state.loading = false;
    })
      .addCase(fetchSoldProducts.rejected, (state, action) => {
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
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.loading = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
}});

export default productSlice.reducer;
