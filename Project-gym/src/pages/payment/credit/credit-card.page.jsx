import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { getOrderById } from "../../../services/api/orders";

function CreditCardPaymentPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
  });

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

  const handlePayment = () => {
    if (cardDetails.cardNumber && cardDetails.expiryDate && cardDetails.cvv && cardDetails.name) {
      // Mock payment success
      toast.success("Payment successful!");
      navigate("/confirmation");
    } else {
      toast.error("Please enter valid card details.");
    }
  };

  const handleInputChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
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

      <form className="mt-6 space-y-4">
        <div>
          <label className="block text-lg">Cardholder Name</label>
          <input
            type="text"
            name="name"
            value={cardDetails.name}
            onChange={handleInputChange}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter cardholder name"
          />
        </div>

        <div>
          <label className="block text-lg">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={cardDetails.cardNumber}
            onChange={handleInputChange}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your card number"
          />
        </div>

        <div className="flex gap-x-4">
          <div className="flex-1">
            <label className="block text-lg">Expiry Date</label>
            <input
              type="text"
              name="expiryDate"
              value={cardDetails.expiryDate}
              onChange={handleInputChange}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="MM/YY"
            />
          </div>

          <div className="flex-1">
            <label className="block text-lg">CVV</label>
            <input
              type="text"
              name="cvv"
              value={cardDetails.cvv}
              onChange={handleInputChange}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="CVV"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handlePayment}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-200 w-full"
        >
          Pay 
          {/* Rs. {order?.total || "N/A"} */}
        </button>
      </form>
    </section>
  );
}

export default CreditCardPaymentPage;
