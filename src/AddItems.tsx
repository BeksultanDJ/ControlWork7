import {MENU} from './DataItems';

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
        <div className="CreatingOrderBlock">
            {MENU.map((ingredient) => (
                <div key={ingredient.name} className="MenuItems">
                    <button onClick={() => increaseQuantity(ingredient.name)}>
                        <span>{ingredient.name}</span>
                    </button>
                    <button onClick={() => decreaseQuantity(ingredient.name)}>Remove</button>
                </div>
            ))}
        </div>
    );
}

export default Ingredients;
