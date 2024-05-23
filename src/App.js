import React from 'react';
import './App.css';
import MealPlanner from './components/MealPlanner';
import logo from './logo.png';

function App() {
  return (
    <div className="App">
      <header className='App-header'>
        <img src={logo} alt='logo' className='App-logo' />
      </header>
      <MealPlanner />
    </div>
  );
}

export default App;