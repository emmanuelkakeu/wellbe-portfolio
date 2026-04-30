import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface AppNotification {
  id: string
  title: string
  message: string
  tone: 'success' | 'info' | 'warning'
}

interface NotificationState {
  items: AppNotification[]
}

const initialState: NotificationState = {
  items: [],
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    pushNotification(state, action: PayloadAction<Omit<AppNotification, 'id'>>) {
      state.items.unshift({
        id: `notification-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        ...action.payload,
      })
      state.items = state.items.slice(0, 4)
    },
    removeNotification(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    clearNotifications(state) {
      state.items = []
    },
  },
})

export const { pushNotification, removeNotification, clearNotifications } =
  notificationSlice.actions
export default notificationSlice.reducer
