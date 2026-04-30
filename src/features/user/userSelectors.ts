import type { RootState } from '../../app/store'

export const selectCurrentUser = (state: RootState) => state.user.currentUser
