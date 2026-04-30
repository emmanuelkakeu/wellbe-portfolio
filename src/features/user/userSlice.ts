import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { mockUser } from '../../mock/user.mock'
import type { OnboardingProfile, User } from '../../types/domain'

interface UserState {
  currentUser: User
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  currentUser: mockUser,
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.currentUser = action.payload
    },
    updateUserGoal(state, action: PayloadAction<User['goal']>) {
      state.currentUser.goal = action.payload
    },
    updateActivityLevel(state, action: PayloadAction<User['activityLevel']>) {
      state.currentUser.activityLevel = action.payload
    },
    resetUser(state) {
      state.currentUser = mockUser
      state.error = null
      state.loading = false
    },
    applyOnboardingProfile(state, action: PayloadAction<OnboardingProfile>) {
      const birthYear = Number(action.payload.birthDate.slice(0, 4))
      const currentYear = new Date().getFullYear()

      state.currentUser = {
        ...state.currentUser,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        age: birthYear ? currentYear - birthYear : state.currentUser.age,
        goal: action.payload.goal,
        activityLevel: action.payload.activityLevel,
      }
    },
  },
})

export const {
  setUser,
  updateUserGoal,
  updateActivityLevel,
  resetUser,
  applyOnboardingProfile,
} = userSlice.actions
export default userSlice.reducer
