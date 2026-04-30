import { useAppDispatch, useAppSelector } from '../app/hooks'
import { ActivityCard } from '../components/activities/ActivityCard'
import { ActivityForm } from '../components/activities/ActivityForm'
import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { selectActivities } from '../features/activities/activitySelectors'
import {
  addActivity,
  completeActivity,
  removeActivity,
} from '../features/activities/activitySlice'
import { pushNotification } from '../features/notifications/notificationSlice'
import { addActivity as addActivityService } from '../services/activityService'
import type { Activity } from '../types/domain'

export function ActivitiesPage() {
  const dispatch = useAppDispatch()
  const activities = useAppSelector(selectActivities)
  const totalDuration = activities.reduce(
    (total, activity) => total + activity.durationMinutes,
    0,
  )
  const totalCalories = activities.reduce(
    (total, activity) => total + activity.estimatedCalories,
    0,
  )

  async function handleAdd(activity: Activity) {
    const savedActivity = await addActivityService(activity)
    dispatch(addActivity(savedActivity))
    dispatch(
      pushNotification({
        title: 'Activite ajoutee',
        message: `${savedActivity.title} est planifiee a ${savedActivity.scheduledTime}.`,
        tone: 'success',
      }),
    )
  }

  function handleComplete(id: string) {
    dispatch(completeActivity(id))
    dispatch(
      pushNotification({
        title: 'Activite terminee',
        message: 'Le suivi du jour a ete mis a jour.',
        tone: 'success',
      }),
    )
  }

  function handleRemove(id: string) {
    dispatch(removeActivity(id))
  }

  return (
    <div className="page-stack">
      <div className="dashboard-grid">
        <Card>
          <div className="section-heading">
            <span>Synthese</span>
            <h2>Activites du jour</h2>
          </div>
          <dl className="nutrition-facts">
            <div>
              <dt>Duree</dt>
              <dd>{totalDuration} min</dd>
            </div>
            <div>
              <dt>Calories</dt>
              <dd>{totalCalories}</dd>
            </div>
            <div>
              <dt>Terminees</dt>
              <dd>{activities.filter((activity) => activity.completed).length}</dd>
            </div>
          </dl>
        </Card>
        <ActivityForm onAdd={handleAdd} />
      </div>
      <div className="activity-list">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onComplete={handleComplete}
              onRemove={handleRemove}
            />
          ))
        ) : (
          <EmptyState
            title="Aucune activite"
            message="Ajoutez une marche, une seance ou des etirements pour enrichir la demo."
          />
        )}
      </div>
    </div>
  )
}
