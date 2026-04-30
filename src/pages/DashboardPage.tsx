import { useAppDispatch, useAppSelector } from '../app/hooks'
import { DailyOverview } from '../components/dashboard/DailyOverview'
import { NutritionSummary } from '../components/dashboard/NutritionSummary'
import { MealList } from '../components/meals/MealList'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import type { AppPage } from '../components/layout/navigation'
import { selectActivities } from '../features/activities/activitySelectors'
import { selectDailyPlan } from '../features/mealPlan/mealPlanSelectors'
import { consumeMealById } from '../features/mealPlan/mealPlanSlice'
import { pushNotification } from '../features/notifications/notificationSlice'
import type { Meal } from '../types/domain'
import { formatDisplayDate } from '../utils/dates'
import { consumeMeal as consumeMealService } from '../services/mealPlanService'
import { useDailyProgress } from '../hooks/useDailyProgress'

interface DashboardPageProps {
  onNavigate: (page: AppPage) => void
  onOpenMeal: (mealId: string) => void
}

export function DashboardPage({ onNavigate, onOpenMeal }: DashboardPageProps) {
  const dispatch = useAppDispatch()
  const dailyPlan = useAppSelector(selectDailyPlan)
  const activities = useAppSelector(selectActivities)
  const progress = useDailyProgress()

  async function handleConsume(meal: Meal) {
    await consumeMealService(meal.id)
    dispatch(consumeMealById(meal.id))
    dispatch(
      pushNotification({
        title: 'Repas consomme',
        message: `${meal.title} a ete ajoute a la journee.`,
        tone: 'success',
      }),
    )
  }

  return (
    <div className="page-stack">
      <section className="dashboard-hero">
        <div>
          <span className="header-kicker">{formatDisplayDate(dailyPlan.date)}</span>
          <h2>Journee bien-etre lisible en un coup d'oeil</h2>
          <p>
            Suivi fictif des repas, macros, activites et preferences pour une demo
            portfolio autonome.
          </p>
        </div>
        <div className="hero-stats">
          <Card>
            <strong>{dailyPlan.consumedNutrition.calories}</strong>
            <span>kcal consommees</span>
          </Card>
          <Card>
            <strong>{progress.consumedMeals}/4</strong>
            <span>repas valides</span>
          </Card>
          <Card>
            <strong>{progress.completedActivityCalories}</strong>
            <span>kcal activites</span>
          </Card>
        </div>
      </section>

      <section className="dashboard-grid">
        <NutritionSummary
          consumed={dailyPlan.consumedNutrition}
          goal={dailyPlan.dailyGoal}
        />
        <div className="stack">
          <DailyOverview
            meals={dailyPlan.meals}
            activities={activities}
            onOpenMeal={onOpenMeal}
          />
          <Card>
            <div className="section-heading">
              <span>Alertes</span>
              <h2>Rappels simples</h2>
            </div>
            <div className="badge-row">
              <Badge tone="blue">Hydratation 2L</Badge>
              <Badge tone="green">{progress.mealProgress}% repas</Badge>
              <Badge tone="orange">Collation a 16:00</Badge>
            </div>
          </Card>
        </div>
      </section>

      <section className="content-section">
        <div className="section-title-row">
          <div className="section-heading">
            <span>Programme</span>
            <h2>Repas du jour</h2>
          </div>
          <Button variant="secondary" onClick={() => onNavigate('daily')}>
            Voir tout
          </Button>
        </div>
        <MealList
          meals={dailyPlan.meals.slice(0, 2)}
          onConsume={handleConsume}
          onDetails={onOpenMeal}
        />
      </section>
    </div>
  )
}
