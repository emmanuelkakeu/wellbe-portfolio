import { useState, type FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { ActivityCard } from '../components/activities/ActivityCard'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { markPlanReady } from '../features/auth/authSlice'
import { setGeneratedMealPlan } from '../features/mealPlan/mealPlanSlice'
import { pushNotification } from '../features/notifications/notificationSlice'
import { generatePersonalizedMealPlan } from '../services/planGenerationService'
import type { Activity, PlannedDayInput } from '../types/domain'

interface PlanGeneratorPageProps {
  onPlanReady: () => void
}

const today = new Date().toISOString().slice(0, 10)

const activityLabels: Record<Activity['type'], string> = {
  walking: 'Marche',
  running: 'Course',
  yoga: 'Yoga',
  cycling: 'Velo',
  strength: 'Renforcement',
  stretching: 'Etirements',
}

export function PlanGeneratorPage({ onPlanReady }: PlanGeneratorPageProps) {
  const dispatch = useAppDispatch()
  const profile = useAppSelector((state) => state.auth.profile)
  const [input, setInput] = useState<PlannedDayInput>({
    date: today,
    activities: [],
    mealWishes: ['Bol avoine fruits', 'Poulet riz legumes'],
    notes: 'Journee de travail classique, repas simples et rassasiants.',
  })
  const [activityType, setActivityType] = useState<Activity['type']>('walking')
  const [duration, setDuration] = useState(35)
  const [mealWish, setMealWish] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState(0)

  const fallbackProfile = {
    firstName: 'Emma',
    lastName: 'Martin',
    email: 'emma.demo@wellbe.local',
    goal: 'healthy_lifestyle' as const,
    activityLevel: 'moderate' as const,
    gender: 'woman' as const,
    birthDate: '1998-05-12',
    heightCm: 168,
    currentWeightKg: 64,
    targetWeightKg: 61,
    preferredMeals: ['Poulet riz legumes', 'Saumon patate douce'],
    avoidIngredients: ['Arachides'],
  }
  const activeProfile = profile ?? fallbackProfile

  function addActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const intensity = duration >= 50 ? 'high' : duration >= 30 ? 'medium' : 'low'
    const caloriesPerMinute = intensity === 'high' ? 7 : intensity === 'medium' ? 5 : 3
    const activity: Activity = {
      id: `planned-${Date.now()}`,
      title: activityLabels[activityType],
      type: activityType,
      durationMinutes: duration,
      scheduledTime: '18:00',
      intensity,
      estimatedCalories: Math.round(duration * caloriesPerMinute),
      completed: false,
    }
    setInput((current) => ({
      ...current,
      activities: [...current.activities, activity],
    }))
  }

  function addMealWish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = mealWish.trim()
    if (!trimmed) {
      return
    }
    setInput((current) => ({
      ...current,
      mealWishes: [...current.mealWishes, trimmed],
    }))
    setMealWish('')
  }

  async function handleGenerate() {
    setIsGenerating(true)
    setGenerationStep(18)
    window.setTimeout(() => setGenerationStep(48), 350)
    window.setTimeout(() => setGenerationStep(76), 850)

    const generatedPlan = await generatePersonalizedMealPlan(activeProfile, input)
    dispatch(setGeneratedMealPlan(generatedPlan))
    dispatch(markPlanReady())
    dispatch(
      pushNotification({
        title: 'Plan genere',
        message:
          'Les quantites et macros ont ete adaptees au profil et aux activites.',
        tone: 'success',
      }),
    )
    setGenerationStep(100)
    window.setTimeout(() => {
      setIsGenerating(false)
      onPlanReady()
    }, 500)
  }

  return (
    <div className="page-stack">
      <section className="generator-hero">
        <div>
          <span className="header-kicker">Simulation IA portfolio</span>
          <h2>Generer un plan alimentaire qui s'adapte a vos objectifs de bien-être</h2>
          <p>
            Le moteur fictif combine objectif de poids, niveau d'activite,
            preferences, aliments a eviter, repas souhaites et depense sportive.
          </p>
        </div>
        <Card>
          <div className="section-heading">
            <span>Profil utilise</span>
            <h2>{activeProfile.firstName} · {activeProfile.currentWeightKg} kg</h2>
          </div>
          <div className="badge-row">
            <Badge tone="green">{activeProfile.goal}</Badge>
            <Badge tone="blue">{activeProfile.activityLevel}</Badge>
            <Badge tone="orange">Cible {activeProfile.targetWeightKg} kg</Badge>
          </div>
        </Card>
      </section>

      <div className="dashboard-grid">
        <div className="page-stack">
          <Card>
            <div className="section-heading">
              <span>Jour a planifier</span>
              <h2>Contraintes du plan</h2>
            </div>
            <div className="form-grid">
              <label>
                Date
                <input
                  type="date"
                  value={input.date}
                  onChange={(event) =>
                    setInput((current) => ({ ...current, date: event.target.value }))
                  }
                />
              </label>
              <label>
                Notes du jour
                <input
                  value={input.notes}
                  onChange={(event) =>
                    setInput((current) => ({ ...current, notes: event.target.value }))
                  }
                />
              </label>
            </div>
          </Card>

          <Card>
            <div className="section-heading">
              <span>Activites</span>
              <h2>Depense a compenser intelligemment</h2>
            </div>
            <form className="form-grid form-grid--inline" onSubmit={addActivity}>
              <label>
                Type
                <select
                  value={activityType}
                  onChange={(event) =>
                    setActivityType(event.target.value as Activity['type'])
                  }
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
                  type="number"
                  min={10}
                  max={180}
                  step={5}
                  value={duration}
                  onChange={(event) => setDuration(Number(event.target.value))}
                />
              </label>
              <Button className="form-grid__submit" type="submit">
                Ajouter
              </Button>
            </form>
            <div className="activity-list generator-list">
              {input.activities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onComplete={(id) =>
                    setInput((current) => ({
                      ...current,
                      activities: current.activities.map((item) =>
                        item.id === id ? { ...item, completed: true } : item,
                      ),
                    }))
                  }
                  onRemove={(id) =>
                    setInput((current) => ({
                      ...current,
                      activities: current.activities.filter((item) => item.id !== id),
                    }))
                  }
                />
              ))}
            </div>
          </Card>
        </div>

        <div className="page-stack">
          <Card>
            <div className="section-heading">
              <span>Alimentation</span>
              <h2>Repas souhaites</h2>
            </div>
            <form className="form-grid form-grid--inline" onSubmit={addMealWish}>
              <label>
                Plat ou ingredient
                <input
                  value={mealWish}
                  onChange={(event) => setMealWish(event.target.value)}
                  placeholder="Ex: pates completes saumon"
                />
              </label>
              <Button className="form-grid__submit" type="submit">
                Ajouter
              </Button>
            </form>
            <div className="badge-row generator-tags">
              {input.mealWishes.map((wish) => (
                <Badge key={wish} tone="green">
                  {wish}
                </Badge>
              ))}
              {activeProfile.avoidIngredients.map((avoid) => (
                <Badge key={avoid} tone="red">
                  Sans {avoid}
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="generation-card">
            <div className="generation-meter">
              <span>{isGenerating ? `${generationStep}%` : 'Pret'}</span>
            </div>
            <div className="section-heading">
              <span>Moteur de generation</span>
              <h2>
                {isGenerating
                  ? 'Analyse du profil et optimisation'
                  : 'Plan nutritionnel personnalisable'}
              </h2>
            </div>
            <p>
              Calories ciblees, macros et quantites d'ingredients sont ajustees
              selon les objectifs et les activites ajoutees.
            </p>
            <Button onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? 'Generation en cours...' : 'Generer le programme'}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
