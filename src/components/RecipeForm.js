import React, { useEffect, useState } from 'react';

const RecipeForm = ({ addRecipe }) => {
    const [name, setName] = useState('');
    const [difficulty, setDifficulty] = useState(1);
    const [storedRecipes, setStoredRecipes] = useState([]);

    useEffect(() => {
        const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        if (Array.isArray(savedRecipes)) {
            setStoredRecipes(savedRecipes);
        } else {
            setStoredRecipes([]);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecipe = { name, difficulty: parseInt(difficulty) };
        addRecipe(newRecipe);
        const updatedRecipes = [...storedRecipes, newRecipe];
        setStoredRecipes(updatedRecipes);
        localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
        setName('');
        setDifficulty(1);
    };

    const handleSelectChange = (e) => {
        const selectedRecipe = storedRecipes.find(recipe => recipe.name === e.target.value);
        if (selectedRecipe) {
            setName(selectedRecipe.name);
            setDifficulty(selectedRecipe.difficulty);
        }
    };

    const sortedRecipes = [...storedRecipes].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div>
            <h2>Add Recipe</h2>
            <form onSubmit={handleSubmit}>
                <select onChange={handleSelectChange}>
                    <option value="">Select a recipe</option>
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
                <button type="submit">Add Recipe</button>
            </form>
        </div>
    );
};

export default RecipeForm;