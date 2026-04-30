import type { DailyGoal, NutritionFacts } from '../../types/domain'
import { getProgressValue } from '../../utils/nutrition'
import { Card } from '../ui/Card'
import { MacroProgress } from './MacroProgress'

interface NutritionSummaryProps {
  consumed: NutritionFacts
  goal: DailyGoal
}

export function NutritionSummary({ consumed, goal }: NutritionSummaryProps) {
  const calorieProgress = getProgressValue(consumed.calories, goal.calories)

  return (
    <Card className="nutrition-summary">
      <div className="section-heading">
        <span>Objectifs du jour</span>
        <h2>Progression nutritionnelle</h2>
      </div>
      <div
        className="summary-meter"
        aria-label={`Calories ${calorieProgress}%`}
        style={{
          background: `radial-gradient(circle at center, #ffffff 57%, transparent 58%), conic-gradient(#22a66b 0 ${calorieProgress}%, #e6eee9 ${calorieProgress}% 100%)`,
        }}
      >
        <span>{calorieProgress}%</span>
      </div>
      <MacroProgress consumed={consumed} goal={goal} />
    </Card>
  )
}
