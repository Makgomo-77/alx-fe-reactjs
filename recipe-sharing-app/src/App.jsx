import React, {useEffect} from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import RecipeList from './RecipeList';
import AddRecipeForm from './AddRecipeForm';
import RecipeDetail from './RecipeDetail';
import SearchBar from './SearchBar';
import { useRecipeStore } from './recipeStore';

const App = () => {
  const fetchRecipes = useRecipeStore(state => state.fetchRecipes);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return (
    <div>
      <h1>Recipe Sharing App</h1>
      <SearchBar />
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/add" element={<AddRecipeForm />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </div>
  );
};

export default App;