
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import recipeData from '../data.json';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Simulate API call
    setRecipes(recipeData);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Recipe Sharing Platform</h1>
        <p className="text-gray-600 mb-6">Discover and share delicious recipes from around the world</p>
        <Link 
          to="/add-recipe" 
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Add New Recipe
        </Link>
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <Link 
            key={recipe.id} 
            to={`/recipe/${recipe.id}`}
            className="block"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <img 
                src={recipe.image} 
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{recipe.title}</h3>
                <p className="text-gray-600">{recipe.summary}</p>
                <div className="mt-4 flex items-center text-green-500 font-medium">
                  View Recipe
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {recipes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No recipes found. Be the first to add one!</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;