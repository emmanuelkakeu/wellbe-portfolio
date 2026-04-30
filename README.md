# Wellbe Portfolio

Application React de bien-etre et nutrition construite pour un portfolio frontend.

Ce projet est une reconstruction personnelle avec donnees fictives et services mockes. Il ne contient aucun code proprietaire, aucune API privee, aucun credential, aucune donnee utilisateur reelle et aucune information confidentielle.

## Fonctionnalites

- Dashboard journalier avec calories, macros, repas et activites.
- Parcours d'arrivee avec inscription, connexion et onboarding progressif.
- Generation simulee d'un plan nutritionnel personnalise.
- Programme alimentaire du jour avec consommation de repas.
- Detail recette avec ingredients, instructions, tags et valeurs nutritionnelles.
- Activites planifiees, ajout local et statut termine.
- Preferences alimentaires fictives avec persistance locale.
- Profil utilisateur demo.
- Historique simule sur 7 jours.
- Notifications locales pour les actions principales.

## Stack Technique

- React
- TypeScript
- Redux Toolkit
- React Redux
- Vite
- Mock data
- Services asynchrones simules
- localStorage

## Parcours Produit

1. Le visiteur arrive sur une page publique et choisit connexion ou inscription.
2. L'inscription collecte progressivement les informations utiles: identite, objectif, niveau d'activite, mensurations, repas preferes et aliments a eviter.
3. La connexion simule la recuperation d'une session et d'un plan existant.
4. Si aucun plan n'existe, l'utilisateur passe par un generateur de plan.
5. Le generateur prend en compte l'objectif de poids, le profil, les activites prevues, les repas souhaites et les restrictions alimentaires.
6. Le plan est stocke localement comme s'il venait d'un backend personnel.

## Installation

```bash
npm install
```

## Lancement Local

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Structure

```text
src/
  app/
  components/
  features/
  hooks/
  mock/
  pages/
  services/
  types/
  utils/
```

## Confidentialite

This project is a personal portfolio reconstruction using fictional data and mock services. It does not contain proprietary code, private APIs, credentials, real user data, or confidential business information.

## Prochaines Ameliorations

- Ajouter des tests unitaires sur les reducers et utilitaires nutritionnels.
- Remplacer progressivement les mocks par une API personnelle.
- Ajouter des graphiques avances et filtres d'historique.
- Ajouter des captures d'ecran apres deploiement Vercel ou Netlify.
