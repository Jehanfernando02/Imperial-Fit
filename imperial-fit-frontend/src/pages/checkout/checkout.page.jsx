import { useContext, useState } from "react";
import TextInput from "../../componentsN/TextInput";
import { CartContext } from "../../context/cartContext";
import { createOrder } from "../../services/api/orders";
import { useUser } from "@clerk/clerk-react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Lock, ArrowRight } from "lucide-react";

function CheckoutPage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: "", lname: "", line_1: "", line_2: "", city: "", phone: "",
  });

  if (!isLoaded) return <div className="flex items-center justify-center min-h-screen"><div className="w-10 h-10 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin" /></div>;
  if (!isSignedIn) return <Navigate to="/sign-in" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        userId: user.id,
        orderProducts: cart.map((el) => ({ productId: el._id, quantity: el.count })),
        address: formData,
      };
      const order = await createOrder(orderData);
      clearCart();
      toast.success("Order placed successfully!");
      navigate(`/payment?orderId=${order._id}`);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Order placement failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const totalAmount = cart.reduce((total, item) => {
    const price = parseFloat(String(item.price).replace(/,/g, "")) || 0;
    const count = parseInt(item.count) || 0;
    return total + price * count;
  }, 0);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-16">
      <section className="max-w-6xl mx-auto pt-8">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-extrabold gradient-text text-center mb-10">
          Checkout
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 glass-card-strong p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Lock size={18} className="text-yellow-400" /> Shipping Information
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <TextInput onChange={handleChange} name="fname" required label="First Name" value={formData.fname} placeholder="Jehan" />
              <TextInput onChange={handleChange} name="lname" required label="Last Name" value={formData.lname} placeholder="Fernando" />
              <TextInput onChange={handleChange} name="line_1" required label="Address Line 1" value={formData.line_1} placeholder="123 Main St" />
              <TextInput onChange={handleChange} name="line_2" label="Address Line 2" value={formData.line_2} placeholder="Apartment, suite, etc." />
              <TextInput onChange={handleChange} name="city" required label="City" value={formData.city} placeholder="Colombo" />
              <TextInput onChange={handleChange} name="phone" label="Phone Number" value={formData.phone} placeholder="+94 77 123 4567" />
              <div className="col-span-full mt-4">
                <button type="submit" className="btn-gradient w-full sm:w-auto flex items-center justify-center gap-2 !rounded-xl !py-3.5">
                  Proceed to Payment <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </motion.div>

          {/* Summary */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-28">
              <h2 className="text-lg font-bold text-white mb-5">Order Summary</h2>
              <div className="space-y-3 mb-5">
                {cart.map((el) => (
                  <div key={el._id} className="flex items-center gap-3 pb-3 border-b border-white/5">
                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/5 overflow-hidden flex items-center justify-center p-1 shrink-0">
                      <img src={el.image} alt={el.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-200 truncate">{el.name}</h3>
                      <p className="text-xs text-gray-500">Rs. {el.price} × {el.count}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="h-px bg-white/10 mb-4" />
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-semibold">Total</span>
                <span className="text-xl font-extrabold gradient-text">
                  Rs. {totalAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default CheckoutPage;