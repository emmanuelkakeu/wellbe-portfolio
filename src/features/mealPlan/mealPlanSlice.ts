import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { mockMealPlan } from '../../mock/mealPlan.mock'
import type { MealPlan, NutritionFacts } from '../../types/domain'
import { calculateConsumedNutrition } from '../../utils/nutrition'
import { readStorage, writeStorage } from '../../utils/storage'

const consumedMealsKey = 'wellbe.consumedMeals'
const generatedPlanKey = 'wellbe.generatedMealPlan'

interface MealPlanState {
  dailyPlan: MealPlan
  loading: boolean
  error: string | null
}

function buildInitialPlan(): MealPlan {
  const generatedPlan = readStorage<MealPlan | null>(generatedPlanKey, null)
  if (generatedPlan) {
    return {
      ...generatedPlan,
      consumedNutrition: calculateConsumedNutrition(generatedPlan.meals),
    }
  }

  const storedIds = readStorage<string[]>(
    consumedMealsKey,
    mockMealPlan.meals.filter((meal) => meal.consumed).map((meal) => meal.id),
  )
  const meals = mockMealPlan.meals.map((meal) => ({
    ...meal,
    consumed: storedIds.includes(meal.id),
  }))

  return {
    ...mockMealPlan,
    meals,
    consumedNutrition: calculateConsumedNutrition(meals),
  }
}

const initialState: MealPlanState = {
  dailyPlan: buildInitialPlan(),
  loading: false,
  error: null,
}

const mealPlanSlice = createSlice({
  name: 'mealPlan',
  initialState,
  reducers: {
    setDailyMealPlan(state, action: PayloadAction<MealPlan>) {
      state.dailyPlan = action.payload
    },
    setGeneratedMealPlan(state, action: PayloadAction<MealPlan>) {
      state.dailyPlan = {
        ...action.payload,
        consumedNutrition: calculateConsumedNutrition(action.payload.meals),
      }
      writeStorage(generatedPlanKey, state.dailyPlan)
      writeStorage(consumedMealsKey, [])
    },
    consumeMealById(state, action: PayloadAction<string>) {
      const meal = state.dailyPlan.meals.find((item) => item.id === action.payload)

      if (!meal || meal.consumed) {
        return
      }

      meal.consumed = true
      state.dailyPlan.consumedNutrition = calculateConsumedNutrition(
        state.dailyPlan.meals,
      )
      writeStorage(
        consumedMealsKey,
        state.dailyPlan.meals
          .filter((item) => item.consumed)
          .map((item) => item.id),
      )
    },
    resetMealConsumption(state) {
      state.dailyPlan.meals = state.dailyPlan.meals.map((meal) => ({
        ...meal,
        consumed: false,
      }))
      state.dailyPlan.consumedNutrition = calculateConsumedNutrition(
        state.dailyPlan.meals,
      )
      writeStorage(consumedMealsKey, [])
    },
    updateConsumedNutrition(state, action: PayloadAction<NutritionFacts>) {
      state.dailyPlan.consumedNutrition = action.payload
    },
  },
})

export const {
  setDailyMealPlan,
  setGeneratedMealPlan,
  consumeMealById,
  resetMealConsumption,
  updateConsumedNutrition,
} = mealPlanSlice.actions
export default mealPlanSlice.reducer
