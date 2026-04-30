import { Badge } from '../ui/Badge'

interface MealStatusBadgeProps {
  consumed: boolean
}

export function MealStatusBadge({ consumed }: MealStatusBadgeProps) {
  return consumed ? (
    <Badge tone="green">Consomme</Badge>
  ) : (
    <Badge tone="orange">A venir</Badge>
  )
}
