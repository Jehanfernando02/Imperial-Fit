import React, { useEffect, useState } from "react";
import { getOrdersByUser } from "../../services/api/orders";
import { useUser } from "@clerk/clerk-react";

const OrdersPage = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      getOrdersByUser(user.id)
        .then((fetchedOrders) => {
          console.log("Fetched Orders:", fetchedOrders); // Debug log
          setOrders(Array.isArray(fetchedOrders) ? fetchedOrders : []);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-black">
        <img
          src="/assets/Hero/bg4.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 text-3xl text-white animate-pulse">
          Loading your past orders...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 text-2xl py-20 bg-gray-900 min-h-screen">
        Error loading orders: {error}
      </div>
    );
  }

  const cardGradients = [
    "from-red-500 to-pink-600",
    "from-green-500 to-teal-600",
    "from-blue-500 to-indigo-600",
    "from-yellow-500 to-orange-600",
    "from-purple-500 to-violet-600",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-extrabold text-yellow-300 mb-10 text-center pt-16 tracking-wide">
        Your Past Orders
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {orders.length > 0 ? (
          orders.map((order, index) => {
            const safeAddress = order.address || {};
            const safeProducts = order.orderProducts || [];
            return (
              <div
                key={order._id || index}
                className={`relative bg-gradient-to-br ${
                  cardGradients[index % cardGradients.length]
                } text-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-white opacity-10 rounded-t-xl" />
                <div className="mb-4">
                  <p className="text-lg font-bold text-white">
                    Order #{index + 1}
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-gray-200">Order ID:</span>
                    <span className="text-gray-100 break-all">{order._id || "N/A"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-gray-200">Products:</span>
                    <span className="text-gray-100">
                      {safeProducts.length > 0
                        ? safeProducts.map(p => `${p.productId?.name || "Unknown"} (x${p.quantity || 1})`).join(", ")
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-gray-200">Total:</span>
                    <span className="text-gray-100">
                      Rs. {safeProducts.reduce((total, item) => total + (parseFloat(item.productId?.price || 0) * (item.quantity || 1)), 0).toFixed(2) || "0.00"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-gray-200">Name:</span>
                    <span className="text-gray-100">
                      {safeAddress.fname || safeAddress.lname ? `${safeAddress.fname || "Unknown"} ${safeAddress.lname || "User"}` : "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-gray-200">Address:</span>
                    <span className="text-gray-100">
                      {safeAddress.line_1 ? `${safeAddress.line_1}, ${safeAddress.line_2 || ""}, ${safeAddress.city || ""}` : "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-gray-200">Phone:</span>
                    <span className="text-gray-100">{safeAddress.phone || "N/A"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-gray-200">Payment Status:</span>
                    <span className={`font-medium ${order.paymentStatus === "PENDING" ? "text-yellow-200" : "text-green-200"}`}>
                      {order.paymentStatus || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-gray-200">Delivery Status:</span>
                    <span className={`font-medium ${order.deliveryStatus === "Pending" ? "text-yellow-200" : "text-green-200"}`}>
                      {order.deliveryStatus || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center text-white text-3xl py-20">
            <p className="font-semibold">No orders yet!</p>
            <p className="text-lg mt-2 text-gray-300">Explore our shop and place your first order today.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;