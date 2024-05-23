import React, { useEffect, useState } from 'react';

const RecipeForm = ({ addRecipe, deleteRecipe, editRecipe, recipes }) => {
    const [name, setName] = useState('');
    const [difficulty, setDifficulty] = useState(1);
    const [storedRecipes, setStoredRecipes] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [originalName, setOriginalName] = useState('');

    useEffect(() => {
        const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        if (Array.isArray(savedRecipes)) {
            setStoredRecipes(savedRecipes);
        } else {
            setStoredRecipes([]);
        }
    }, [recipes]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            editRecipe(originalName, name, difficulty);
            setIsEditing(false);
        } else {
            const duplicateRecipe = storedRecipes.some(recipe => recipe.name.toLowerCase() === name.toLowerCase());
            if (duplicateRecipe) {
                alert('Recipe with this name already exists');
                return;
            }
            const newRecipe = { name, difficulty: parseInt(difficulty) };
            addRecipe(newRecipe);
            // const updatedRecipes = [...storedRecipes, newRecipe];
            // setStoredRecipes(updatedRecipes);
            // localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
        }
        setName('');
        setDifficulty(1);
        setOriginalName('');
    };

    const handleDelete = () => {
        if (!name) {
            alert('Select a recipe to delete');
            return;
        }
        deleteRecipe(name);
        setName('');
        setDifficulty(1);
        setIsEditing(false);
        setOriginalName('');
    };

    const handleSelectChange = (e) => {
        const selectedRecipe = storedRecipes.find(recipe => recipe.name === e.target.value);
        if (selectedRecipe) {
            setName(selectedRecipe.name);
            setDifficulty(selectedRecipe.difficulty);
            setIsEditing(true);
            setOriginalName(selectedRecipe.name);
        } else {
            setName('');
            setDifficulty(1);
            setIsEditing(false);
            setOriginalName('');
        }
    };

    const sortedRecipes = [...storedRecipes].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div>
            <h2>{isEditing ? 'Edit Recipe' : 'Add Recipe'}</h2>
            <form onSubmit={handleSubmit}>
                <select onChange={handleSelectChange}>
                    <option value="">Select a Recipe</option>
                    {sortedRecipes.map((recipe, index) => (
                        <option key={index} value={recipe.name}>{recipe.name}, {recipe.difficulty}</option>
                    ))}
                </select>
                <input 
                type="text" 
                placeholder="Recipe Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
                <input
                type="number"
                min="1"
                max="5"
                placeholder="Difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                required
                />
                <button type="submit">{isEditing ? 'Save Changes' : 'Add Recipe'}</button>
            </form>
            <button onClick={handleDelete}>Delete Recipe</button>
        </div>
    );
};

export default RecipeForm;