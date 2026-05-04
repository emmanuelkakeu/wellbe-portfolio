import { useState, type FormEvent, type KeyboardEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { completeOnboarding } from '../features/auth/authSlice'
import { applyOnboardingProfile } from '../features/user/userSlice'
import type { OnboardingProfile, User } from '../types/domain'

const steps = ['Identite', 'Objectif', 'Profil', 'Preferences'] as const

type OnboardingForm = Omit<
  OnboardingProfile,
  'goal' | 'activityLevel' | 'gender' | 'heightCm' | 'currentWeightKg' | 'targetWeightKg'
> & {
  goal: User['goal'] | ''
  activityLevel: OnboardingProfile['activityLevel'] | ''
  gender: OnboardingProfile['gender'] | ''
  heightCm: string
  currentWeightKg: string
  targetWeightKg: string
}

export function OnboardingPage() {
  const dispatch = useAppDispatch()
  const email = useAppSelector((state) => state.auth.email)
  const [step, setStep] = useState(0)
  const [favoriteMealInput, setFavoriteMealInput] = useState('')
  const [avoidIngredientInput, setAvoidIngredientInput] = useState('')
  const [profile, setProfile] = useState<OnboardingForm>({
    firstName: '',
    lastName: '',
    email,
    goal: '',
    activityLevel: '',
    gender: '',
    birthDate: '',
    heightCm: '',
    currentWeightKg: '',
    targetWeightKg: '',
    preferredMeals: [],
    avoidIngredients: [],
  })

  function update<K extends keyof OnboardingForm>(
    key: K,
    value: OnboardingForm[K],
  ) {
    setProfile((current) => ({ ...current, [key]: value }))
  }

  function addPreference(
    key: 'preferredMeals' | 'avoidIngredients',
    value: string,
    onReset: () => void,
  ) {
    const trimmedValue = value.trim()

    if (!trimmedValue) {
      return
    }

    setProfile((current) => {
      if (current[key].some((item) => item.toLowerCase() === trimmedValue.toLowerCase())) {
        return current
      }

      return {
        ...current,
        [key]: [...current[key], trimmedValue],
      }
    })
    onReset()
  }

  function handlePreferenceEnter(
    event: KeyboardEvent<HTMLInputElement>,
    key: 'preferredMeals' | 'avoidIngredients',
    value: string,
    onReset: () => void,
  ) {
    if (event.key !== 'Enter') {
      return
    }

    event.preventDefault()
    addPreference(key, value, onReset)
  }

  function removePreference(
    key: 'preferredMeals' | 'avoidIngredients',
    value: string,
  ) {
    setProfile((current) => ({
      ...current,
      [key]: current[key].filter((item) => item !== value),
    }))
  }

  function isStepValid() {
    if (step === 0) {
      return Boolean(profile.firstName.trim() && profile.lastName.trim())
    }

    if (step === 1) {
      return Boolean(profile.goal)
    }

    if (step === 2) {
      return Boolean(
        profile.gender &&
          profile.birthDate &&
          profile.heightCm &&
          profile.currentWeightKg &&
          profile.targetWeightKg &&
          profile.activityLevel,
      )
    }

    return true
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!isStepValid()) {
      return
    }

    if (step < steps.length - 1) {
      setStep((current) => current + 1)
      return
    }

    if (!profile.goal || !profile.activityLevel || !profile.gender) {
      return
    }

    const completedProfile: OnboardingProfile = {
      firstName: profile.firstName.trim(),
      lastName: profile.lastName.trim(),
      email,
      goal: profile.goal,
      activityLevel: profile.activityLevel,
      gender: profile.gender,
      birthDate: profile.birthDate,
      heightCm: Number(profile.heightCm),
      currentWeightKg: Number(profile.currentWeightKg),
      targetWeightKg: Number(profile.targetWeightKg),
      preferredMeals: profile.preferredMeals,
      avoidIngredients: profile.avoidIngredients,
    }

    dispatch(completeOnboarding(completedProfile))
    dispatch(applyOnboardingProfile(completedProfile))
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
                      event.target.value as OnboardingForm['gender'],
                    )
                  }
                  required
                >
                  <option value="" disabled>Choisir</option>
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
                  required
                />
              </label>
              <label>
                Taille en cm
                <input
                  type="number"
                  min={120}
                  max={230}
                  value={profile.heightCm}
                  onChange={(event) => update('heightCm', event.target.value)}
                  required
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
                    update('currentWeightKg', event.target.value)
                  }
                  required
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
                    update('targetWeightKg', event.target.value)
                  }
                  required
                />
              </label>
              <label>
                Niveau d'activite
                <select
                  value={profile.activityLevel}
                  onChange={(event) =>
                    update(
                      'activityLevel',
                      event.target.value as OnboardingForm['activityLevel'],
                    )
                  }
                  required
                >
                  <option value="" disabled>Choisir</option>
                  <option value="low">Sedentaire</option>
                  <option value="moderate">Modere</option>
                  <option value="high">Actif</option>
                </select>
              </label>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="preference-builder-grid">
              <div className="preference-builder">
                <div className="section-heading">
                  <span>Repas souhaites</span>
                  <h2>Ajoutez vos plats preferes</h2>
                </div>
                <div className="preference-builder__form">
                  <input
                    value={favoriteMealInput}
                    onChange={(event) => setFavoriteMealInput(event.target.value)}
                    onKeyDown={(event) =>
                      handlePreferenceEnter(
                        event,
                        'preferredMeals',
                        favoriteMealInput,
                        () => setFavoriteMealInput(''),
                      )
                    }
                    placeholder="Ex: poulet riz legumes"
                  />
                  <Button
                    type="button"
                    disabled={!favoriteMealInput.trim()}
                    onClick={() =>
                      addPreference(
                        'preferredMeals',
                        favoriteMealInput,
                        () => setFavoriteMealInput(''),
                      )
                    }
                  >
                    Ajouter
                  </Button>
                </div>
                <div className="preference-chip-list">
                  {profile.preferredMeals.length > 0 ? (
                    profile.preferredMeals.map((meal) => (
                      <button
                        key={meal}
                        type="button"
                        onClick={() => removePreference('preferredMeals', meal)}
                      >
                        {meal}
                        <span aria-hidden="true">x</span>
                      </button>
                    ))
                  ) : (
                    <p className="muted">Aucun repas ajoute.</p>
                  )}
                </div>
              </div>
              <div className="preference-builder">
                <div className="section-heading">
                  <span>Restrictions</span>
                  <h2>Ajoutez les aliments a eviter</h2>
                </div>
                <div className="preference-builder__form">
                  <input
                    value={avoidIngredientInput}
                    onChange={(event) => setAvoidIngredientInput(event.target.value)}
                    onKeyDown={(event) =>
                      handlePreferenceEnter(
                        event,
                        'avoidIngredients',
                        avoidIngredientInput,
                        () => setAvoidIngredientInput(''),
                      )
                    }
                    placeholder="Ex: arachides"
                  />
                  <Button
                    type="button"
                    disabled={!avoidIngredientInput.trim()}
                    onClick={() =>
                      addPreference(
                        'avoidIngredients',
                        avoidIngredientInput,
                        () => setAvoidIngredientInput(''),
                      )
                    }
                  >
                    Ajouter
                  </Button>
                </div>
                <div className="preference-chip-list">
                  {profile.avoidIngredients.length > 0 ? (
                    profile.avoidIngredients.map((ingredient) => (
                      <button
                        key={ingredient}
                        type="button"
                        onClick={() =>
                          removePreference('avoidIngredients', ingredient)
                        }
                      >
                        {ingredient}
                        <span aria-hidden="true">x</span>
                      </button>
                    ))
                  ) : (
                    <p className="muted">Aucun aliment exclu.</p>
                  )}
                </div>
              </div>
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
          <Button type="submit" disabled={!isStepValid()}>
            {step === steps.length - 1 ? 'Creer mon espace' : 'Suivant'}
          </Button>
        </div>
      </form>
    </main>
  )
}
