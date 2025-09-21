import create from 'zustand';
import {persist} from 'zustand/middleware';

export const useRecipeStore = create(persist(set, get => ({
  recipes: [],
  favorites: [],
  recommendations: [],
  searchTerm: '',
  setSearchTerm: (term) => set({searchTerm: term}),
  
  addRecipe: (recipe) => set(state => ({ recipes: [...state.recipes, recipe] })),
  updateRecipe: (updatedRecipe) => set(state => ({
    recipes: state.recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    ),
    deleteRecipe: (recipeId) => set(state => ({
      recipes: state.recipes.filter(recipe => recipe.id !== recipeId),
      favorites: state.favorites.filter(id => id !== recipeId)
    })),
    
  })),
  recommendations: [],
  generateRecommendations: () => set(state => {
    // Mock implementation based on favorites
    const recommended = state.recipes.filter(recipe =>
      state.favorites.includes(recipe.id) && Math.random() > 0.5
    );
    return { recommendations: recommended };
  }),
})));
getFilteredRecipes: () => {
    const { recipes, searchTerm } = get();
    if (!searchTerm) return recipes;
    return recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }