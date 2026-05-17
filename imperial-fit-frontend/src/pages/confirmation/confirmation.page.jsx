import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, ShoppingBag, ArrowRight } from "lucide-react";

function ConfirmationPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Subtle background */}
      <img
        src="/assets/Hero/bg4.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.03] blur-sm"
      />

      {/* Confetti particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-5%`,
            backgroundColor: ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7'][i % 5],
            animation: `confetti-fall ${3 + Math.random() * 4}s linear ${Math.random() * 2}s infinite`,
            opacity: 0.6,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 glass-card-strong p-10 sm:p-14 max-w-md w-full text-center"
      >
        {/* Animated Checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <CheckCircle size={40} className="text-green-400" />
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-extrabold text-white mb-3"
        >
          Order Confirmed!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 text-sm mb-2"
        >
          Thank you for shopping with Imperial Fit!
        </motion.p>

        {orderId && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xs text-gray-600 font-mono mb-8"
          >
            Order ID: {orderId}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          <Link to="/shop" className="btn-gradient w-full flex items-center justify-center gap-2 !rounded-xl !py-3.5">
            <ShoppingBag size={16} /> Continue Shopping <ArrowRight size={14} />
          </Link>
          <Link to="/order" className="block w-full py-3 text-sm text-gray-500 hover:text-yellow-400 border border-white/5 hover:border-yellow-400/20 rounded-xl transition-all duration-300 text-center">
            View Past Orders
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ConfirmationPage;