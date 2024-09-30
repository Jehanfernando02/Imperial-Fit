import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

import { getOrderById } from "../../services/api/orders";

function PaymentPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (orderId) {
      getOrderById(orderId)
        .then((data) => {
          setOrder(data);
        })
        .catch((e) => {
          setIsError(true);
          setError(e.message);
          console.log(e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [orderId]);

  if (isLoading) {
    return (
      <section className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-semibold mb-4">Payment</h1>
        <div className="border-b border-gray-300 w-full mb-4"></div>
        <div className="py-8">
          <p className="text-lg text-gray-700">Loading...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-semibold mb-4">Payment</h1>
        <div className="border-b border-gray-300 w-full mb-4"></div>
        <div className="py-8">
          <p className="text-red-500 text-lg">Some error happened: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      
      <section className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        
        <h1 className="text-4xl font-semibold text-center mb-6">Payment Options</h1>
        <div className="grid grid-cols-2 gap-4">
          {/* Navigate to the Cash On Delivery page */}
          <button
            type="button"
            onClick={() => {
              navigate(`/payment/cash-on-delivery?orderId=${orderId}`);
            }}
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition duration-200"
          >
            Cash On Delivery
          </button>

          {/* Navigate to the Credit Card Payment page */}
          <button
            type="button"
            onClick={() => {
              navigate(`/payment/credit-card?orderId=${orderId}`);
            }}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-200"
          >
            Credit Card
          </button>
        </div>
      </section>
    </div>
  );
}

export default PaymentPage;
