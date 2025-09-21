import useRecipeStore from '../stores/recipeStore';

const DeleteRecipeButton = ({ recipeId, recipeTitle, onDelete, className = '' }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${recipeTitle}"?`)) {
      deleteRecipe(recipeId);
      if (onDelete) {
        onDelete(); // Optional callback after deletion
      }
    }
  };

  return (
    <button 
      onClick={handleDelete}
      className={`delete-btn ${className}`}
      title={`Delete ${recipeTitle}`}
      aria-label={`Delete recipe: ${recipeTitle}`}
    >
      Delete
    </button>
  );
};

export default DeleteRecipeButton;
