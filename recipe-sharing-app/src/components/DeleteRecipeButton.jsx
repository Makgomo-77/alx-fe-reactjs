
import { useNavigate } from 'react-router-dom';
import useRecipeStore from '../stores/recipeStore';

const DeleteRecipeButton = ({ 
  recipeId, 
  recipeTitle, 
  onDelete, 
  redirectPath = '/',
  className = '',
  variant = 'text'
}) => {
  const navigate = useNavigate();
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${recipeTitle}"?`)) {
      deleteRecipe(recipeId);
      
      // Call optional callback if provided
      if (onDelete) {
        onDelete();
      }
      
      // Redirect to specified path after deletion
      navigate(redirectPath);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      className={`delete-btn ${className} ${variant === 'icon' ? 'delete-icon-btn' : ''}`}
      title={`Delete ${recipeTitle}`}
      aria-label={`Delete recipe: ${recipeTitle}`}
    >
      {variant === 'icon' ? '🗑️' : 'Delete'}
    </button>
  );
};

export default DeleteRecipeButton;
