import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  notifications: { message: string; product_id: number | null }[];
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<{ message: string; productId: number | null }>) => {
      state.notifications.push({
        message: action.payload.message,
        product_id: action.payload.productId,
      });
    },
  },
});

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
