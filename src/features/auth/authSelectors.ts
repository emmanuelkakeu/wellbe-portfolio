import type { RootState } from '../../app/store'

export const selectAuthStatus = (state: RootState) => state.auth.status
export const selectAuthMode = (state: RootState) => state.auth.mode
export const selectOnboardingProfile = (state: RootState) => state.auth.profile
export const selectHasNutritionPlan = (state: RootState) =>
  state.auth.hasNutritionPlan
