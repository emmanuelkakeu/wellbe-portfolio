import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'

export function AboutProjectPage() {
  return (
    <div className="page-stack">
      <Card className="wide-card">
        <div className="section-heading">
          <span>Case study portfolio</span>
          <h2>Reconstruction personnelle d'une app bien-etre</h2>
        </div>
        <p>
          Wellbe Portfolio est une application React fictive de nutrition et
          bien-etre. Elle montre une architecture frontend autonome avec donnees
          mockees, onboarding progressif, generation simulee de plan, Redux
          Toolkit, services asynchrones simules et persistance locale sans backend
          prive.
        </p>
        <div className="badge-row">
          <Badge tone="blue">React</Badge>
          <Badge tone="green">TypeScript</Badge>
          <Badge tone="orange">Redux Toolkit</Badge>
          <Badge tone="gray">Mock services</Badge>
          <Badge tone="green">localStorage</Badge>
        </div>
      </Card>

      <div className="two-column">
        <Card>
          <div className="section-heading">
            <span>Choix techniques</span>
            <h2>Architecture V1</h2>
          </div>
          <ul className="clean-list clean-list--block">
            <li>Features Redux isolees par domaine metier.</li>
            <li>Pages composees a partir de composants reutilisables.</li>
            <li>Services simulant des appels API avec latence courte.</li>
            <li>Actions locales persistees pour rendre la demo credible.</li>
          </ul>
        </Card>
        <Card>
          <div className="section-heading">
            <span>Confidentialite</span>
            <h2>Perimetre volontaire</h2>
          </div>
          <ul className="clean-list clean-list--block">
            <li>Aucun code proprietaire ou composant d'entreprise.</li>
            <li>Aucune API privee, URL interne, credential ou token.</li>
            <li>Aucune donnee utilisateur reelle.</li>
            <li>Design et donnees entierement fictifs.</li>
          </ul>
        </Card>
      </div>

      <Card>
        <div className="section-heading">
          <span>Roadmap</span>
          <h2>Suites possibles</h2>
        </div>
        <div className="roadmap">
          <div>
            <strong>V1</strong>
            <span>Frontend mocke deployable</span>
          </div>
          <div>
            <strong>V2</strong>
            <span>API personnelle simple</span>
          </div>
          <div>
            <strong>V3</strong>
            <span>Auth, statistiques et tests avances</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
