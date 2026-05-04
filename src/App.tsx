import { useEffect, useState } from 'react'
import './App.css'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { AppLayout } from './components/layout/AppLayout'
import type { AppPage } from './components/layout/navigation'
import {
  openSignIn,
  openSignUp,
} from './features/auth/authSlice'
import {
  selectAuthStatus,
  selectHasNutritionPlan,
  selectOnboardingProfile,
} from './features/auth/authSelectors'
import { applyOnboardingProfile } from './features/user/userSlice'
import { AboutProjectPage } from './pages/AboutProjectPage'
import { ActivitiesPage } from './pages/ActivitiesPage'
import { AuthPage } from './pages/AuthPage'
import { DailyProgramPage } from './pages/DailyProgramPage'
import { DashboardPage } from './pages/DashboardPage'
import { HistoryPage } from './pages/HistoryPage'
import { LandingPage } from './pages/LandingPage'
import { MealDetailPage } from './pages/MealDetailPage'
import { OnboardingPage } from './pages/OnboardingPage'
import { PlanGeneratorPage } from './pages/PlanGeneratorPage'
import { PreferencesPage } from './pages/PreferencesPage'
import { ProfilePage } from './pages/ProfilePage'

function App() {
  const dispatch = useAppDispatch()
  const authStatus = useAppSelector(selectAuthStatus)
  const hasNutritionPlan = useAppSelector(selectHasNutritionPlan)
  const onboardingProfile = useAppSelector(selectOnboardingProfile)
  const [activePage, setActivePage] = useState<AppPage | null>(null)
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null)
  const [publicPage, setPublicPage] = useState<'landing' | 'auth'>('landing')
  const displayedPage: AppPage =
    authStatus === 'authenticated' && !hasNutritionPlan && activePage === null
      ? 'generate-plan'
      : activePage ?? 'dashboard'

  useEffect(() => {
    if (authStatus === 'authenticated' && onboardingProfile) {
      dispatch(applyOnboardingProfile(onboardingProfile))
    }
  }, [authStatus, dispatch, onboardingProfile])

  function openMeal(mealId: string) {
    setSelectedMealId(mealId)
    setActivePage('meal-detail')
  }

  function renderPage() {
    switch (displayedPage) {
      case 'generate-plan':
        return <PlanGeneratorPage onPlanReady={() => setActivePage('daily')} />
      case 'daily':
        return <DailyProgramPage onNavigate={setActivePage} onOpenMeal={openMeal} />
      case 'meal-detail':
        return (
          <MealDetailPage
            mealId={selectedMealId}
            onBack={() => setActivePage('daily')}
          />
        )
      case 'activities':
        return <ActivitiesPage />
      case 'preferences':
        return <PreferencesPage />
      case 'profile':
        return <ProfilePage />
      case 'history':
        return <HistoryPage />
      case 'about':
        return <AboutProjectPage />
      case 'dashboard':
      default:
        return <DashboardPage onNavigate={setActivePage} onOpenMeal={openMeal} />
    }
  }

  if (authStatus === 'onboarding') {
    return <OnboardingPage />
  }

  if (authStatus === 'guest') {
    if (publicPage === 'auth') {
      return (
        <AuthPage
          onBack={() => setPublicPage('landing')}
          onSwitchMode={(mode) => {
            dispatch(mode === 'signup' ? openSignUp() : openSignIn())
          }}
        />
      )
    }

    return (
      <LandingPage
        onSignIn={() => {
          dispatch(openSignIn())
          setPublicPage('auth')
        }}
        onSignUp={() => {
          dispatch(openSignUp())
          setPublicPage('auth')
        }}
      />
    )
  }

  return (
    <AppLayout activePage={displayedPage} onNavigate={setActivePage}>
      {renderPage()}
    </AppLayout>
  )
}

export default App
