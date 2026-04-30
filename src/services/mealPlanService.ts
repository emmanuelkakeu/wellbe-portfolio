import { mockMealPlan } from '../mock/mealPlan.mock'
import type { MealPlan } from '../types/domain'
import { wait } from './wait'

export async function getDailyMealPlan(): Promise<MealPlan> {
  await wait()
  return mockMealPlan
}

export async function consumeMeal(mealId: string): Promise<{ mealId: string }> {
  await wait(250)
  return { mealId }
}
