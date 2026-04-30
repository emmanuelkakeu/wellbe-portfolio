import { useAppDispatch, useAppSelector } from '../app/hooks'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'
import { selectEnabledPreferences } from '../features/preferences/preferenceSelectors'
import { selectCurrentUser } from '../features/user/userSelectors'
import {
  updateActivityLevel,
  updateUserGoal,
} from '../features/user/userSlice'
import type { User } from '../types/domain'

const goalLabels: Record<User['goal'], string> = {
  lose_weight: 'Perte de poids',
  maintain: 'Maintien',
  gain_muscle: 'Gain musculaire',
  healthy_lifestyle: 'Hygiene de vie',
}

const activityLabels: Record<User['activityLevel'], string> = {
  low: 'Faible',
  moderate: 'Modere',
  high: 'Eleve',
}

export function ProfilePage() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser)
  const enabledPreferences = useAppSelector(selectEnabledPreferences)

  return (
    <div className="page-stack">
      <Card className="profile-card">
        <img src={user.avatarUrl} alt="" />
        <div>
          <span className="header-kicker">Profil fictif</span>
          <h2>{user.firstName}, {user.age} ans</h2>
          <p>
            Objectif principal: {goalLabels[user.goal]} · niveau{' '}
            {activityLabels[user.activityLevel].toLowerCase()}.
          </p>
        </div>
      </Card>
      <div className="two-column">
        <Card>
          <div className="section-heading">
            <span>Objectif</span>
            <h2>Parametres demo</h2>
          </div>
          <div className="form-grid">
            <label>
              Objectif
              <select
                value={user.goal}
                onChange={(event) =>
                  dispatch(updateUserGoal(event.target.value as User['goal']))
                }
              >
                {Object.entries(goalLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Niveau d'activite
              <select
                value={user.activityLevel}
                onChange={(event) =>
                  dispatch(
                    updateActivityLevel(
                      event.target.value as User['activityLevel'],
                    ),
                  )
                }
              >
                {Object.entries(activityLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </Card>
        <Card>
          <div className="section-heading">
            <span>Preferences actives</span>
            <h2>Resume alimentaire</h2>
          </div>
          <div className="badge-row">
            {enabledPreferences.map((preference) => (
              <Badge key={preference.id} tone="green">
                {preference.label}
              </Badge>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
