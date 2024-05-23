import React, { useEffect, useState } from 'react';
import RecipeForm from './RecipeForm';
import WorkCalendar from './WorkCalendar';
import moment from 'moment';

const MealPlanner = () => {
    const [recipes, setRecipes] = useState([]);
    const [workDays, setWorkDays] = useState(Array(7).fill(false));
    const [meals, setMeals] = useState(Array(7).fill(''));

    const addRecipe = (recipe) => {
        const updatedRecipes = [...recipes, recipe];
        setRecipes(updatedRecipes);
        localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    };

    const randomizeMeals = () => {
        const newMeals = [];
        let availableRecipes = [...recipes];

        for (let i = 0; i < 7; i++){
            let filteredRecipes = availableRecipes.filter(recipe => workDays[i] ? recipe.difficulty <= 2 : true);

            if (filteredRecipes.length === 0){
                filteredRecipes = availableRecipes;
            }

            if (filteredRecipes.length === 0){
                newMeals.push('No recipes available');
            } else {
                const randomIndex = Math.floor(Math.random() * filteredRecipes.length);
                const meal = filteredRecipes[randomIndex];
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
    }, []);
    
    const weekDates = getWeekDates();

    return (
        <div className='Main-content'>
            <div className='WorkCalendar'>
                <WorkCalendar setWorkDays={setWorkDays} />
            </div>
            <div className='RecipeForm'>
                <RecipeForm addRecipe={addRecipe} />
            </div>
            <button onClick={randomizeMeals}>Randomize Meal Plan</button>
            <ul>
                {meals.map((meal, index) => (
                    <li key={index}>{weekDates[index]}: <br/> {meal}</li>
                ))}
            </ul>
        </div>
    );
};

export default MealPlanner;