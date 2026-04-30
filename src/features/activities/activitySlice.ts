import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { mockActivities } from '../../mock/activities.mock'
import type { Activity } from '../../types/domain'
import { readStorage, writeStorage } from '../../utils/storage'

const activitiesKey = 'wellbe.activities'

interface ActivityState {
  activities: Activity[]
  loading: boolean
  error: string | null
}

const initialState: ActivityState = {
  activities: readStorage<Activity[]>(activitiesKey, mockActivities),
  loading: false,
  error: null,
}

function persist(activities: Activity[]) {
  writeStorage(activitiesKey, activities)
}

const activitySlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    addActivity(state, action: PayloadAction<Activity>) {
      state.activities.push(action.payload)
      persist(state.activities)
    },
    completeActivity(state, action: PayloadAction<string>) {
      const activity = state.activities.find((item) => item.id === action.payload)
      if (activity) {
        activity.completed = true
      }
      persist(state.activities)
    },
    removeActivity(state, action: PayloadAction<string>) {
      state.activities = state.activities.filter(
        (activity) => activity.id !== action.payload,
      )
      persist(state.activities)
    },
    updateActivity(state, action: PayloadAction<Activity>) {
      state.activities = state.activities.map((activity) =>
        activity.id === action.payload.id ? action.payload : activity,
      )
      persist(state.activities)
    },
  },
})

export const { addActivity, completeActivity, removeActivity, updateActivity } =
  activitySlice.actions
export default activitySlice.reducer
