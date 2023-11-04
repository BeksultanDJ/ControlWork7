import { useState } from 'react';
import Ingredients from './AddItems';
import { MENU } from './DataItems';

function Burger() {
    const [selectedIngredients, setSelectedIngredients] = useState<{ [key: string]: number }>({});
    const [orderPrice, setOrderPrice] = useState(0);

    const handleIngredientChange = (newIngredients: { [key: string]: number }) => {
        setSelectedIngredients(newIngredients);

        const newOrderPrice =
            Object.keys(newIngredients).reduce((price, ingredient) => {
                return price + (MENU.find((item) => item.name === ingredient)?.price || 0) * newIngredients[ingredient];
            }, 0);
        setOrderPrice(newOrderPrice);
    };

    return (
        <div className="Order">
            <div className="OrderDetails">
                {Object.keys(selectedIngredients).map((ingredientName) => {
                    const ingredientCount = selectedIngredients[ingredientName];
                    const elements = [];
                    for (let i = 0; i < ingredientCount; i++) {
                        elements.push(
                            <div key={`${ingredientName}-${i}`} className={ingredientName}>
                                {ingredientName} x{selectedIngredients[ingredientName] || 0}
                            </div>
                        );
                    }
                    return elements;
                })}
                <p className="Price">Total price: {orderPrice} som</p>
            </div>
            <Ingredients onIngredientChange={handleIngredientChange} selectedIngredients={selectedIngredients} />
        </div>
    );
}

export default Burger;
