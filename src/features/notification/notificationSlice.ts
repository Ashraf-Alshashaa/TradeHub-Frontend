import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    updateData: (state, action) => action.payload,
  },
});

export const { updateData } = notificationSlice.actions;
export default notificationSlice.reducer;