import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosConfig';
import { AddressState } from './types';

const initialState: AddressState = {
  all_addresses: [],
  address: null,
  loading: false,
  error: null,
};

export const fetchAddresses = createAsyncThunk(
  'addresses/fetchAddresses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/addresses');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

 
export const fetchDefaultAddress = createAsyncThunk(
  'addresses/fetchDefaultAddress',
  async ({ user_id, isDefault } : { user_id: string; isDefault: boolean }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/addresses', {
        params: { user_id: user_id , default: isDefault }} );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const fetchAddressById = createAsyncThunk(
  'addresses/fetchAddressById',
  async (address_id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/addresses?id=${address_id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const editAddress = createAsyncThunk(
  'addresses/editAddress',
  async (addressData: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/addresses/${addressData.id}`, addressData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);


const addressSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.all_addresses = action.payload;
        state.loading = false;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchDefaultAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDefaultAddress.fulfilled, (state, action) => {
        state.address = action.payload;
        state.loading = false;
      })
      .addCase(fetchDefaultAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAddressById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddressById.fulfilled, (state, action) => {
        state.address = action.payload;
        state.loading = false;
      })
      .addCase(fetchAddressById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(editAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        state.address = action.payload;
        state.loading = false;
      })
      .addCase(editAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
})
;

export default addressSlice.reducer;
