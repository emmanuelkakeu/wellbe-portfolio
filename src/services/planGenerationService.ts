import type {
  DailyGoal,
  Meal,
  MealPlan,
  OnboardingProfile,
  PlannedDayInput,
} from '../types/domain'
import { wait } from './wait'

function estimateAge(birthDate: string) {
  const birthYear = Number(birthDate.slice(0, 4))
  const currentYear = new Date().getFullYear()
  return birthYear ? Math.max(currentYear - birthYear, 18) : 30
}

function calculateGoal(profile: OnboardingProfile, day: PlannedDayInput): DailyGoal {
  const age = estimateAge(profile.birthDate)
  const base =
    10 * profile.currentWeightKg +
    6.25 * profile.heightCm -
    5 * age +
    (profile.gender === 'woman' ? -161 : 5)
  const activityFactor =
    profile.activityLevel === 'high'
      ? 1.65
      : profile.activityLevel === 'moderate'
        ? 1.45
        : 1.25
  const activityCalories = day.activities.reduce(
    (total, activity) => total + activity.estimatedCalories,
    0,
  )
  const goalDelta =
    profile.goal === 'lose_weight'
      ? -320
      : profile.goal === 'gain_muscle'
        ? 260
        : 0
  const calories = Math.round(base * activityFactor + activityCalories * 0.55 + goalDelta)
  const protein = Math.round(
    profile.currentWeightKg * (profile.goal === 'gain_muscle' ? 2 : 1.65),
  )
  const fat = Math.round((calories * 0.28) / 9)
  const carbs = Math.round((calories - protein * 4 - fat * 9) / 4)

  return {
    calories,
    protein,
    carbs,
    fat,
    waterMl: day.activities.length > 0 ? 2400 : 2000,
    mealsCount: 4,
  }
}

function buildMeal(
  index: number,
  wish: string,
  calories: number,
  type: Meal['type'],
  time: string,
  proteinRatio: number,
): Meal {
  const protein = Math.round((calories * proteinRatio) / 4)
  const fat = Math.round((calories * 0.27) / 9)
  const carbs = Math.round((calories - protein * 4 - fat * 9) / 4)
  const title = wish || ['Bol energie', 'Assiette composee', 'Collation proteinee', 'Diner equilibre'][index]

  return {
    id: `generated-meal-${type}-${Date.now()}-${index}`,
    type,
    title,
    recommendedTime: time,
    consumed: false,
    nutrition: { calories, protein, carbs, fat },
    recipe: {
      id: `generated-recipe-${type}`,
      title,
      description:
        'Recette generee a partir des objectifs, activites prevues et preferences alimentaires du profil.',
      imageUrl:
        index % 2 === 0
          ? 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80'
          : 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80',
      tags: ['ai-plan', 'personalise', 'balanced'],
      ingredients: [
        { id: `${type}-protein`, name: 'Source de proteines', quantity: protein * 5, unit: 'g' },
        { id: `${type}-carbs`, name: 'Base glucidique', quantity: carbs * 3, unit: 'g' },
        { id: `${type}-veg`, name: 'Legumes ou fruits', quantity: 160, unit: 'g' },
      ],
      steps: [
        'Preparer la base selon la cuisson indiquee.',
        'Ajouter la source de proteines et les vegetaux.',
        'Ajuster les quantites pour respecter les objectifs du jour.',
      ],
    },
  }
}

export async function generatePersonalizedMealPlan(
  profile: OnboardingProfile,
  day: PlannedDayInput,
): Promise<MealPlan> {
  await wait(1400)
  const dailyGoal = calculateGoal(profile, day)
  const wishes = [...day.mealWishes, ...profile.preferredMeals]
  const mealCalories = [
    Math.round(dailyGoal.calories * 0.22),
    Math.round(dailyGoal.calories * 0.34),
    Math.round(dailyGoal.calories * 0.14),
    Math.round(dailyGoal.calories * 0.3),
  ]

  return {
    id: `generated-plan-${day.date}`,
    date: day.date,
    userId: 'user-demo-1',
    dailyGoal,
    consumedNutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 },
    meals: [
      buildMeal(0, wishes[0], mealCalories[0], 'breakfast', '08:00', 0.22),
      buildMeal(1, wishes[1], mealCalories[1], 'lunch', '12:30', 0.2),
      buildMeal(2, wishes[2], mealCalories[2], 'snack', '16:30', 0.24),
      buildMeal(3, wishes[3], mealCalories[3], 'dinner', '19:45', 0.2),
    ],
  }
}
