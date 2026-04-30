import { Button } from '../components/ui/Button'

interface LandingPageProps {
  onSignIn: () => void
  onSignUp: () => void
}

export function LandingPage({ onSignIn, onSignUp }: LandingPageProps) {
  return (
    <main className="public-page">
      <nav className="public-nav">
        <button className="brand" type="button">
          <span className="brand-mark">W</span>
          <span>
            <strong>Wellbe</strong>
            <small>Portfolio</small>
          </span>
        </button>
        <div className="public-nav__actions">
          <Button variant="ghost" onClick={onSignIn}>
            Connexion
          </Button>
          <Button onClick={onSignUp}>S'inscrire</Button>
        </div>
      </nav>

      <section className="public-hero">
        <div>
          <span className="header-kicker">Nutrition + activites + objectifs</span>
          <h1>Un plan alimentaire qui s'adapte a la journee reelle.</h1>
          <p>
            La demo collecte progressivement les informations utiles, simule une
            generation IA et construit un plan nutritionnel coherent avec le poids,
            les repas souhaites et les activites prevues.
          </p>
          <div className="card-actions">
            <Button onClick={onSignUp}>Commencer gratuitement</Button>
            <Button variant="secondary" onClick={onSignIn}>
              J'ai deja un compte
            </Button>
          </div>
        </div>
        <div className="public-hero__panel">
          <div>
            <strong>01</strong>
            <span>Profil et objectif</span>
          </div>
          <div>
            <strong>02</strong>
            <span>Repas preferes et restrictions</span>
          </div>
          <div>
            <strong>03</strong>
            <span>Activites planifiees</span>
          </div>
          <div>
            <strong>04</strong>
            <span>Plan personnalise genere</span>
          </div>
        </div>
      </section>
    </main>
  )
}
