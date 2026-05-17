import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { getOrderById } from "../../services/api/orders";
import { motion } from "framer-motion";
import { Banknote, CreditCard, ShieldCheck } from "lucide-react";

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
        .then((data) => setOrder(data))
        .catch((e) => { setIsError(true); setError(e.message); })
        .finally(() => setIsLoading(false));
    }
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="glass-card p-8 text-center"><p className="text-red-400">{error}</p></div>
      </div>
    );
  }

  const paymentOptions = [
    {
      icon: Banknote,
      title: "Cash On Delivery",
      desc: "Pay when your order arrives at your doorstep",
      color: "from-emerald-500 to-green-600",
      glow: "hover:shadow-emerald-500/20",
      onClick: () => navigate(`/payment/cash-on-delivery?orderId=${orderId}`),
    },
    {
      icon: CreditCard,
      title: "Credit Card",
      desc: "Secure payment via Stripe checkout",
      color: "from-blue-500 to-indigo-600",
      glow: "hover:shadow-blue-500/20",
      onClick: () => navigate(`/payment/credit-card?orderId=${orderId}`),
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-xl w-full">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-4xl font-extrabold gradient-text mb-3">Choose Payment</h1>
          <p className="text-gray-500 text-sm">Select your preferred payment method</p>
        </motion.div>

        <div className="space-y-4">
          {paymentOptions.map((opt, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={opt.onClick}
              className={`w-full glass-card-strong p-6 flex items-center gap-5 text-left hover-glow ${opt.glow} transition-all duration-300 group`}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${opt.color} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <opt.icon size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{opt.title}</h3>
                <p className="text-sm text-gray-400">{opt.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex items-center justify-center gap-2 mt-8 text-gray-600 text-xs">
          <ShieldCheck size={14} /> Your payment information is always secure
        </motion.div>
      </div>
    </div>
  );
}

export default PaymentPage;
