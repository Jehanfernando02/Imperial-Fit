import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getOrderById } from "../../../services/api/orders";
import { getProductById } from "../../../services/api/products";
import { motion } from "framer-motion";
import { MapPin, Phone, Package, CheckCircle2 } from "lucide-react";

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
        .then((data) => { setOrder(data); calculateTotalAmount(data.orderProducts); })
        .catch((e) => { setIsError(true); setError(e.message); })
        .finally(() => setIsLoading(false));
    }
  }, [orderId]);

  const calculateTotalAmount = async (orderProducts) => {
    let total = 0;
    for (const item of orderProducts) {
      const product = await getProductById(item.productId);
      total += product.price * item.quantity;
    }
    setTotalAmount(total);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen"><div className="w-10 h-10 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin" /></div>;
  }

  if (isError || !order) {
    return <div className="flex items-center justify-center min-h-screen"><div className="glass-card p-8 text-center"><p className="text-red-400">{error || "Order not found"}</p></div></div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card-strong p-8 max-w-lg w-full">
        {/* Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {["Cart", "Checkout", "Payment"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i < 2 ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>{i + 1}</div>
              <span className="text-xs text-gray-500 hidden sm:inline">{step}</span>
              {i < 2 && <div className="w-8 h-px bg-white/10" />}
            </div>
          ))}
        </div>

        <h1 className="text-2xl font-extrabold text-white text-center mb-1">Cash On Delivery</h1>
        <p className="text-gray-500 text-sm text-center mb-8">Review your order details below</p>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-xl border border-white/5">
            <Package size={18} className="text-yellow-400 shrink-0" />
            <div><p className="text-xs text-gray-500">Order ID</p><p className="text-sm text-gray-200 font-mono">{order._id}</p></div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-xl border border-white/5">
            <MapPin size={18} className="text-yellow-400 shrink-0" />
            <div><p className="text-xs text-gray-500">Delivery Address</p><p className="text-sm text-gray-200">{order.address?.line_1}, {order.address?.line_2}, {order.address?.city}</p></div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-xl border border-white/5">
            <Phone size={18} className="text-yellow-400 shrink-0" />
            <div><p className="text-xs text-gray-500">Phone</p><p className="text-sm text-gray-200">{order.address?.phone || "N/A"}</p></div>
          </div>
        </div>

        <div className="h-px bg-white/10 mb-4" />
        <div className="flex justify-between items-center mb-8">
          <span className="text-gray-400 font-semibold">Total Amount</span>
          <span className="text-2xl font-extrabold gradient-text">Rs. {totalAmount?.toLocaleString() || "N/A"}</span>
        </div>

        <button
          onClick={() => { toast.success("Order placed successfully with Cash on Delivery!"); navigate("/confirmation"); }}
          className="btn-gradient w-full flex items-center justify-center gap-2 !rounded-xl !py-4"
        >
          <CheckCircle2 size={18} /> Confirm Order
        </button>
      </motion.div>
    </div>
  );
}

export default CashOnDeliveryPage;
