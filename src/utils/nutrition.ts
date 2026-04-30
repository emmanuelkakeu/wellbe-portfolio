import type { Meal, NutritionFacts } from '../types/domain'

export const emptyNutrition: NutritionFacts = {
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
}

export function addNutrition(
  current: NutritionFacts,
  next: NutritionFacts,
): NutritionFacts {
  return {
    calories: current.calories + next.calories,
    protein: current.protein + next.protein,
    carbs: current.carbs + next.carbs,
    fat: current.fat + next.fat,
  }
}

export function calculateConsumedNutrition(meals: Meal[]): NutritionFacts {
  return meals
    .filter((meal) => meal.consumed)
    .reduce((total, meal) => addNutrition(total, meal.nutrition), emptyNutrition)
}

export function getProgressValue(value: number, goal: number) {
  if (goal <= 0) {
    return 0
  }

  return Math.min(Math.round((value / goal) * 100), 100)
}

export function getMealTypeLabel(type: Meal['type']) {
  const labels: Record<Meal['type'], string> = {
    breakfast: 'Petit-dejeuner',
    lunch: 'Dejeuner',
    snack: 'Collation',
    dinner: 'Diner',
  }

  return labels[type]
}
