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

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted!"); // Debug line

    try {
      const order = await createOrder({
        userId: user.id,
        orderProducts: cart.map((el) => ({
          productId: el._id,
          quantity: el.count,
        })),
        address: {
          fname: formData.fname,
          lname: formData.lname,
          line_1: formData.line_1,
          line_2: formData.line_2,
          city: formData.city,
          phone: formData.phone,
        },
      });
      console.log("Order created:", order); 
      console.log("Order ID:", order._id); 
      clearCart();
      toast.success("Successfully placed order!");
      navigate(`/payment?orderId=${order._id}`);
    } catch (error) {
      console.error("Error placing order:", error); 
      toast.error("Order placement failed. Please try again later.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const totalAmount = cart.reduce((total, item) => {
    const price = parseFloat(item.price.replace(/,/g, "")) || 0; 
    const count = parseInt(item.count) || 0; // Ensure count is a number
    return total + price * count;
  }, 0);

  return (
    <div>
      <section className="py-8 px-16 pt-24">
        <h1 className="text-4xl font-semibold">Checkout</h1>
        <div className="grid grid-cols-3 gap-x-4 mt-4">
          <div className="col-span-2 border-2 border-gray-500 rounded-lg p-2">
            <h2 className="text-2xl font-semibold">Shipping Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
                <TextInput
                  onChange={handleChange}
                  name="fname"
                  required={true}
                  label="First Name"
                  value={formData.fname}
                  placeholder="Jehan"
                />
                <TextInput
                  onChange={handleChange}
                  name="lname"
                  required={true}
                  label="Last Name"
                  value={formData.lname}
                  placeholder="Fernando"
                />
                <TextInput
                  onChange={handleChange}
                  name="line_1"
                  required={true}
                  value={formData.line_1}
                  label="Address Line 1"
                  placeholder="123 Main St"
                />
                <TextInput
                  onChange={handleChange}
                  name="line_2"
                  required={false} // Changed to false to reflect optional
                  value={formData.line_2}
                  label="Address Line 2"
                  placeholder="Westside"
                />
                <TextInput
                  onChange={handleChange}
                  name="city"
                  required={true}
                  value={formData.city}
                  label="City"
                  placeholder="New York"
                />
                <TextInput
                  onChange={handleChange}
                  name="phone"
                  required={false}
                  value={formData.phone}
                  label="Phone Number"
                  placeholder="+1 (123) 456-7890"
                />
              </div>
              <div className="mt-4">
                <button className="border-2 border-black px-4 py-1 text-lg rounded-lg mt-2 font-medium hover:bg-black hover:text-white transition">
                  Proceed to payment
                </button>
              </div>
            </form>
          </div>
          <div className="col-span-1 border-2 border-gray-500 rounded-lg p-2">
            <h2 className="text-2xl font-semibold">Order Summary</h2>
            <div className="flex flex-col gap-y-4 mt-4">
              {cart.map((el) => (
                <div key={el._id} className="grid grid-cols-3 border p-2 rounded-xl">
                  <div className="col-span-1 bg-[#f4f8f9] rounded-lg">
                    <img
                      src={el.image}
                      alt={el.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="col-span-2 px-4">
                    <h3 className="text-lg font-semibold">{el.name}</h3>
                    {/* <p className="text-sm">{el.description}</p> */}
                    <span className="block text-lg font-semibold mt-2">
                      Rs. {el.price}
                    </span>
                    <p className="mt-1 text-sm">Amount: {el.count}</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <span className="block mt-4 font-semibold text-xl">
                Total: Rs. {totalAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CheckoutPage;
