import type { Activity } from '../types/domain'
import { wait } from './wait'

export async function addActivity(activity: Activity): Promise<Activity> {
  await wait()
  return activity
}
