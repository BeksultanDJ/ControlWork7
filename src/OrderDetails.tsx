import { useState } from 'react';
import Dishes from './AddItems';
import { MENU } from './DataItems';

function Order() {
    const [selectedDishes, setSelectedDishes] = useState<{ [key: string]: number }>({});
    const [orderPrice, setOrderPrice] = useState(0);

    const handleDishChange = (newDishes: { [key: string]: number }) => {
        setSelectedDishes(newDishes);

        const newOrderPrice = Object.keys(newDishes).reduce((price, dish) => {
            const menuItem = MENU.find((item) => item.name === dish);
            const dishPrice = menuItem ? menuItem.price : 0;
            return price + dishPrice * newDishes[dish];
        }, 0);
        setOrderPrice(newOrderPrice);
    };

    return (
        <div className="Order">
            <div className="OrderDetails">
                <h3>Order Details:</h3>
                {Object.keys(selectedDishes).map((dishName) => {
                    const dishCount = selectedDishes[dishName];
                    if (dishCount > 0) {
                        const menuItem = MENU.find((item) => item.name === dishName);
                        const dishPrice = menuItem ? menuItem.price : 0;
                        return (
                            <div key={dishName} className={`${dishName} OrderedDish`}>
                                {`${dishName} x${dishCount}`}
                                <p>Price: {`${dishPrice} som`}</p>
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
