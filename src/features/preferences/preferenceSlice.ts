import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { mockUser } from '../../mock/user.mock'
import type { Preference } from '../../types/domain'
import { readStorage, writeStorage } from '../../utils/storage'

const preferencesKey = 'wellbe.preferences'

interface PreferenceState {
  preferences: Preference[]
  loading: boolean
  error: string | null
}

const initialState: PreferenceState = {
  preferences: readStorage<Preference[]>(preferencesKey, mockUser.preferences),
  loading: false,
  error: null,
}

function persist(preferences: Preference[]) {
  writeStorage(preferencesKey, preferences)
}

const preferenceSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    togglePreference(state, action: PayloadAction<string>) {
      const preference = state.preferences.find((item) => item.id === action.payload)
      if (preference) {
        preference.enabled = !preference.enabled
      }
      persist(state.preferences)
    },
    addPreference(state, action: PayloadAction<Preference>) {
      state.preferences.push(action.payload)
      persist(state.preferences)
    },
    removePreference(state, action: PayloadAction<string>) {
      state.preferences = state.preferences.filter(
        (preference) => preference.id !== action.payload,
      )
      persist(state.preferences)
    },
    updatePreferences(state, action: PayloadAction<Preference[]>) {
      state.preferences = action.payload
      persist(state.preferences)
    },
  },
})

export const {
  togglePreference,
  addPreference,
  removePreference,
  updatePreferences,
} = preferenceSlice.actions
export default preferenceSlice.reducer
