import { Outlet } from "react-router-dom";
import Navigation from "../componentsN/Navigation";
import { useState } from "react";
import { CartContext } from "../context/cartContext";

function RootLayout() {
    const [cart, setCart] = useState([]);

    const updateCart = (product) => {
        if (cart.find((el) => product._id === el._id)) {
            setCart(
                cart.map((el) =>
                    el._id === product._id ? { ...el, count: el.count + 1 } : el
                )
            );
            return;
        }
        setCart([...cart, { ...product, count: 1 }]);
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, updateCart, clearCart }}>
            <div className="min-h-screen bg-gray-50">
                <Navigation />
                <div className="pt-20">
                    <Outlet />
                </div>
            </div>
        </CartContext.Provider>
    );
}

export default RootLayout;