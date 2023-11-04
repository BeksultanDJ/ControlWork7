import React, {useState} from 'react';
import Ingredients from './AddItems';
import {INGREDIENTS} from './DataItems';

function Burger() {
    const [selectedIngredients, setSelectedIngredients] = useState<{ [key: string]: number }>({});
    const [burgerPrice, setBurgerPrice] = useState(30);

    const handleIngredientChange = (newIngredients: { [key: string]: number }) => {
        setSelectedIngredients(newIngredients);

        const newBurgerPrice = 30 +
            Object.keys(newIngredients).reduce((price, ingredient) => {
                return price + (INGREDIENTS.find((item) => item.name === ingredient)?.price || 0) * newIngredients[ingredient];
            }, 0);
        setBurgerPrice(newBurgerPrice);
    };

    return (
        <div className="DoneBurger">
            <div className="Burger">
                <div className="BreadTop">
                    <div className="Seeds1"></div>
                    <div className="Seeds2"></div>
                </div>
                {Object.keys(selectedIngredients).map((ingredientName, index) => {
                    const ingredientCount = selectedIngredients[ingredientName];
                    const elements = [];
                    for (let i = 0; i < ingredientCount; i++) {
                        elements.push(<div key={`${ingredientName}-${i}`} className={ingredientName}></div>);
                    }
                    return elements;
                })}
                <div className="BreadBottom"></div>
                <p className="Price">Price = {burgerPrice} som</p>
            </div>
            <Ingredients onIngredientChange={handleIngredientChange} selectedIngredients={selectedIngredients}/>
        </div>
    );
}

export default Burger;
