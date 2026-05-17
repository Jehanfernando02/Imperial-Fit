import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { getOrderById, createCheckoutSession } from "../../../services/api/orders";
import { motion } from "framer-motion";
import { CreditCard, ShieldCheck, Lock } from "lucide-react";

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
        .then((data) => setOrder(data))
        .catch((e) => { console.error(e); toast.error("Error fetching order details."); })
        .finally(() => setIsLoading(false));
    }
  }, [orderId]);

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      const session = await createCheckoutSession(orderId);
      if (session && session.url) {
        window.location.href = session.url;
      }
    } catch (e) {
      console.error(e);
      toast.error("Error creating payment session. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen"><div className="w-10 h-10 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" /></div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card-strong p-8 max-w-lg w-full">
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <CreditCard size={28} className="text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-extrabold text-white text-center mb-1">Credit Card Payment</h1>
        <p className="text-gray-500 text-sm text-center mb-8">You'll be redirected to Stripe's secure checkout</p>

        {/* Order Info */}
        <div className="space-y-3 mb-6">
          <div className="p-3 bg-white/[0.03] rounded-xl border border-white/5">
            <p className="text-xs text-gray-500 mb-1">Order ID</p>
            <p className="text-sm text-gray-200 font-mono">{order?._id || "N/A"}</p>
          </div>
          <div className="p-3 bg-white/[0.03] rounded-xl border border-white/5">
            <p className="text-xs text-gray-500 mb-1">Delivery Address</p>
            <p className="text-sm text-gray-200">{order?.address?.line_1}, {order?.address?.line_2}, {order?.address?.city}</p>
          </div>
        </div>

        {/* Stripe Button */}
        <button
          type="button"
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
          ) : (
            <><Lock size={16} /> Proceed to Stripe Checkout</>
          )}
        </button>

        {/* Trust */}
        <div className="flex items-center justify-center gap-2 mt-6 text-gray-600 text-xs">
          <ShieldCheck size={14} /> 256-bit SSL encrypted payment
        </div>
      </motion.div>
    </div>
  );
}

export default CreditCardPaymentPage;
