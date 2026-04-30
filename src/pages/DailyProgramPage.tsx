import { useAppDispatch, useAppSelector } from '../app/hooks'
import type { AppPage } from '../components/layout/navigation'
import { MealList } from '../components/meals/MealList'
import { Card } from '../components/ui/Card'
import { ProgressBar } from '../components/ui/ProgressBar'
import { selectDailyPlan } from '../features/mealPlan/mealPlanSelectors'
import { consumeMealById } from '../features/mealPlan/mealPlanSlice'
import { pushNotification } from '../features/notifications/notificationSlice'
import { consumeMeal as consumeMealService } from '../services/mealPlanService'
import type { Meal } from '../types/domain'

interface DailyProgramPageProps {
  onNavigate: (page: AppPage) => void
  onOpenMeal: (mealId: string) => void
}

export function DailyProgramPage({
  onNavigate,
  onOpenMeal,
}: DailyProgramPageProps) {
  const dispatch = useAppDispatch()
  const dailyPlan = useAppSelector(selectDailyPlan)
  const consumedMeals = dailyPlan.meals.filter((meal) => meal.consumed).length

  async function handleConsume(meal: Meal) {
    await consumeMealService(meal.id)
    dispatch(consumeMealById(meal.id))
    dispatch(
      pushNotification({
        title: 'Programme mis a jour',
        message: `${meal.title} est marque comme consomme.`,
        tone: 'success',
      }),
    )
  }

  return (
    <div className="page-stack">
      <Card className="wide-card">
        <div className="section-heading">
          <span>Programme alimentaire</span>
          <h2>Repas planifies et consommation</h2>
        </div>
        <ProgressBar
          label="Repas consommes"
          value={consumedMeals}
          goal={dailyPlan.dailyGoal.mealsCount}
          unit=""
          tone="green"
        />
      </Card>
      <MealList
        meals={dailyPlan.meals}
        onConsume={handleConsume}
        onDetails={(mealId) => {
          onOpenMeal(mealId)
          onNavigate('meal-detail')
        }}
      />
    </div>
  )
}
