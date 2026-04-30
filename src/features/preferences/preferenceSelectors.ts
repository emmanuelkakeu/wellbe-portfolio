import type { RootState } from '../../app/store'

export const selectPreferences = (state: RootState) =>
  state.preferences.preferences
export const selectEnabledPreferences = (state: RootState) =>
  state.preferences.preferences.filter((preference) => preference.enabled)
