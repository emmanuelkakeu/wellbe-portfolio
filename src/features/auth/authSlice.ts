import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { OnboardingProfile } from '../../types/domain'
import { readStorage, writeStorage } from '../../utils/storage'

const sessionKey = 'wellbe.authSession'
const profileKey = 'wellbe.onboardingProfile'
const planStatusKey = 'wellbe.hasNutritionPlan'

type AuthStatus = 'guest' | 'onboarding' | 'authenticated'

interface AuthState {
  status: AuthStatus
  mode: 'signin' | 'signup'
  email: string
  profile: OnboardingProfile | null
  hasNutritionPlan: boolean
}

const hasSession = readStorage<boolean>(sessionKey, false)

const initialState: AuthState = {
  status: hasSession ? 'authenticated' : 'guest',
  mode: 'signin',
  email: readStorage<string>('wellbe.lastEmail', 'emma.demo@wellbe.local'),
  profile: readStorage<OnboardingProfile | null>(profileKey, null),
  hasNutritionPlan: readStorage<boolean>(planStatusKey, false),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openSignIn(state) {
      state.mode = 'signin'
      state.status = 'guest'
    },
    openSignUp(state) {
      state.mode = 'signup'
      state.status = 'guest'
    },
    signIn(state, action: PayloadAction<string>) {
      state.email = action.payload
      state.status = 'authenticated'
      writeStorage(sessionKey, true)
      writeStorage('wellbe.lastEmail', action.payload)
    },
    beginOnboarding(state, action: PayloadAction<string>) {
      state.email = action.payload
      state.status = 'onboarding'
      writeStorage('wellbe.lastEmail', action.payload)
    },
    completeOnboarding(state, action: PayloadAction<OnboardingProfile>) {
      state.profile = action.payload
      state.email = action.payload.email
      state.status = 'authenticated'
      state.hasNutritionPlan = false
      writeStorage(profileKey, action.payload)
      writeStorage(sessionKey, true)
      writeStorage(planStatusKey, false)
    },
    markPlanReady(state) {
      state.hasNutritionPlan = true
      writeStorage(planStatusKey, true)
    },
    signOut(state) {
      state.status = 'guest'
      writeStorage(sessionKey, false)
    },
  },
})

export const {
  openSignIn,
  openSignUp,
  signIn,
  beginOnboarding,
  completeOnboarding,
  markPlanReady,
  signOut,
} = authSlice.actions
export default authSlice.reducer
