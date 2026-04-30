import { useAppDispatch, useAppSelector } from '../app/hooks'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { selectMeals } from '../features/mealPlan/mealPlanSelectors'
import { consumeMealById } from '../features/mealPlan/mealPlanSlice'
import { pushNotification } from '../features/notifications/notificationSlice'
import { consumeMeal as consumeMealService } from '../services/mealPlanService'
import { getMealTypeLabel } from '../utils/nutrition'

interface MealDetailPageProps {
  mealId: string | null
  onBack: () => void
}

export function MealDetailPage({ mealId, onBack }: MealDetailPageProps) {
  const dispatch = useAppDispatch()
  const meals = useAppSelector(selectMeals)
  const meal = meals.find((item) => item.id === mealId) ?? meals[0]

  if (!meal) {
    return (
      <EmptyState
        title="Aucun repas"
        message="Le programme fictif ne contient pas encore de recette."
      />
    )
  }

  async function handleConsume() {
    await consumeMealService(meal.id)
    dispatch(consumeMealById(meal.id))
    dispatch(
      pushNotification({
        title: 'Recette validee',
        message: `${meal.title} est maintenant dans le suivi nutritionnel.`,
        tone: 'success',
      }),
    )
  }

  return (
    <div className="page-stack">
      <Card className="recipe-detail">
        <div className="recipe-detail__image">
          {meal.recipe.imageUrl ? <img src={meal.recipe.imageUrl} alt="" /> : null}
        </div>
        <div className="recipe-detail__content">
          <div className="card-eyebrow">
            <span>{getMealTypeLabel(meal.type)} · {meal.recommendedTime}</span>
            <Badge tone={meal.consumed ? 'green' : 'orange'}>
              {meal.consumed ? 'Consomme' : 'A consommer'}
            </Badge>
          </div>
          <h2>{meal.recipe.title}</h2>
          <p>{meal.recipe.description}</p>
          <div className="badge-row">
            {meal.recipe.tags.map((tag) => (
              <Badge key={tag} tone="blue">
                {tag}
              </Badge>
            ))}
          </div>
          <dl className="nutrition-facts">
            <div>
              <dt>Calories</dt>
              <dd>{meal.nutrition.calories}</dd>
            </div>
            <div>
              <dt>Proteines</dt>
              <dd>{meal.nutrition.protein}g</dd>
            </div>
            <div>
              <dt>Glucides</dt>
              <dd>{meal.nutrition.carbs}g</dd>
            </div>
            <div>
              <dt>Lipides</dt>
              <dd>{meal.nutrition.fat}g</dd>
            </div>
          </dl>
          <div className="card-actions">
            <Button variant="secondary" onClick={onBack}>
              Retour
            </Button>
            <Button onClick={handleConsume} disabled={meal.consumed}>
              {meal.consumed ? 'Deja consomme' : 'Marquer comme consomme'}
            </Button>
          </div>
        </div>
      </Card>

      <div className="two-column">
        <Card>
          <div className="section-heading">
            <span>Preparation</span>
            <h2>Ingredients</h2>
          </div>
          <ul className="clean-list">
            {meal.recipe.ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                <span>{ingredient.name}</span>
                <strong>
                  {ingredient.quantity} {ingredient.unit}
                </strong>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <div className="section-heading">
            <span>Recette</span>
            <h2>Instructions</h2>
          </div>
          <ol className="steps-list">
            {meal.recipe.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </Card>
      </div>
    </div>
  )
}
