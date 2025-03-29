import { useContext, useState } from "react";
import TextInput from "../../componentsN/TextInput";
import { CartContext } from "../../context/cartContext";
import { createOrder } from "../../services/api/orders";
import { useUser } from "@clerk/clerk-react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function CheckoutPage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    line_1: "",
    line_2: "",
    city: "",
    phone: "",
  });

  if (!isLoaded) return <div className="text-center py-20">Loading...</div>;
  if (!isSignedIn) return <Navigate to="/sign-in" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        userId: user.id,
        orderProducts: cart.map((el) => ({
          productId: el._id,
          quantity: el.count,
        })),
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
    const price = parseFloat(item.price.replace(/,/g, "")) || 0;
    const count = parseInt(item.count) || 0;
    return total + price * count;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 md:px-8 lg:px-16 pt-24">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-8 text-center">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border-2 border-gray-300 rounded-lg p-6 shadow-md">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextInput onChange={handleChange} name="fname" required label="First Name" value={formData.fname} placeholder="Jehan" />
              <TextInput onChange={handleChange} name="lname" required label="Last Name" value={formData.lname} placeholder="Fernando" />
              <TextInput onChange={handleChange} name="line_1" required label="Address Line 1" value={formData.line_1} placeholder="123 Main St" />
              <TextInput onChange={handleChange} name="line_2" label="Address Line 2" value={formData.line_2} placeholder="Westside" />
              <TextInput onChange={handleChange} name="city" required label="City" value={formData.city} placeholder="New York" />
              <TextInput onChange={handleChange} name="phone" label="Phone Number" value={formData.phone} placeholder="+1 (123) 456-7890" />
              <div className="col-span-full mt-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Proceed to Payment
                </button>
              </div>
            </form>
          </div>
          <div className="lg:col-span-1 bg-white border-2 border-gray-300 rounded-lg p-6 shadow-md">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cart.map((el) => (
                <div key={el._id} className="flex items-center gap-4 border-b pb-2">
                  <img src={el.image} alt={el.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{el.name}</h3>
                    <p className="text-sm text-gray-600">Rs. {el.price} x {el.count}</p>
                  </div>
                </div>
              ))}
              <div className="mt-4 text-lg font-semibold text-gray-800">
                Total: <span className="text-red-600">Rs. {totalAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CheckoutPage;