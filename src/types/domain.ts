export interface User {
  id: string
  firstName: string
  lastName?: string
  age: number
  avatarUrl?: string
  goal: 'lose_weight' | 'maintain' | 'gain_muscle' | 'healthy_lifestyle'
  activityLevel: 'low' | 'moderate' | 'high'
  preferences: Preference[]
}

export interface OnboardingProfile {
  firstName: string
  lastName: string
  email: string
  goal: User['goal']
  activityLevel: 'low' | 'moderate' | 'high'
  gender: 'woman' | 'man' | 'other'
  birthDate: string
  heightCm: number
  currentWeightKg: number
  targetWeightKg: number
  preferredMeals: string[]
  avoidIngredients: string[]
}

export interface PlannedDayInput {
  date: string
  activities: Activity[]
  mealWishes: string[]
  notes: string
}

export interface MealPlan {
  id: string
  date: string
  userId: string
  dailyGoal: DailyGoal
  meals: Meal[]
  consumedNutrition: NutritionFacts
}

export interface Meal {
  id: string
  type: 'breakfast' | 'lunch' | 'snack' | 'dinner'
  title: string
  recommendedTime: string
  recipe: Recipe
  nutrition: NutritionFacts
  consumed: boolean
}

export interface Recipe {
  id: string
  title: string
  description: string
  imageUrl?: string
  ingredients: Ingredient[]
  steps: string[]
  tags: string[]
}

export interface Ingredient {
  id: string
  name: string
  quantity: number
  unit: 'g' | 'ml' | 'piece' | 'tbsp' | 'tsp'
}

export interface NutritionFacts {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface Activity {
  id: string
  title: string
  type: 'walking' | 'running' | 'yoga' | 'cycling' | 'strength' | 'stretching'
  durationMinutes: number
  scheduledTime: string
  intensity: 'low' | 'medium' | 'high'
  estimatedCalories: number
  completed: boolean
}

export interface DailyGoal {
  calories: number
  protein: number
  carbs: number
  fat: number
  waterMl: number
  mealsCount: number
}

export interface Preference {
  id: string
  label: string
  type: 'diet' | 'allergy' | 'favorite' | 'avoid'
  enabled: boolean
}

export interface HistoryEntry {
  date: string
  calories: number
  mealsCompleted: number
  activitiesCompleted: number
  score: number
}
