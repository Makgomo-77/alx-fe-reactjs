import create from 'zustand';

const useRecipeStore = create(set => ({
  recipes: [],
  favorites: [],
  addFavorite: (recipeId) => set(state => ({ favorites: [...state.favorites, recipeId] })),
  removeFavorite: (recipeId) => set(state => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),
  recommendations: [],
  generateRecommendations: () => set(state => {
    // Mock implementation based on favorites
    const recommended = state.recipes.filter(recipe =>
      state.favorites.includes(recipe.id) && Math.random() > 0.5
    );
    return (
      <div>
        <h2>My favorites</h2>
        {favorites.map(recipe =>
        (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
          </div>
      </div>;
  }),

}));
export default RecommendationsList;

