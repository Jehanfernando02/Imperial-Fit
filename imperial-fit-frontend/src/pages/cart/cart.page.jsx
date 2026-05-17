import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function CartPage() {
    const { cart, updateCart, clearCart } = useContext(CartContext);

    const totalAmount = cart.reduce((total, item) => {
        const price = item?.price ? parseFloat(String(item.price).replace(/,/g, "")) : 0;
        const count = parseInt(item.count) || 0;
        return total + price * count;
    }, 0);

    const adjustQuantity = (item, change) => {
        if (change === -1 && item.count === 1) {
            updateCart({ ...item, count: -item.count });
        } else {
            updateCart({ ...item, count: change });
        }
    };

    const removeItem = (item) => {
        updateCart({ ...item, count: -item.count });
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 md:px-8 lg:px-16">
            <section className="max-w-6xl mx-auto pt-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl sm:text-5xl font-extrabold gradient-text mb-3">
                        Your Cart
                    </h1>
                    <p className="text-gray-500 text-sm">
                        {cart.length > 0 ? `${cart.length} item${cart.length > 1 ? 's' : ''} in your cart` : 'Your cart is empty'}
                    </p>
                </motion.div>

                {cart.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            <AnimatePresence>
                                {cart.map((el, index) => (
                                    <motion.div
                                        key={el._id || el.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20, height: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="glass-card p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 hover-glow transition-all duration-300"
                                    >
                                        {/* Image */}
                                        <div className="w-full sm:w-28 h-28 bg-white/5 rounded-xl overflow-hidden flex items-center justify-center p-3 border border-white/5 shrink-0">
                                            <img
                                                src={el.image}
                                                alt={el.name}
                                                className="max-h-full max-w-full object-contain"
                                            />
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 w-full text-center sm:text-left">
                                            <h3 className="text-lg font-bold text-gray-100 mb-1">{el.name}</h3>
                                            <p className="text-yellow-400 font-semibold text-sm">Rs. {el.price || "N/A"}</p>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10">
                                                <button
                                                    onClick={() => adjustQuantity(el, -1)}
                                                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                                                >
                                                    <Minus size={14} className="text-gray-400" />
                                                </button>
                                                <span className="text-sm font-bold text-white w-8 text-center">{el.count}</span>
                                                <button
                                                    onClick={() => adjustQuantity(el, 1)}
                                                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                                                >
                                                    <Plus size={14} className="text-gray-400" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeItem(el)}
                                                className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-all duration-200"
                                            >
                                                <Trash2 size={16} className="text-red-400" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Order Summary Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="lg:col-span-1"
                        >
                            <div className="glass-card-strong p-6 sticky top-28">
                                <h2 className="text-lg font-bold text-white mb-6">Order Summary</h2>

                                <div className="space-y-3 mb-6">
                                    {cart.map((el) => (
                                        <div key={el._id} className="flex justify-between text-sm">
                                            <span className="text-gray-400 truncate max-w-[60%]">{el.name} × {el.count}</span>
                                            <span className="text-gray-300">
                                                Rs. {(parseFloat(String(el.price).replace(/,/g, "")) * el.count).toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="h-px bg-white/10 mb-4" />

                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-gray-300 font-semibold">Total</span>
                                    <span className="text-2xl font-extrabold gradient-text">
                                        Rs. {totalAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                                    </span>
                                </div>

                                <Link
                                    to="/checkout"
                                    className="btn-gradient w-full flex items-center justify-center gap-2 text-center !rounded-xl"
                                >
                                    Checkout
                                    <ArrowRight size={16} />
                                </Link>

                                <button
                                    onClick={clearCart}
                                    className="w-full mt-3 py-3 text-sm text-gray-500 hover:text-red-400 border border-white/5 hover:border-red-500/20 rounded-xl transition-all duration-300"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </motion.div>
                    </div>
                ) : (
                    /* Empty Cart State */
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="glass-card max-w-md mx-auto p-12 text-center"
                    >
                        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center animate-float">
                            <ShoppingBag size={36} className="text-gray-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-300 mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 text-sm mb-8">
                            Looks like you haven't added anything yet. Let's fix that!
                        </p>
                        <Link
                            to="/shop"
                            className="btn-gradient inline-flex items-center gap-2 !rounded-xl"
                        >
                            Browse Shop
                            <ArrowRight size={16} />
                        </Link>
                    </motion.div>
                )}
            </section>
        </div>
    );
}

export default CartPage;