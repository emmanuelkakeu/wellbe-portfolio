import type { Meal } from '../../types/domain'
import { getMealTypeLabel } from '../../utils/nutrition'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { MealStatusBadge } from './MealStatusBadge'

interface MealCardProps {
  meal: Meal
  onConsume: (meal: Meal) => void
  onDetails: (mealId: string) => void
}

export function MealCard({ meal, onConsume, onDetails }: MealCardProps) {
  return (
    <Card className="meal-card">
      <div className="meal-card__image">
        {meal.recipe.imageUrl ? (
          <img src={meal.recipe.imageUrl} alt="" loading="lazy" />
        ) : null}
      </div>
      <div className="meal-card__body">
        <div className="card-eyebrow">
          <span>{getMealTypeLabel(meal.type)}</span>
          <MealStatusBadge consumed={meal.consumed} />
        </div>
        <h3>{meal.title}</h3>
        <p>{meal.recommendedTime} · {meal.nutrition.calories} kcal</p>
        <div className="badge-row">
          <Badge tone="blue">{meal.nutrition.protein}g proteines</Badge>
          <Badge tone="green">{meal.nutrition.carbs}g glucides</Badge>
          <Badge tone="orange">{meal.nutrition.fat}g lipides</Badge>
        </div>
        <div className="card-actions">
          <Button variant="secondary" onClick={() => onDetails(meal.id)}>
            Detail
          </Button>
          <Button onClick={() => onConsume(meal)} disabled={meal.consumed}>
            {meal.consumed ? 'Consomme' : 'Marquer consomme'}
          </Button>
        </div>
      </div>
    </Card>
  )
}
