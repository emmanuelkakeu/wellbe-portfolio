export type AppPage =
  | 'dashboard'
  | 'generate-plan'
  | 'daily'
  | 'meal-detail'
  | 'activities'
  | 'preferences'
  | 'profile'
  | 'history'
  | 'about'

export interface NavigationItem {
  page: AppPage
  label: string
}

export const navigationItems: NavigationItem[] = [
  { page: 'dashboard', label: 'Dashboard' },
  { page: 'generate-plan', label: 'Generer plan' },
  { page: 'daily', label: 'Programme' },
  { page: 'activities', label: 'Activites' },
  { page: 'preferences', label: 'Preferences' },
  { page: 'profile', label: 'Profil' },
  { page: 'history', label: 'Historique' },
  { page: 'about', label: 'Projet' },
]
