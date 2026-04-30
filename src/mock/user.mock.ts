import type { DailyGoal, User } from '../types/domain'

export const mockDailyGoal: DailyGoal = {
  calories: 2100,
  protein: 120,
  carbs: 230,
  fat: 70,
  waterMl: 2000,
  mealsCount: 4,
}

export const mockUser: User = {
  id: 'user-demo-1',
  firstName: 'Emma',
  age: 27,
  avatarUrl:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80',
  goal: 'healthy_lifestyle',
  activityLevel: 'moderate',
  preferences: [
    { id: 'pref-1', label: 'Riche en proteines', type: 'diet', enabled: true },
    { id: 'pref-2', label: 'Sans lactose', type: 'diet', enabled: false },
    { id: 'pref-3', label: 'Arachides', type: 'allergy', enabled: true },
    { id: 'pref-4', label: 'Saumon', type: 'favorite', enabled: true },
    { id: 'pref-5', label: 'Boissons sucrees', type: 'avoid', enabled: true },
  ],
}
