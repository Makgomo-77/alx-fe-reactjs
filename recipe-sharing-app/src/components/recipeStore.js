import create from 'zustand'

const useRecipeStore = create(set => ({
  recipes: [],
  addRecipe: (newRecipe) => set(state => ({ recipes: [...state.recipes, newRecipe] })),
  setRecipes: (recipes) => set({ recipes })
}));

const { create } = Zustand;
const { useState } = React;
const { BrowserRouter, Routes, Route, Link, useParams, useNavigate } = ReactRouterDOM;

// Zustand store for recipes
const useRecipeStore = create((set) => ({
    recipes: [
        {
            id: '1',
            title: 'Vegetable Pasta',
            description: 'A delicious and healthy pasta dish loaded with fresh vegetables.',
            ingredients: 'Pasta, Bell peppers, Zucchini, Cherry tomatoes, Olive oil, Garlic, Basil',
            instructions: '1. Cook pasta according to package directions. 2. Sauté garlic in olive oil. 3. Add vegetables and cook until tender. 4. Combine with pasta and garnish with basil.'
        },
        {
            id: '2',
            title: 'Chocolate Chip Cookies',
            description: 'Classic homemade chocolate chip cookies that are soft and chewy.',
            ingredients: 'Flour, Butter, Sugar, Brown sugar, Eggs, Vanilla extract, Baking soda, Chocolate chips',
            instructions: '1. Cream butter and sugars. 2. Beat in eggs and vanilla. 3. Mix in dry ingredients. 4. Fold in chocolate chips. 5. Bake at 375°F for 9-11 minutes.'
        }
    ],
    addRecipe: (recipe) => set((state) => ({ 
        recipes: [...state.recipes, { ...recipe, id: Date.now().toString() }] 
    })),
    updateRecipe: (id, updatedRecipe) => set((state) => ({
        recipes: state.recipes.map(recipe => 
            recipe.id === id ? { ...updatedRecipe, id } : recipe
        )
    })),
    deleteRecipe: (id) => set((state) => ({
        recipes: state.recipes.filter(recipe => recipe.id !== id)
    }))
}));

// Recipe Card Component
const RecipeCard = ({ recipe }) => {
    const navigate = useNavigate();
    
    return (
        <div className="recipe-card">
            <div className="recipe-card-content">
                <h3>{recipe.title}</h3>
                <p>{recipe.description}</p>
                <div className="recipe-actions">
                    <button 
                        className="btn btn-view" 
                        onClick={() => navigate(`/recipe/${recipe.id}`)}
                    >
                        View Details
                    </button>
                    <button 
                        className="btn btn-edit"
                        onClick={() => navigate(`/edit-recipe/${recipe.id}`)}
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

// Recipe List Component
const RecipeList = () => {
    const recipes = useRecipeStore(state => state.recipes);
    const navigate = useNavigate();
    
    return (
        <div>
            <h2 className="page-title">All Recipes</h2>
            <button 
                className="btn btn-add" 
                onClick={() => navigate('/add-recipe')}
            >
                Add New Recipe
            </button>
            
            {recipes.length > 0 ? (
                <div className="recipe-grid">
                    {recipes.map(recipe => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <p>No recipes found. Add your first recipe to get started!</p>
                    <button 
                        className="btn btn-add" 
                        onClick={() => navigate('/add-recipe')}
                    >
                        Add Your First Recipe
                    </button>
                </div>
            )}
        </div>
    );
};

// Recipe Details Component
const RecipeDetails = () => {
    const { id } = useParams();
    const recipe = useRecipeStore(state => 
        state.recipes.find(recipe => recipe.id === id)
    );
    const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    if (!recipe) {
        return <div className="container">Recipe not found</div>;
    }
    
    const handleDelete = () => {
        deleteRecipe(id);
        setShowDeleteModal(false);
        navigate('/');
    };
    
    return (
        <div className="container">
            <div className="recipe-details">
                <h1>{recipe.title}</h1>
                <p><strong>Description:</strong> {recipe.description}</p>
                <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                <p><strong>Instructions:</strong> {recipe.instructions}</p>
                
                <div className="detail-actions">
                    <button 
                        className="btn btn-edit"
                        onClick={() => navigate(`/edit-recipe/${id}`)}
                    >
                        Edit Recipe
                    </button>
                    <button 
                        className="btn btn-delete"
                        onClick={() => setShowDeleteModal(true)}
                    >
                        Delete Recipe
                    </button>
                    <button 
                        className="btn btn-view"
                        onClick={() => navigate('/')}
                    >
                        Back to Recipes
                    </button>
                </div>
            </div>
            
            {showDeleteModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to delete "{recipe.title}"? This action cannot be undone.</p>
                        <div className="modal-actions">
                            <button 
                                className="btn btn-view"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>
                            <button 
                                className="btn btn-delete"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Recipe Form Component (used for both Add and Edit)
const RecipeForm = ({ isEdit = false }) => {
    const { id } = useParams();
    const addRecipe = useRecipeStore(state => state.addRecipe);
    const updateRecipe = useRecipeStore(state => state.updateRecipe);
    const recipes = useRecipeStore(state => state.recipes);
    const navigate = useNavigate();
    
    const existingRecipe = isEdit ? recipes.find(recipe => recipe.id === id) : null;
    
    const [formData, setFormData] = useState({
        title: existingRecipe?.title || '',
        description: existingRecipe?.description || '',
        ingredients: existingRecipe?.ingredients || '',
        instructions: existingRecipe?.instructions || ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isEdit) {
            updateRecipe(id, formData);
        } else {
            addRecipe(formData);
        }
        
        navigate('/');
    };
    
    return (
        <div className="container">
            <h2 className="page-title">{isEdit ? 'Edit Recipe' : 'Add New Recipe'}</h2>
            
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label htmlFor="title">Recipe Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="ingredients">Ingredients</label>
                    <textarea
                        id="ingredients"
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="instructions">Instructions</label>
                    <textarea
                        id="instructions"
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="form-actions">
                    <button type="submit" className="btn btn-add">
                        {isEdit ? 'Update Recipe' : 'Add Recipe'}
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-view"
                        onClick={() => navigate('/')}
                        style={{ marginLeft: '10px' }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

// Navigation Component
const Navigation = () => {
    return (
        <header>
            <nav>
                <div className="logo">RecipeShare</div>
                <div className="nav-links">
                    <Link to="/">All Recipes</Link>
                    <Link to="/add-recipe">Add Recipe</Link>
                </div>
            </nav>
        </header>
    );
};

// Main App Component
const App = () => {
    return (
        <BrowserRouter>
            <Navigation />
            <div className="container">
                <Routes>
                    <Route path="/" element={<RecipeList />} />
                    <Route path="/recipe/:id" element={<RecipeDetails />} />
                    <Route path="/add-recipe" element={<RecipeForm />} />
                    <Route path="/edit-recipe/:id" element={<RecipeForm isEdit={true} />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
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