import type { Activity } from '../types/domain'

export const mockActivities: Activity[] = [
  {
    id: 'activity-1',
    title: 'Marche rapide',
    type: 'walking',
    durationMinutes: 30,
    scheduledTime: '10:00',
    intensity: 'medium',
    estimatedCalories: 140,
    completed: true,
  },
  {
    id: 'activity-2',
    title: 'Yoga detente',
    type: 'yoga',
    durationMinutes: 25,
    scheduledTime: '18:00',
    intensity: 'low',
    estimatedCalories: 80,
    completed: false,
  },
]
