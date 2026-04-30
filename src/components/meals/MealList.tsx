import type { Meal } from '../../types/domain'
import { MealCard } from './MealCard'

interface MealListProps {
  meals: Meal[]
  onConsume: (meal: Meal) => void
  onDetails: (mealId: string) => void
}

export function MealList({ meals, onConsume, onDetails }: MealListProps) {
  return (
    <div className="meal-grid">
      {meals.map((meal) => (
        <MealCard
          key={meal.id}
          meal={meal}
          onConsume={onConsume}
          onDetails={onDetails}
        />
      ))}
    </div>
  )
}
