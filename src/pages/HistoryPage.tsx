import { useEffect, useState } from 'react'
import { Card } from '../components/ui/Card'
import { ProgressBar } from '../components/ui/ProgressBar'
import { getHistory } from '../services/historyService'
import type { HistoryEntry } from '../types/domain'
import { formatShortDate } from '../utils/dates'

export function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getHistory().then((entries) => {
      setHistory(entries)
      setLoading(false)
    })
  }, [])

  const averageCalories =
    history.length > 0
      ? Math.round(
          history.reduce((total, entry) => total + entry.calories, 0) /
            history.length,
        )
      : 0

  return (
    <div className="page-stack">
      <Card>
        <div className="section-heading">
          <span>Historique simule</span>
          <h2>{loading ? 'Chargement...' : 'Tendances sur 7 jours'}</h2>
        </div>
        <dl className="nutrition-facts">
          <div>
            <dt>Moyenne kcal</dt>
            <dd>{averageCalories}</dd>
          </div>
          <div>
            <dt>Repas suivis</dt>
            <dd>
              {history.reduce((total, entry) => total + entry.mealsCompleted, 0)}
            </dd>
          </div>
          <div>
            <dt>Activites</dt>
            <dd>
              {history.reduce(
                (total, entry) => total + entry.activitiesCompleted,
                0,
              )}
            </dd>
          </div>
        </dl>
      </Card>
      <div className="history-list">
        {history.map((entry) => (
          <Card key={entry.date}>
            <div className="history-row">
              <div>
                <span className="header-kicker">{formatShortDate(entry.date)}</span>
                <h3>{entry.calories} kcal</h3>
                <p className="muted">
                  {entry.mealsCompleted} repas · {entry.activitiesCompleted}{' '}
                  activite(s)
                </p>
              </div>
              <ProgressBar
                label="Score"
                value={entry.score}
                goal={100}
                unit="%"
                tone={entry.score >= 85 ? 'green' : 'orange'}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
