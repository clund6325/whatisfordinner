import React, { useEffect, useState } from 'react';
import RecipeForm from './RecipeForm';
import FastFoodForm from './FastFoodForm';
import WorkCalendar from './WorkCalendar';
import moment from 'moment';

const MealPlanner = () => {
    const [recipes, setRecipes] = useState([]);
    const [workDays, setWorkDays] = useState(Array(7).fill(false));
    const [meals, setMeals] = useState(Array(7).fill(''));
    const [fastFoodSelection, setFastFoodSelection] = useState(Array(7).fill(false));
    const [fastFoodOptions, setFastFoodOptions] = useState([
        { name: 'McDonalds', difficulty: 1 },
        { name: 'Burger King', difficulty: 1 },
        { name: 'Wendys', difficulty: 1 },
        { name: 'Taco Bell', difficulty: 1 },
        { name: 'KFC', difficulty: 1 },
        { name: 'Popeyes', difficulty: 1 },
        { name: 'Chick-fil-A', difficulty: 1 },
        { name: 'Subway', difficulty: 1 },
        { name: 'Pizza Hut', difficulty: 1 },
        { name: 'Dominos', difficulty: 1 },
        { name: 'Papa Johns', difficulty: 1 },
        { name: 'Little Caesars', difficulty: 1 },
        { name: 'Chipotle', difficulty: 1 },
        { name: 'Panera Bread', difficulty: 1 },
        { name: 'Dairy Queen', difficulty: 1 },
        { name: 'Sonic', difficulty: 1 },
        { name: 'Arbys', difficulty: 1 },
        { name: 'Jack in the Box', difficulty: 1 },
        { name: 'In-N-Out', difficulty: 1 },
        { name: 'Whataburger', difficulty: 1 },
        { name: 'Five Guys', difficulty: 1 },
        { name: 'Shake Shack', difficulty: 1 },
        { name: 'Panda Express', difficulty: 1 }
    ]);

    const addRecipe = (recipe) => {
        const updatedRecipes = [...recipes, recipe];
        setRecipes(updatedRecipes);
        localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    };

    const deleteRecipe = (recipeName) => {
        const updatedRecipes = recipes.filter(recipe => recipe.name !== recipeName);
        setRecipes(updatedRecipes);
        localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    };

    const editRecipe = (oldName, newName, newDifficulty) => {
        const updatedRecipes = recipes.map(recipe => recipe.name === oldName ? {...recipe, name: newName, difficulty: newDifficulty} : recipe);
        setRecipes(updatedRecipes);
        localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    };

    const addFastFoodOption = (fastFood) => {
        const updatedFastFoodOptions = [...fastFoodOptions, fastFood];
        setFastFoodOptions(updatedFastFoodOptions);
        localStorage.setItem('fastFoodOptions', JSON.stringify(updatedFastFoodOptions));
    };

    const toggleFastFood = (index) => {
        const updatedSelections = [...fastFoodSelection];
        updatedSelections[index] = !updatedSelections[index];
        setFastFoodSelection(updatedSelections);
    };

    const randomizeMeals = () => {
        const newMeals = [];
        let availableRecipes = [...recipes];

        for (let i = 0; i < 7; i++){
            let selectedRecipes = availableRecipes.filter(recipe => workDays[i] ? recipe.difficulty <= 2 : true);

            if (fastFoodSelection[i]){
                selectedRecipes = fastFoodOptions;
            }

            if (selectedRecipes.length === 0){
                selectedRecipes = availableRecipes;
            }

            if (selectedRecipes.length === 0){
                newMeals.push('No recipes available');
            } else {
                const randomIndex = Math.floor(Math.random() * selectedRecipes.length);
                const meal = selectedRecipes[randomIndex];
                newMeals.push(meal.name);

                availableRecipes = availableRecipes.filter(recipe => recipe.name !== meal.name);
            }
        }

        setMeals(newMeals);
    };

    const getWeekDates = () => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const lastSunday = new Date(today);
        lastSunday.setDate(today.getDate() - dayOfWeek);
        
        const weekDates = [];

        for (let i = 0; i < 7; i++){
            const date = new Date(lastSunday);
            date.setDate(lastSunday.getDate() + i);
            weekDates.push(moment(date).format('dddd, MMMM Do'));
        }

        return weekDates;
    };
    
    useEffect(() => {
        const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        if (Array.isArray(savedRecipes)){ 
            setRecipes(savedRecipes);
        }

        const savedFastFoodOptions = JSON.parse(localStorage.getItem('fastFoodOptions')) || [];
        if (Array.isArray(savedFastFoodOptions) && savedFastFoodOptions.length > 0) {
            setFastFoodOptions(savedFastFoodOptions);
        }
    }, []);
    
    const weekDates = getWeekDates();

    return (
        <div className='Main-content'>
            <div className='Content-row'>
                <div className='Content-column'>
                    <div className='WorkCalendar'>
                        <WorkCalendar setWorkDays={setWorkDays} />
                    </div>
                </div>
                <div className='Content-column'>
                    <div className='RecipeForm'>
                        <RecipeForm addRecipe={addRecipe} deleteRecipe={deleteRecipe} editRecipe={editRecipe} recipes={recipes} />
                    </div>
                </div>
                <div className='Content-column'>
                    <div className='FastFoodForm'>
                        <FastFoodForm addFastFoodOption={addFastFoodOption} />
                    </div>
                </div>
            </div>
            <button onClick={randomizeMeals}>Randomize Meal Plan</button>
            <ul>
                {meals.map((meal, index) => (
                    <li key={index}>{weekDates[index]}: {meal} 
                        <label>
                            <input 
                                type='checkbox'
                                checked={fastFoodSelection[index]}
                                onChange={() => toggleFastFood(index)}
                            />
                            Fast Food
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MealPlanner;