import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";

function CartPage() {
    const { cart, updateCart, clearCart } = useContext(CartContext);

    const totalAmount = cart.reduce((total, item) => {
        const price = item?.price ? parseFloat(item.price.replace(/,/g, "")) : 0;
        const count = parseInt(item.count) || 0;
        return total + price * count;
    }, 0);

    const adjustQuantity = (item, change) => {
        if (change === -1 && item.count === 1) {
            updateCart({ ...item, count: -item.count }); // Remove if quantity becomes 0
        } else {
            updateCart({ ...item, count: change });
        }
    };

    const removeItem = (item) => {
        updateCart({ ...item, count: -item.count });
    };

    return (
        <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 md:px-8 lg:px-16">
            <section className="max-w-5xl mx-auto pt-16">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-8 text-center">
                    Your Shopping Cart
                </h1>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {cart.length > 0 ? (
                        cart.map((el) => (
                            <div
                                key={el._id || el.id} // Use _id if available, fallback to id
                                className="flex flex-col sm:flex-row items-center bg-white border border-gray-300 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                <div className="w-full sm:w-1/3 bg-[#f4f8f9] rounded-lg overflow-hidden">
                                    <img
                                        src={el.image}
                                        alt={el.name}
                                        className="w-full h-32 sm:h-40 object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                                <div className="w-full sm:w-2/3 p-4 sm:pl-6 text-center sm:text-left flex flex-col justify-between">
                                    <div>
                                        <h1 className="text-xl md:text-2xl font-bold text-gray-700 mb-2">{el.name}</h1>
                                        <div className="text-lg font-semibold text-gray-800">
                                            Price: <span className="text-green-600">Rs. {el.price || "N/A"}</span>
                                        </div>
                                    </div>
                                    <div className="mt-2 flex items-center justify-center sm:justify-start gap-2">
                                        <button
                                            onClick={() => adjustQuantity(el, -1)}
                                            className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <p className="text-lg text-fuchsia-700">{el.count}</p>
                                        <button
                                            onClick={() => adjustQuantity(el, 1)}
                                            className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                                        >
                                            <Plus size={16} />
                                        </button>
                                        <button
                                            onClick={() => removeItem(el)}
                                            className="ml-2 p-1 bg-red-100 rounded-full hover:bg-red-200"
                                        >
                                            <Trash2 size={16} className="text-red-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-xl text-gray-600 col-span-full text-center">Your cart is currently empty.</p>
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="mt-12 text-center">
                        <div className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                            Total: <span className="text-red-600">Rs. {totalAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</span>
                        </div>
                        <Link
                            className="inline-block bg-yellow-400 text-black px-6 py-2 md:px-8 md:py-3 text-lg rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-300 shadow-md hover:shadow-lg"
                            to="/checkout"
                        >
                            Proceed to Checkout
                        </Link>
                        <button
                            onClick={clearCart}
                            className="ml-4 bg-red-600 text-white px-6 py-2 md:px-8 md:py-3 text-lg rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            Clear Cart
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}

export default CartPage;