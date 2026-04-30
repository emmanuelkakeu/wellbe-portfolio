import type { Preference } from '../types/domain'
import { wait } from './wait'

export async function updatePreferences(
  preferences: Preference[],
): Promise<Preference[]> {
  await wait()
  return preferences
}
