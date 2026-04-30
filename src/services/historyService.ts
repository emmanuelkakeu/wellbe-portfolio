import { mockHistory } from '../mock/history.mock'
import type { HistoryEntry } from '../types/domain'
import { wait } from './wait'

export async function getHistory(): Promise<HistoryEntry[]> {
  await wait()
  return mockHistory
}
