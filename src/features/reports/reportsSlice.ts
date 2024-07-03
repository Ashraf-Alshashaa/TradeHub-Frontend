import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosConfig';
import { ReportsState } from './types';

const initialState: ReportsState = {
  salesPerformance: null,
  bidsPerformance: null,
  loading: false,
  error: null,
};

export const fetchSalesPerformanceReport = createAsyncThunk(
  'reports/fetchSalesPerformanceReport',
  async (period: string) => {
    const response = await axiosInstance.get(`/reports/sales?period=${period}`);
    return response.data;
  }
);

export const fetchBidsPerformanceReport = createAsyncThunk(
  'reports/fetchBidsPerformanceReport',
  async (period: string) => {
    const response = await axiosInstance.get(`/reports/bids?period=${period}`);
    return response.data;
  }
);

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesPerformanceReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalesPerformanceReport.fulfilled, (state, action) => {
        state.salesPerformance = action.payload;
        state.loading = false;
      })
      .addCase(fetchSalesPerformanceReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchBidsPerformanceReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBidsPerformanceReport.fulfilled, (state, action) => {
        state.bidsPerformance = action.payload;
        state.loading = false;
      })
      .addCase(fetchBidsPerformanceReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default reportsSlice.reducer;