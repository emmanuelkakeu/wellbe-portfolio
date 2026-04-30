import type { RootState } from '../../app/store'

export const selectActivities = (state: RootState) => state.activities.activities
export const selectCompletedActivities = (state: RootState) =>
  state.activities.activities.filter((activity) => activity.completed)
export const selectPlannedActivities = (state: RootState) =>
  state.activities.activities.filter((activity) => !activity.completed)
