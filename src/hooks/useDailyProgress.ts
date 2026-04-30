import { useMemo } from 'react'
import { selectActivities } from '../features/activities/activitySelectors'
import { selectDailyPlan } from '../features/mealPlan/mealPlanSelectors'
import { useAppSelector } from '../app/hooks'
import { getProgressValue } from '../utils/nutrition'

export function useDailyProgress() {
  const dailyPlan = useAppSelector(selectDailyPlan)
  const activities = useAppSelector(selectActivities)

  return useMemo(() => {
    const consumedMeals = dailyPlan.meals.filter((meal) => meal.consumed).length
    const completedActivities = activities.filter(
      (activity) => activity.completed,
    ).length

    return {
      consumedMeals,
      completedActivities,
      mealProgress: getProgressValue(consumedMeals, dailyPlan.dailyGoal.mealsCount),
      activityCalories: activities.reduce(
        (total, activity) => total + activity.estimatedCalories,
        0,
      ),
      completedActivityCalories: activities
        .filter((activity) => activity.completed)
        .reduce((total, activity) => total + activity.estimatedCalories, 0),
    }
  }, [activities, dailyPlan])
}
