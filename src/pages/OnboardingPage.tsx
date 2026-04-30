import { useState, type FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { completeOnboarding } from '../features/auth/authSlice'
import { applyOnboardingProfile } from '../features/user/userSlice'
import type { OnboardingProfile, User } from '../types/domain'

const steps = ['Identite', 'Objectif', 'Profil', 'Preferences'] as const

export function OnboardingPage() {
  const dispatch = useAppDispatch()
  const email = useAppSelector((state) => state.auth.email)
  const [step, setStep] = useState(0)
  const [profile, setProfile] = useState<OnboardingProfile>({
    firstName: 'Emma',
    lastName: 'Martin',
    email,
    goal: 'healthy_lifestyle',
    activityLevel: 'moderate',
    gender: 'woman',
    birthDate: '1998-05-12',
    heightCm: 168,
    currentWeightKg: 64,
    targetWeightKg: 61,
    preferredMeals: ['Poulet riz legumes', 'Saumon patate douce'],
    avoidIngredients: ['Arachides'],
  })

  function update<K extends keyof OnboardingProfile>(
    key: K,
    value: OnboardingProfile[K],
  ) {
    setProfile((current) => ({ ...current, [key]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (step < steps.length - 1) {
      setStep((current) => current + 1)
      return
    }

    dispatch(completeOnboarding(profile))
    dispatch(applyOnboardingProfile(profile))
  }

  return (
    <main className="onboarding-page">
      <form className="onboarding-shell" onSubmit={handleSubmit}>
        <div className="onboarding-progress">
          <span style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>
        <Card className="onboarding-card">
          <div className="section-heading">
            <span>Etape {step + 1} / {steps.length}</span>
            <h1>{steps[step]}</h1>
          </div>

          {step === 0 ? (
            <div className="form-grid">
              <label>
                Prenom
                <input
                  value={profile.firstName}
                  onChange={(event) => update('firstName', event.target.value)}
                  required
                />
              </label>
              <label>
                Nom
                <input
                  value={profile.lastName}
                  onChange={(event) => update('lastName', event.target.value)}
                  required
                />
              </label>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="choice-grid">
              {[
                ['lose_weight', 'Perdre du poids'],
                ['gain_muscle', 'Prendre du muscle'],
                ['maintain', 'Maintenir mon poids'],
                ['healthy_lifestyle', 'Mieux manger'],
              ].map(([value, label]) => (
                <button
                  className={profile.goal === value ? 'choice is-selected' : 'choice'}
                  key={value}
                  type="button"
                  onClick={() => update('goal', value as User['goal'])}
                >
                  {label}
                </button>
              ))}
            </div>
          ) : null}

          {step === 2 ? (
            <div className="form-grid">
              <label>
                Genre
                <select
                  value={profile.gender}
                  onChange={(event) =>
                    update(
                      'gender',
                      event.target.value as OnboardingProfile['gender'],
                    )
                  }
                >
                  <option value="woman">Femme</option>
                  <option value="man">Homme</option>
                  <option value="other">Autre</option>
                </select>
              </label>
              <label>
                Date de naissance
                <input
                  type="date"
                  value={profile.birthDate}
                  onChange={(event) => update('birthDate', event.target.value)}
                />
              </label>
              <label>
                Taille en cm
                <input
                  type="number"
                  min={120}
                  max={230}
                  value={profile.heightCm}
                  onChange={(event) => update('heightCm', Number(event.target.value))}
                />
              </label>
              <label>
                Poids actuel en kg
                <input
                  type="number"
                  min={35}
                  max={220}
                  value={profile.currentWeightKg}
                  onChange={(event) =>
                    update('currentWeightKg', Number(event.target.value))
                  }
                />
              </label>
              <label>
                Poids cible en kg
                <input
                  type="number"
                  min={35}
                  max={220}
                  value={profile.targetWeightKg}
                  onChange={(event) =>
                    update('targetWeightKg', Number(event.target.value))
                  }
                />
              </label>
              <label>
                Niveau d'activite
                <select
                  value={profile.activityLevel}
                  onChange={(event) =>
                    update(
                      'activityLevel',
                      event.target.value as OnboardingProfile['activityLevel'],
                    )
                  }
                >
                  <option value="low">Sedentaire</option>
                  <option value="moderate">Modere</option>
                  <option value="high">Actif</option>
                </select>
              </label>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="form-grid">
              <label>
                Repas preferes
                <textarea
                  value={profile.preferredMeals.join(', ')}
                  onChange={(event) =>
                    update(
                      'preferredMeals',
                      event.target.value
                        .split(',')
                        .map((item) => item.trim())
                        .filter(Boolean),
                    )
                  }
                />
              </label>
              <label>
                Allergies ou aliments a eviter
                <textarea
                  value={profile.avoidIngredients.join(', ')}
                  onChange={(event) =>
                    update(
                      'avoidIngredients',
                      event.target.value
                        .split(',')
                        .map((item) => item.trim())
                        .filter(Boolean),
                    )
                  }
                />
              </label>
            </div>
          ) : null}
        </Card>
        <div className="onboarding-actions">
          <Button
            variant="secondary"
            onClick={() => setStep((current) => Math.max(current - 1, 0))}
            disabled={step === 0}
          >
            Retour
          </Button>
          <Button type="submit">
            {step === steps.length - 1 ? 'Creer mon espace' : 'Suivant'}
          </Button>
        </div>
      </form>
    </main>
  )
}
