import React, { useState } from 'react';

const FastFoodForm = ({ addFastFoodOption}) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newFastFood = { name, difficulty: 1 };
        addFastFoodOption(newFastFood);
        setName('');
    };

    return(
        <div>
            <h2>Add Restaurant</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Restaurant Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <button type='submit'>Add Restaurant</button>
            </form>
        </div>
    );
};

export default FastFoodForm;