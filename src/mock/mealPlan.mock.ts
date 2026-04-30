import { mockDailyGoal, mockUser } from './user.mock'
import type { MealPlan } from '../types/domain'

export const mockMealPlan: MealPlan = {
  id: 'plan-2026-05-01',
  date: '2026-05-01',
  userId: mockUser.id,
  dailyGoal: mockDailyGoal,
  consumedNutrition: {
    calories: 420,
    protein: 24,
    carbs: 58,
    fat: 10,
  },
  meals: [
    {
      id: 'meal-breakfast-1',
      type: 'breakfast',
      title: 'Bol avoine, fruits rouges et yaourt',
      recommendedTime: '08:00',
      consumed: true,
      nutrition: {
        calories: 420,
        protein: 24,
        carbs: 58,
        fat: 10,
      },
      recipe: {
        id: 'recipe-oat-bowl',
        title: 'Bol avoine proteine',
        description: 'Un petit-dejeuner simple, riche en fibres et proteines.',
        imageUrl:
          'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=900&q=80',
        tags: ['breakfast', 'high-protein', 'quick'],
        ingredients: [
          { id: 'ing-1', name: "Flocons d'avoine", quantity: 60, unit: 'g' },
          { id: 'ing-2', name: 'Yaourt grec', quantity: 150, unit: 'g' },
          { id: 'ing-3', name: 'Fruits rouges', quantity: 80, unit: 'g' },
        ],
        steps: [
          'Verser les flocons dans un bol.',
          'Ajouter le yaourt grec.',
          'Deposer les fruits rouges sur le dessus.',
        ],
      },
    },
    {
      id: 'meal-lunch-1',
      type: 'lunch',
      title: 'Poulet grille, riz complet et legumes',
      recommendedTime: '12:30',
      consumed: false,
      nutrition: {
        calories: 680,
        protein: 45,
        carbs: 78,
        fat: 18,
      },
      recipe: {
        id: 'recipe-chicken-rice',
        title: 'Assiette poulet equilibree',
        description:
          'Un dejeuner complet avec proteines, glucides complexes et legumes.',
        imageUrl:
          'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=900&q=80',
        tags: ['lunch', 'balanced', 'high-protein'],
        ingredients: [
          { id: 'ing-4', name: 'Blanc de poulet', quantity: 150, unit: 'g' },
          { id: 'ing-5', name: 'Riz complet', quantity: 120, unit: 'g' },
          { id: 'ing-6', name: 'Brocoli', quantity: 100, unit: 'g' },
        ],
        steps: [
          'Griller le poulet avec des epices douces.',
          'Cuire le riz complet.',
          'Ajouter les legumes vapeur.',
        ],
      },
    },
    {
      id: 'meal-snack-1',
      type: 'snack',
      title: 'Smoothie banane et beurre de cacahuete',
      recommendedTime: '16:00',
      consumed: false,
      nutrition: {
        calories: 310,
        protein: 18,
        carbs: 36,
        fat: 11,
      },
      recipe: {
        id: 'recipe-smoothie',
        title: 'Smoothie energie',
        description: "Une collation rapide pour soutenir l'energie de l'apres-midi.",
        imageUrl:
          'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=900&q=80',
        tags: ['snack', 'quick'],
        ingredients: [
          { id: 'ing-7', name: 'Banane', quantity: 1, unit: 'piece' },
          { id: 'ing-8', name: 'Lait vegetal', quantity: 200, unit: 'ml' },
          { id: 'ing-9', name: 'Beurre de cacahuete', quantity: 1, unit: 'tbsp' },
        ],
        steps: [
          'Ajouter tous les ingredients dans un blender.',
          'Mixer pendant 30 secondes.',
          'Servir frais.',
        ],
      },
    },
    {
      id: 'meal-dinner-1',
      type: 'dinner',
      title: 'Saumon, patate douce et salade',
      recommendedTime: '19:30',
      consumed: false,
      nutrition: {
        calories: 690,
        protein: 42,
        carbs: 58,
        fat: 31,
      },
      recipe: {
        id: 'recipe-salmon-dinner',
        title: 'Diner saumon complet',
        description: 'Un diner riche en omega-3 et en glucides de qualite.',
        imageUrl:
          'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80',
        tags: ['dinner', 'omega-3', 'balanced'],
        ingredients: [
          { id: 'ing-10', name: 'Filet de saumon', quantity: 160, unit: 'g' },
          { id: 'ing-11', name: 'Patate douce', quantity: 180, unit: 'g' },
          { id: 'ing-12', name: 'Salade verte', quantity: 80, unit: 'g' },
        ],
        steps: [
          'Cuire le saumon au four.',
          'Rotir la patate douce.',
          'Servir avec une salade fraiche.',
        ],
      },
    },
  ],
}
