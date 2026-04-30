import type { Activity, Meal } from '../../types/domain'
import { getMealTypeLabel } from '../../utils/nutrition'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

interface DailyOverviewProps {
  meals: Meal[]
  activities: Activity[]
  onOpenMeal: (mealId: string) => void
}

export function DailyOverview({
  meals,
  activities,
  onOpenMeal,
}: DailyOverviewProps) {
  const nextMeal = meals.find((meal) => !meal.consumed) ?? meals.at(-1)
  const plannedActivities = activities.filter((activity) => !activity.completed)

  return (
    <div className="overview-grid">
      <Card>
        <div className="section-heading">
          <span>Prochain repas</span>
          <h2>{nextMeal?.title ?? 'Journee terminee'}</h2>
        </div>
        {nextMeal ? (
          <>
            <p className="muted">
              {getMealTypeLabel(nextMeal.type)} · {nextMeal.recommendedTime} ·{' '}
              {nextMeal.nutrition.calories} kcal
            </p>
            <Button variant="secondary" onClick={() => onOpenMeal(nextMeal.id)}>
              Voir la recette
            </Button>
          </>
        ) : null}
      </Card>
      <Card>
        <div className="section-heading">
          <span>Activites</span>
          <h2>{plannedActivities.length} planifiee(s)</h2>
        </div>
        <div className="mini-list">
          {activities.slice(0, 3).map((activity) => (
            <div key={activity.id} className="mini-list__item">
              <span>{activity.title}</span>
              <Badge tone={activity.completed ? 'green' : 'blue'}>
                {activity.completed ? 'Terminee' : activity.scheduledTime}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
