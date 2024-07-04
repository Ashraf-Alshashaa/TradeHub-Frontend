import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  notifications: { message: string; product_id: number | null, user_id: number | string | null }[];
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<{ message: string; productId: number | null, userId: number | string | null }>) => {
      state.notifications.push({
        message: action.payload.message,
        product_id: action.payload.productId,
        user_id: action.payload.userId,
      });
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      state.notifications.splice(action.payload, 1);
    },
  },
});

export const { addNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
