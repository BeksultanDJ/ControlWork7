import {MENU} from './DataItems';

interface MenuDishProps {
    onDishChange: (selectedDishes: { [key: string]: number }) => void;
    selectedDishes: { [key: string]: number };
}

function MenuItems({onDishChange, selectedDishes}: MenuDishProps) {
    const increaseQuantity = (dishName: string) => {
        const updatedDishes = {...selectedDishes};
        updatedDishes[dishName] = (selectedDishes[dishName] || 0) + 1;
        onDishChange(updatedDishes);
    };

    return (
        <div>
            <h3 className="MenuTitle">Menu</h3>
            <div className="CreatingOrderBlock">
                {MENU.map((dish) => (
                    <div key={dish.name}>
                        <button className="MenuItems" onClick={() => increaseQuantity(dish.name)}>
                            <span>{dish.name}</span>
                            <p>Price: {dish.price} KGZ</p>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MenuItems;
