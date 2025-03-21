import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getOrderById } from "../../../services/api/orders";
import { getProductById } from "../../../services/api/products"; // Assume this exists

function CashOnDeliveryPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (orderId) {
      getOrderById(orderId)
        .then((data) => {
          console.log("Fetched order data:", data);
          setOrder(data);
          calculateTotalAmount(data.orderProducts);
        })
        .catch((e) => {
          setIsError(true);
          setError(e.message);
        })
        .finally(() => setIsLoading(false));
    }
  }, [orderId]);

  const calculateTotalAmount = async (orderProducts) => {
    let total = 0;
    for (const item of orderProducts) {
      const product = await getProductById(item.productId); // Fetch product details
      total += product.price * item.quantity; // Assuming each product has a price property
    }
    setTotalAmount(total);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Loading order details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-red-500 text-lg">Error fetching order: {error}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-red-500 text-lg">Order details not available.</p>
      </div>
    );
  }

  return (
    <section className="pt-24 bg-white rounded-lg shadow-lg p-8 mx-auto max-w-lg my-10 border border-gray-300">
      <h1 className="text-4xl font-semibold text-center mb-6">Cash On Delivery</h1>
      <div className="border-b border-gray-300 mb-6"></div>

      <h2 className="text-xl font-medium mb-4">Order Summary</h2>
      <p className="text-lg"><strong>Order ID:</strong> {order._id || "N/A"}</p>
      <p className="text-lg"><strong>Total Amount:</strong> Rs. {totalAmount || "N/A"}</p>
      <p className="text-lg">
        <strong>Delivery Address:</strong> {order.address?.line_1 || "N/A"}, {order.address?.line_2 || "N/A"}, {order.address?.city || "N/A"}
      </p>
      <p className="text-lg"><strong>Phone:</strong> {order.address?.phone || "N/A"}</p>
      <p className="text-lg"><strong>Payment Status:</strong> {order.paymentStatus}</p>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={() => {
            toast.success("Order placed successfully with Cash on Delivery!");
            navigate("/confirmation");
          }}
          className="bg-green-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600 transition duration-200"
        >
          Confirm Order
        </button>
      </div>
    </section>
  );
}

export default CashOnDeliveryPage;
