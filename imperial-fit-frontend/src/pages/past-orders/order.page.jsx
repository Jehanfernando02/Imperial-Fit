import React, { useEffect, useState } from "react";
import { getOrdersByUser } from "../../services/api/orders";
import { useUser } from "@clerk/clerk-react"; 

const OrdersPage = () => {
  // Get user information from Clerk
  const { user } = useUser();

  // State variables to store orders, loading status, and error messages
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect to fetch orders when user is available
  useEffect(() => {
    let timeout;

    // Only fetch orders if the user is logged in
    if (user) {
      // Simulate a delay in fetching data
      timeout = setTimeout(() => {
        getOrdersByUser(user.id)
          .then((fetchedOrders) => {
            setOrders(fetchedOrders); // Update orders state
          })
          .catch((err) => {
            setError(err.message);
          })
          .finally(() => {
            setLoading(false);
          });
      }, 500); // 0.5 second timeout
    }

    return () => clearTimeout(timeout); 
  }, [user]);

  if (loading) {
    return (
      <div className="relative flex items-center justify-center min-h-screen">
        <img 
          src="/public/assets/Hero/bg4.jpg" 
          alt="Hero Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-20" 
        />
        <div className="relative z-10 text-3xl text-black">Loading your past orders</div>
      </div>
    );
  }
  

  if (error) {
    return <div className="text-red-500 text-center">Error loading orders: {error}</div>;
  }

  // Define some colors for the order cards to make it appear nice 
  const colors = [
    "bg-red-600",
    "bg-green-600",
    "bg-blue-600",
    "bg-yellow-600",
  ];

  return (
    <div className="bg-gray-800 p-8 min-h-screen">
      <h2 className="text-3xl font-semibold text-yellow-300 mb-8 text-center pt-16">Your Past Orders</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.length > 0 ? (
          // Map over the orders to display each order's details
          orders.map((order, index) => (
            <div key={order._id} className={`${colors[index % colors.length]} text-white p-4 rounded-lg shadow-md`}>
              <div className="mb-3">
                <p className="font-bold">Order: {index + 1}</p>
              </div>
              <div className="flex mb-2">
                <p className="font-bold">Order ID:</p>
                <p className="text-gray-100" style={{ marginLeft: '10px' }}> {order._id}</p>
              </div>
              <div className="flex mb-2">
                <p className="font-bold">Products:</p>
                <p className="text-gray-100" style={{ marginLeft: '10px' }}>
                  {order.orderProducts && order.orderProducts.length > 0
                    ? order.orderProducts
                        .filter(product => product.productId) // Filter for valid product IDs
                        .map(product => product.productId.name) // Map to product names
                        .join(", ") || "None"
                    : "None"}
                </p>
              </div>
              <div className="flex mb-2">
                <p className="font-bold">Name:</p>
                <p className="text-gray-100" style={{ marginLeft: '10px' }}> {order.address.fname} {order.address.lname}</p>
              </div>
              <div className="flex mb-2">
                <p className="font-bold">Address:</p>
                <p className="text-gray-100" style={{ marginLeft: '10px' }}> {order.address.line_1}, {order.address.line_2}, {order.address.city}</p>
              </div>
              <div className="flex mb-2">
                <p className="font-bold">Phone:</p>
                <p className="text-gray-100" style={{ marginLeft: '10px' }}> {order.address.phone}</p>
              </div>
              <div className="flex mb-2">
                <p className="font-bold">Payment Status:</p>
                <p className={order.paymentStatus === "PENDING" ? "text-yellow-200" : "text-green-200"} style={{ marginLeft: '10px' }}>
                  {order.paymentStatus}
                </p>
              </div>
              <div className="flex mb-2">
                <p className="font-bold">Delivery Status:</p>
                <p className={`text-gray-100 ${order.deliveryStatus === "Pending" ? "text-yellow-200" : "text-green-200"}`} style={{ marginLeft: '10px' }}>
                  {order.deliveryStatus}
                </p>
              </div>
            </div>
          ))
        ) : (
          // Message when no orders are found
          <p className="text-black text-4xl text-center pt-32">
            You have not placed any orders yet. Start exploring our products and make your first order!
          </p>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
