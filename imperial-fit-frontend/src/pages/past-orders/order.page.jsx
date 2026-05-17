import React, { useEffect, useState } from "react";
import { getOrdersByUser } from "../../services/api/orders";
import { useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { Package, MapPin, Phone, CreditCard, Truck } from "lucide-react";

const OrdersPage = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      getOrdersByUser(user.id)
        .then((fetchedOrders) => {
          setOrders(Array.isArray(fetchedOrders) ? fetchedOrders : []);
          setLoading(false);
        })
        .catch((err) => { setError(err.message); setLoading(false); });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="glass-card p-8 text-center"><p className="text-red-400">Error: {error}</p></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center pt-8 mb-10">
        <h1 className="text-4xl font-extrabold gradient-text mb-3">Your Orders</h1>
        <p className="text-gray-500 text-sm">{orders.length > 0 ? `${orders.length} order${orders.length > 1 ? 's' : ''} found` : 'No orders yet'}</p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.length > 0 ? (
          orders.map((order, index) => {
            const safeAddress = order.address || {};
            const safeProducts = order.orderProducts || [];
            return (
              <motion.div
                key={order._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card-strong p-6 hover-glow transition-all duration-300"
              >
                {/* Order number badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">Order #{index + 1}</span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${order.paymentStatus === "PENDING" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-green-500/10 text-green-400 border border-green-500/20"}`}>
                    {order.paymentStatus || "N/A"}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-2.5 bg-white/[0.02] rounded-lg">
                    <Package size={15} className="text-gray-500 mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-gray-600 uppercase tracking-wider">Products</p>
                      <p className="text-xs text-gray-300 truncate">
                        {safeProducts.length > 0 ? safeProducts.map(p => `${p.productId?.name || "Unknown"} (×${p.quantity || 1})`).join(", ") : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2.5 bg-white/[0.02] rounded-lg">
                    <CreditCard size={15} className="text-gray-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] text-gray-600 uppercase tracking-wider">Total</p>
                      <p className="text-sm font-bold gradient-text">
                        Rs. {safeProducts.reduce((total, item) => total + (parseFloat(item.productId?.price || 0) * (item.quantity || 1)), 0).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2.5 bg-white/[0.02] rounded-lg">
                    <MapPin size={15} className="text-gray-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] text-gray-600 uppercase tracking-wider">Address</p>
                      <p className="text-xs text-gray-300">{safeAddress.line_1 ? `${safeAddress.line_1}, ${safeAddress.city || ""}` : "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2.5 bg-white/[0.02] rounded-lg">
                    <Truck size={15} className="text-gray-500 shrink-0" />
                    <div>
                      <p className="text-[10px] text-gray-600 uppercase tracking-wider">Delivery</p>
                      <p className={`text-xs font-medium ${order.deliveryStatus === "Pending" ? "text-amber-400" : "text-green-400"}`}>
                        {order.deliveryStatus || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="col-span-full">
            <div className="glass-card max-w-md mx-auto p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center animate-float">
                <Package size={32} className="text-gray-600" />
              </div>
              <p className="text-xl font-bold text-gray-300 mb-2">No orders yet!</p>
              <p className="text-sm text-gray-500">Explore our shop and place your first order today.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;