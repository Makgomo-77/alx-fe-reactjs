import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from '../stores/recipeStore';

const EditRecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipeId = parseInt(id);
  const recipe = useRecipeStore((state) => 
    state.recipes.find((recipe) => recipe.id === recipeId)
  );
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setDescription(recipe.description);
    }
  }, [recipe]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim() && description.trim()) {
      updateRecipe(recipeId, { title, description });
      navigate('/');
    }
  };

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="edit-recipe-form">
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Recipe Title"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Recipe Description"
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit">Update Recipe</button>
          <button type="button" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipeForm;
