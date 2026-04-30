import type { DailyGoal, NutritionFacts } from '../../types/domain'
import { ProgressBar } from '../ui/ProgressBar'

interface MacroProgressProps {
  consumed: NutritionFacts
  goal: DailyGoal
}

export function MacroProgress({ consumed, goal }: MacroProgressProps) {
  return (
    <div className="stack">
      <ProgressBar
        label="Calories"
        value={consumed.calories}
        goal={goal.calories}
        unit=" kcal"
        tone="green"
      />
      <ProgressBar
        label="Proteines"
        value={consumed.protein}
        goal={goal.protein}
        unit="g"
        tone="blue"
      />
      <ProgressBar
        label="Glucides"
        value={consumed.carbs}
        goal={goal.carbs}
        unit="g"
        tone="orange"
      />
      <ProgressBar
        label="Lipides"
        value={consumed.fat}
        goal={goal.fat}
        unit="g"
        tone="slate"
      />
    </div>
  )
}
