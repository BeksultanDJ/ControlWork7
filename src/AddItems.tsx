import React from 'react';
import {INGREDIENTS} from './DataItems';

interface IngredientsProps {
    onIngredientChange: (selectedIngredients: { [key: string]: number }) => void;
    selectedIngredients: { [key: string]: number };
}

function Ingredients({onIngredientChange, selectedIngredients}: IngredientsProps) {
    const increaseQuantity = (ingredientName: string) => {
        const updatedIngredients = {...selectedIngredients};
        updatedIngredients[ingredientName] = (selectedIngredients[ingredientName] || 0) + 1;
        onIngredientChange(updatedIngredients);
    };

    const decreaseQuantity = (ingredientName: string) => {
        if (selectedIngredients[ingredientName] && selectedIngredients[ingredientName] > 0) {
            const updatedIngredients = {...selectedIngredients};
            updatedIngredients[ingredientName] -= 1;
            onIngredientChange(updatedIngredients);
        }
    };

    return (
        <div className="addIngredientsBlock">
            {INGREDIENTS.map((ingredient) => (
                <div key={ingredient.name} className="IngredientsBtn">
                    <button onClick={() => increaseQuantity(ingredient.name)}>
                        <img className="ingredient" src={ingredient.image} alt={ingredient.name}/>
                    </button>
                    <span>{ingredient.name}</span>
                    <span>{selectedIngredients[ingredient.name] || 0}</span>
                    <button onClick={() => decreaseQuantity(ingredient.name)}>Remove</button>
                </div>
            ))}
        </div>
    );
}

export default Ingredients;
