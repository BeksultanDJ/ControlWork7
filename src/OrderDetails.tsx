import {useState} from 'react';
import Dishes from './AddItems';
import {MENU} from './DataItems';

function Order() {
    const [selectedDishes, setSelectedDishes] = useState<{ [key: string]: number }>({});
    const [orderPrice, setOrderPrice] = useState(0);

    const calculateOrderPrice = (dishes: { [key: string]: number }) => {
        return Object.keys(dishes).reduce((price, dish) => {
            const menuItem = MENU.find((item) => item.name === dish);
            const dishPrice = menuItem ? menuItem.price : 0;
            return price + dishPrice * dishes[dish];
        }, 0);
    };

    const handleDishChange = (newDishes: { [key: string]: number }) => {
        setSelectedDishes(newDishes);
        const newOrderPrice = calculateOrderPrice(newDishes);
        setOrderPrice(newOrderPrice);
    };

    const removeDish = (dishName: string) => {
        const updatedDishes = {...selectedDishes};
        if (updatedDishes[dishName] && updatedDishes[dishName] > 0) {
            updatedDishes[dishName] -= 1;
            setSelectedDishes(updatedDishes);
            const newOrderPrice = calculateOrderPrice(updatedDishes);
            setOrderPrice(newOrderPrice);
        }
    };

    return (
        <div className="Order">
            <div className="OrderDetails">
                <h3 className="OrderDetailsTitle">Order Details:</h3>
                {Object.keys(selectedDishes).length > 0 ? (
                    Object.keys(selectedDishes).map((dishName) => {
                        const dishCount = selectedDishes[dishName];
                        if (dishCount > 0) {
                            const menuItem = MENU.find((item) => item.name === dishName);
                            const dishPrice = menuItem ? menuItem.price : 0;
                            return (
                                <div key={dishName} className={`${dishName} OrderedDish`}>
                                    {`${dishName} x${dishCount}`}
                                    <p>Price: {`${dishPrice} som`}</p>
                                    <button onClick={() => removeDish(dishName)}>Remove</button>
                                </div>
                            );
                        }
                        return null;
                    })
                ) : (
                    <div className="Notice">
                        <p>Your order is empty.</p>
                        <p>Please add some dishes.</p>
                    </div>
                )}
                {Object.keys(selectedDishes).length > 0 && (
                    <p className="Price">Total price: {orderPrice} som</p>
                )}
            </div>
            <Dishes onDishChange={handleDishChange} selectedDishes={selectedDishes}/>
        </div>
    );
}

export default Order;
