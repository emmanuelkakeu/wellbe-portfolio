import { useState, type FormEvent } from 'react'
import type { Activity } from '../../types/domain'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

interface ActivityFormProps {
  onAdd: (activity: Activity) => void
}

const activityLabels: Record<Activity['type'], string> = {
  walking: 'Marche',
  running: 'Course',
  yoga: 'Yoga',
  cycling: 'Velo',
  strength: 'Renforcement',
  stretching: 'Etirements',
}

export function ActivityForm({ onAdd }: ActivityFormProps) {
  const [type, setType] = useState<Activity['type']>('walking')
  const [duration, setDuration] = useState(30)
  const [scheduledTime, setScheduledTime] = useState('17:30')
  const [intensity, setIntensity] = useState<Activity['intensity']>('medium')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const intensityFactor = intensity === 'high' ? 7 : intensity === 'medium' ? 5 : 3

    onAdd({
      id: `activity-${Date.now()}`,
      title: activityLabels[type],
      type,
      durationMinutes: duration,
      scheduledTime,
      intensity,
      estimatedCalories: Math.round(duration * intensityFactor),
      completed: false,
    })
  }

  return (
    <Card>
      <div className="section-heading">
        <span>Planification</span>
        <h2>Ajouter une activite</h2>
      </div>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Type
          <select
            value={type}
            onChange={(event) => setType(event.target.value as Activity['type'])}
          >
            {Object.entries(activityLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Duree
          <input
            min={10}
            max={120}
            step={5}
            type="number"
            value={duration}
            onChange={(event) => setDuration(Number(event.target.value))}
          />
        </label>
        <label>
          Heure
          <input
            type="time"
            value={scheduledTime}
            onChange={(event) => setScheduledTime(event.target.value)}
          />
        </label>
        <label>
          Intensite
          <select
            value={intensity}
            onChange={(event) =>
              setIntensity(event.target.value as Activity['intensity'])
            }
          >
            <option value="low">Douce</option>
            <option value="medium">Moderee</option>
            <option value="high">Intense</option>
          </select>
        </label>
        <Button className="form-grid__submit" type="submit">
          Ajouter
        </Button>
      </form>
    </Card>
  )
}
