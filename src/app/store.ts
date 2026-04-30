import { configureStore } from '@reduxjs/toolkit'
import activityReducer from '../features/activities/activitySlice'
import authReducer from '../features/auth/authSlice'
import mealPlanReducer from '../features/mealPlan/mealPlanSlice'
import notificationReducer from '../features/notifications/notificationSlice'
import preferenceReducer from '../features/preferences/preferenceSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    mealPlan: mealPlanReducer,
    activities: activityReducer,
    preferences: preferenceReducer,
    notifications: notificationReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
