import { useState } from 'react';
import Dishes from './AddItems';
import { MENU } from './DataItems';

function Order() {
    const [selectedDishes, setSelectedDishes] = useState<{ [key: string]: number }>({});
    const [orderPrice, setOrderPrice] = useState(0);

    const handleDishChange = (newDishes: { [key: string]: number }) => {
        setSelectedDishes(newDishes);

        const newOrderPrice =
            Object.keys(newDishes).reduce((price, dish) => {
                return price + (MENU.find((item) => item.name === dish)?.price || 0) * newDishes[dish];
            }, 0);
        setOrderPrice(newOrderPrice);
    };

    return (
        <div className="Order">
            <div className="OrderDetails">
                {Object.keys(selectedDishes).map((dishesName) => {
                    const dishCount = selectedDishes[dishesName];
                    if (dishCount > 0) {
                        return (
                            <div key={dishesName} className={dishesName}>
                                {`${dishesName} x${dishCount}`}
                            </div>
                        );
                    }
                    return null;
                })}
                <p className="Price">Total price: {orderPrice} som</p>
            </div>
            <Dishes onDishChange={handleDishChange} selectedDishes={selectedDishes} />
        </div>
    );
}

export default Order;
