import { MENU } from './DataItems';

interface MenuDishProps {
    onDishChange: (selectedDishes: { [key: string]: number }) => void;
    selectedDishes: { [key: string]: number };
}

function MenuItems({ onDishChange, selectedDishes }: MenuDishProps) {
    const increaseQuantity = (dishName: string) => {
        const updatedDishes = { ...selectedDishes };
        updatedDishes[dishName] = (selectedDishes[dishName] || 0) + 1;
        onDishChange(updatedDishes);
    };

    const decreaseQuantity = (dishName: string) => {
        if (selectedDishes[dishName] && selectedDishes[dishName] > 0) {
            const updatedDishes = { ...selectedDishes };
            updatedDishes[dishName] -= 1;
            onDishChange(updatedDishes);
        }
    };

    return (
        <div className="CreatingOrderBlock">
            {MENU.map((dish) => (
                <div key={dish.name} className="MenuItems">
                    <button onClick={() => increaseQuantity(dish.name)}>
                        <span>{dish.name}</span>
                        <p>Price: {dish.price}</p>
                    </button>
                    <button onClick={() => decreaseQuantity(dish.name)}>Remove</button>
                </div>
            ))}
        </div>
    );
}

export default MenuItems;
