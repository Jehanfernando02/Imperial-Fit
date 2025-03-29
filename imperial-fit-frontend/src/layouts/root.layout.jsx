import { Outlet } from "react-router-dom";
import Navigation from "../componentsN/Navigation";
import { useState, useEffect } from "react";
import { CartContext } from "../context/cartContext";

function RootLayout() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const updateCart = (product) => {
    const existingItem = cart.find((el) => product._id === el._id);
    if (existingItem) {
      setCart(
        cart.map((el) =>
          el._id === product._id ? { ...el, count: el.count + product.count } : el
        )
      );
    } else {
      setCart([...cart, { ...product, count: product.count }]);
    }
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