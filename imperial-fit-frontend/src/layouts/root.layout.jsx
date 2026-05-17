import { Outlet } from "react-router-dom";
import Navigation from "../componentsN/Navigation";
import Footer from "../componentsN/Footer";
import { useState, useEffect } from "react";
import { CartContext } from "../context/cartContext";
import { toast } from "sonner";

function RootLayout() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Ping backend to wake it up
  useEffect(() => {
    let timeoutId;

    const wakeUpServer = async () => {
      // If the server doesn't respond in 1.5s, it's likely asleep.
      // We show a toast to reassure the user.
      timeoutId = setTimeout(() => {
        toast.info("Waking up our free-tier servers...", {
          description: "This initial connection may take up to 30 seconds. Thank you for your patience!",
          duration: 5000,
        });
      }, 1500);

      try {
        await fetch("https://imperial-fit.onrender.com/api/health");
        // If it responds quickly, clear the timeout so the toast doesn't show
        clearTimeout(timeoutId);
      } catch (error) {
        clearTimeout(timeoutId);
        console.error("Failed to wake server:", error);
      }
    };

    wakeUpServer();

    return () => clearTimeout(timeoutId);
  }, []);

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
      <div className="min-h-screen bg-neutral-950 bg-imperial-texture">
        <Navigation />
        <div className="pt-20">
          <Outlet />
        </div>
        <Footer />
      </div>
    </CartContext.Provider>
  );
}

export default RootLayout;