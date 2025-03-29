import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrderById } from "../../services/api/orders";

function ConfirmationPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      getOrderById(orderId)
        .then((data) => {
          setOrder(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching order:", error);
          setLoading(false);
        });
    }
  }, [orderId]);

  if (loading) {
    return <div className="text-center py-20">Loading order details...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-32 relative">
      <img 
        src="/assets/Hero/bg4.jpg" 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover opacity-50" 
      />
      <div className="relative z-10 bg-white p-8 sm:p-10 rounded-lg shadow-lg max-w-md w-full text-center transition-transform transform hover:scale-105">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-gray-800">Order Placed Successfully!</h2>
        {order ? (
          <div className="text-left space-y-4">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Name:</strong> {order.address.fname} {order.address.lname}</p>
            <p><strong>Address:</strong> {order.address.line_1}, {order.address.line_2 || ""}, {order.address.city}</p>
            <p><strong>Phone:</strong> {order.address.phone || "N/A"}</p>
            <p><strong>Products:</strong> {order.orderProducts.map(p => `${p.productId.name} (x${p.quantity})`).join(", ")}</p>
            <p><strong>Total:</strong> Rs. {order.orderProducts.reduce((total, item) => total + (parseFloat(item.productId.price) * item.quantity), 0).toFixed(2)}</p>
          </div>
        ) : (
          <p className="text-base sm:text-lg text-gray-600 mb-6">Your order has been successfully placed.</p>
        )}
        <Link
          to="/"
          className="inline-block bg-red-500 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300 shadow-md hover:shadow-lg mt-6"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}

export default ConfirmationPage;