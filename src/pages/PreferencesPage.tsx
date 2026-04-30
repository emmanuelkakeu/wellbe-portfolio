import { useState, type FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { selectPreferences } from '../features/preferences/preferenceSelectors'
import {
  addPreference,
  removePreference,
  togglePreference,
} from '../features/preferences/preferenceSlice'
import { pushNotification } from '../features/notifications/notificationSlice'
import type { Preference } from '../types/domain'

const typeLabels: Record<Preference['type'], string> = {
  diet: 'Preference',
  allergy: 'Allergie',
  favorite: 'Favori',
  avoid: 'A eviter',
}

export function PreferencesPage() {
  const dispatch = useAppDispatch()
  const preferences = useAppSelector(selectPreferences)
  const [label, setLabel] = useState('')
  const [type, setType] = useState<Preference['type']>('favorite')

  function handleToggle(id: string) {
    dispatch(togglePreference(id))
    dispatch(
      pushNotification({
        title: 'Preference mise a jour',
        message: 'La configuration alimentaire fictive est sauvegardee.',
        tone: 'info',
      }),
    )
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedLabel = label.trim()

    if (!trimmedLabel) {
      return
    }

    dispatch(
      addPreference({
        id: `pref-${Date.now()}`,
        label: trimmedLabel,
        type,
        enabled: true,
      }),
    )
    dispatch(
      pushNotification({
        title: 'Preference ajoutee',
        message: `${trimmedLabel} est ajoute a la liste locale.`,
        tone: 'success',
      }),
    )
    setLabel('')
  }

  return (
    <div className="page-stack">
      <Card>
        <div className="section-heading">
          <span>Configuration</span>
          <h2>Preferences alimentaires fictives</h2>
        </div>
        <form className="form-grid form-grid--inline" onSubmit={handleSubmit}>
          <label>
            Libelle
            <input
              value={label}
              onChange={(event) => setLabel(event.target.value)}
              placeholder="Ex: Lentilles"
            />
          </label>
          <label>
            Type
            <select
              value={type}
              onChange={(event) => setType(event.target.value as Preference['type'])}
            >
              {Object.entries(typeLabels).map(([value, optionLabel]) => (
                <option key={value} value={value}>
                  {optionLabel}
                </option>
              ))}
            </select>
          </label>
          <Button className="form-grid__submit" type="submit">
            Ajouter
          </Button>
        </form>
      </Card>
      <div className="preference-grid">
        {preferences.map((preference) => (
          <Card key={preference.id} className="preference-card">
            <div>
              <div className="card-eyebrow">
                <Badge tone={preference.enabled ? 'green' : 'gray'}>
                  {preference.enabled ? 'Active' : 'Inactive'}
                </Badge>
                <span>{typeLabels[preference.type]}</span>
              </div>
              <h3>{preference.label}</h3>
            </div>
            <div className="card-actions">
              <Button
                variant={preference.enabled ? 'secondary' : 'primary'}
                onClick={() => handleToggle(preference.id)}
              >
                {preference.enabled ? 'Desactiver' : 'Activer'}
              </Button>
              <Button
                variant="ghost"
                onClick={() => dispatch(removePreference(preference.id))}
              >
                Retirer
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
