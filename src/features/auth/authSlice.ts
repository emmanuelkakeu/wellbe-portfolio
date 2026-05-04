import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import {
  accountExists,
  createAccount,
  findAccount,
  normalizeEmail,
  updateAccount,
  verifyCredentials,
} from '../../services/authService'
import type { OnboardingProfile } from '../../types/domain'
import { readStorage, writeStorage } from '../../utils/storage'

const sessionKey = 'wellbe.authSession'

type AuthStatus = 'guest' | 'onboarding' | 'authenticated'

interface AuthCredentials {
  email: string
  password: string
}

interface AuthState {
  status: AuthStatus
  mode: 'signin' | 'signup'
  email: string
  pendingPassword: string | null
  profile: OnboardingProfile | null
  hasNutritionPlan: boolean
  error: string | null
}

const storedSession = readStorage<string | boolean | null>(sessionKey, null)
const sessionEmail = typeof storedSession === 'string' ? storedSession : null
const sessionAccount = sessionEmail ? findAccount(sessionEmail) : null

const initialState: AuthState = {
  status: sessionAccount ? 'authenticated' : 'guest',
  mode: 'signin',
  email: sessionAccount?.email ?? '',
  pendingPassword: null,
  profile: sessionAccount?.profile ?? null,
  hasNutritionPlan: sessionAccount?.hasNutritionPlan ?? false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openSignIn(state) {
      state.mode = 'signin'
      state.status = 'guest'
      state.error = null
    },
    openSignUp(state) {
      state.mode = 'signup'
      state.status = 'guest'
      state.error = null
    },
    signIn(state, action: PayloadAction<AuthCredentials>) {
      const result = verifyCredentials(action.payload.email, action.payload.password)

      if (!result.ok) {
        state.status = 'guest'
        state.error =
          result.reason === 'not_found'
            ? 'Aucun compte Wellbe ne correspond a cet email.'
            : 'Mot de passe incorrect.'
        writeStorage(sessionKey, null)
        return
      }

      state.email = result.account.email
      state.profile = result.account.profile
      state.hasNutritionPlan = result.account.hasNutritionPlan
      state.status = 'authenticated'
      state.pendingPassword = null
      state.error = null
      writeStorage(sessionKey, result.account.email)
    },
    beginOnboarding(state, action: PayloadAction<AuthCredentials>) {
      const email = normalizeEmail(action.payload.email)

      if (accountExists(email)) {
        state.status = 'guest'
        state.error = 'Un compte existe deja avec cet email. Connectez-vous.'
        return
      }

      state.email = email
      state.pendingPassword = action.payload.password
      state.status = 'onboarding'
      state.error = null
    },
    completeOnboarding(state, action: PayloadAction<OnboardingProfile>) {
      if (!state.pendingPassword) {
        state.status = 'guest'
        state.error = 'Session d inscription expiree. Recommencez l inscription.'
        return
      }

      const account = createAccount(
        state.email,
        state.pendingPassword,
        action.payload,
      )

      state.profile = account.profile
      state.email = account.email
      state.status = 'authenticated'
      state.pendingPassword = null
      state.hasNutritionPlan = account.hasNutritionPlan
      state.error = null
      writeStorage(sessionKey, account.email)
    },
    markPlanReady(state) {
      state.hasNutritionPlan = true
      updateAccount(state.email, { hasNutritionPlan: true })
    },
    signOut(state) {
      state.status = 'guest'
      state.pendingPassword = null
      state.error = null
      writeStorage(sessionKey, null)
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
