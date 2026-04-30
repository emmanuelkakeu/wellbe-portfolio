import type { RootState } from '../../app/store'

export const selectDailyPlan = (state: RootState) => state.mealPlan.dailyPlan
export const selectMeals = (state: RootState) => state.mealPlan.dailyPlan.meals
export const selectDailyGoal = (state: RootState) =>
  state.mealPlan.dailyPlan.dailyGoal
export const selectConsumedNutrition = (state: RootState) =>
  state.mealPlan.dailyPlan.consumedNutrition
