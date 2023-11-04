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
                    if (ingredientCount > 0) {
                        return (
                            <div key={ingredientName} className={ingredientName}>
                                {`${ingredientName} x${ingredientCount}`}
                            </div>
                        );
                    }
                    return null;
                })}
                <p className="Price">Total price: {orderPrice} som</p>
            </div>
            <Ingredients onIngredientChange={handleIngredientChange} selectedIngredients={selectedIngredients} />
        </div>
    );
}

export default Burger;
