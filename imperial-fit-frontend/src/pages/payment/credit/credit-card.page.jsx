import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { getOrderById, createCheckoutSession } from "../../../services/api/orders";

function CreditCardPaymentPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (orderId) {
      getOrderById(orderId)
        .then((data) => {
          console.log("Fetched order data:", data); // Check the structure
          setOrder(data);
        })
        .catch((e) => {
          console.error(e);
          toast.error("Error fetching order details.");
        })
        .finally(() => setIsLoading(false));
    }
  }, [orderId]);

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      const session = await createCheckoutSession(orderId);
      if (session && session.url) {
        window.location.href = session.url; // Redirect to Stripe Checkout
      }
    } catch (e) {
      console.error(e);
      toast.error("Error creating payment session. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Loading order details...</p>
      </div>
    );
  }

  return (
    <section className="pt-24 bg-white rounded-lg shadow-lg p-8 mx-auto max-w-lg my-10">
      <h1 className="text-4xl font-semibold text-center mb-6">Credit Card Payment</h1>
      <div className="border-b border-gray-300 mb-6"></div>

      <h2 className="text-xl font-medium mb-4">Order Summary</h2>
      <p className="text-lg"><strong>Order ID:</strong> {order?._id || "N/A"}</p>
      {/* <p className="text-lg"><strong>Total Amount:</strong> Rs. {order?.total || "N/A"}</p> */}
      <br />
      <p className="text-lg"><strong>Delivery Address:</strong> {order?.address?.line_1 || "N/A"}, {order?.address?.line_2 || "N/A"}, {order?.address?.city || "N/A"}</p>

      <div className="mt-6">
        <button
          type="button"
          onClick={handlePayment}
          disabled={isProcessing}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-200 w-full disabled:bg-gray-400"
        >
          {isProcessing ? "Processing..." : "Proceed to Stripe Checkout"}
        </button>
      </div>
    </section>
  );
}

export default CreditCardPaymentPage;
