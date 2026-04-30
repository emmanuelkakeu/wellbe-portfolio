import type { Activity } from '../../types/domain'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

interface ActivityCardProps {
  activity: Activity
  onComplete: (id: string) => void
  onRemove: (id: string) => void
}

const intensityLabels: Record<Activity['intensity'], string> = {
  low: 'Douce',
  medium: 'Moderee',
  high: 'Intense',
}

export function ActivityCard({
  activity,
  onComplete,
  onRemove,
}: ActivityCardProps) {
  return (
    <Card className="activity-card">
      <div>
        <div className="card-eyebrow">
          <span>{activity.scheduledTime}</span>
          <Badge tone={activity.completed ? 'green' : 'blue'}>
            {activity.completed ? 'Terminee' : 'Planifiee'}
          </Badge>
        </div>
        <h3>{activity.title}</h3>
        <p className="muted">
          {activity.durationMinutes} min · {intensityLabels[activity.intensity]} ·{' '}
          {activity.estimatedCalories} kcal
        </p>
      </div>
      <div className="card-actions">
        <Button
          variant="secondary"
          onClick={() => onComplete(activity.id)}
          disabled={activity.completed}
        >
          Terminer
        </Button>
        <Button variant="ghost" onClick={() => onRemove(activity.id)}>
          Retirer
        </Button>
      </div>
    </Card>
  )
}
