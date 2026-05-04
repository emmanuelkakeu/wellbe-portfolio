import { useState, type FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { beginOnboarding, signIn } from '../features/auth/authSlice'
import { selectAuthError, selectAuthMode } from '../features/auth/authSelectors'

interface AuthPageProps {
  onBack: () => void
  onSwitchMode: (mode: 'signin' | 'signup') => void
}

export function AuthPage({ onBack, onSwitchMode }: AuthPageProps) {
  const dispatch = useAppDispatch()
  const mode = useAppSelector(selectAuthMode)
  const authError = useAppSelector(selectAuthError)
  const [form, setForm] = useState({ mode, email: '', password: '' })
  const currentForm = form.mode === mode ? form : { mode, email: '', password: '' }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const credentials = {
      email: currentForm.email,
      password: currentForm.password,
    }

    if (mode === 'signup') {
      dispatch(beginOnboarding(credentials))
      return
    }

    dispatch(signIn(credentials))
  }

  return (
    <main className="auth-page">
      <Card className="auth-card">
        <div className="auth-card__visual">
          <span className="brand-mark">W</span>
          <h1>{mode === 'signup' ? 'Creer votre espace Wellbe' : 'Retour sur Wellbe'}</h1>
          <p>
            Cette version portfolio simule la connexion et la recuperation du plan
            depuis un backend personnel.
          </p>
        </div>
        <form className="auth-card__form" onSubmit={handleSubmit}>
          <div className="section-heading">
            <span>{mode === 'signup' ? 'Inscription' : 'Connexion'}</span>
            <h2>
              {mode === 'signup'
                ? 'On commence avec le minimum'
                : 'Connectez-vous pour retrouver le plan'}
            </h2>
          </div>
          {authError ? (
            <p className="auth-error" role="alert">
              {authError}
            </p>
          ) : null}
          <label>
            Email
            <input
              type="email"
              value={currentForm.email}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  mode,
                  email: event.target.value,
                }))
              }
              required
            />
          </label>
          <label>
            Mot de passe
            <input
              type="password"
              minLength={4}
              value={currentForm.password}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  mode,
                  password: event.target.value,
                }))
              }
              required
            />
          </label>
          <Button type="submit">
            {mode === 'signup' ? 'Continuer' : 'Se connecter'}
          </Button>
          <div className="auth-links">
            <button type="button" onClick={onBack}>
              Retour
            </button>
            <button
              type="button"
              onClick={() => onSwitchMode(mode === 'signup' ? 'signin' : 'signup')}
            >
              {mode === 'signup' ? 'J ai deja un compte' : 'Creer un compte'}
            </button>
          </div>
        </form>
      </Card>
    </main>
  )
}
