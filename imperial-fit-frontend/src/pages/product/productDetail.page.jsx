import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getProductById } from "../../services/api/products";
import { toast } from 'sonner';
import { CartContext } from "../../context/cartContext";
import { ShoppingCart, ArrowLeft, Heart, Shield, Truck, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductById(id);
        setProduct(fetchedProduct);
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    const timer = setTimeout(() => { fetchProduct(); }, 300);
    return () => clearTimeout(timer);
  }, [id]);

  const handleAddToCart = () => {
    updateCart({ _id: product._id, name: product.name, price: product.price, image: product.image, description: product.description, count: 1 });
    toast.success('Item added to cart');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="glass-card p-8 text-center max-w-md">
          <p className="text-red-400 text-lg mb-4">Error fetching product details.</p>
          <button onClick={() => navigate(-1)} className="btn-gradient !rounded-xl">Go Back</button>
        </div>
      </div>
    );
  }

  const features = [
    { icon: Truck, label: "Free Delivery", desc: "Orders above Rs. 5,000" },
    { icon: Shield, label: "Genuine Product", desc: "100% authentic" },
    { icon: RotateCcw, label: "Easy Returns", desc: "7-day return policy" },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-16">
      <div className="max-w-5xl mx-auto pt-8">
        <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 text-sm">
          <ArrowLeft size={16} /> Back
        </motion.button>

        {product && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="glass-card-strong overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="relative bg-white/[0.03] p-8 md:p-12 flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
                <img src={product.image} alt={product.name} className="max-h-80 max-w-full object-contain" />
                <button onClick={() => { setIsLiked(!isLiked); toast.success(isLiked ? "Removed from favorites" : "Added to favorites"); }} className="absolute top-6 right-6 p-3 bg-black/30 backdrop-blur-sm rounded-full border border-white/10 hover:bg-red-500/20 transition-all">
                  <Heart size={18} className={`${isLiked ? "fill-red-500 text-red-500" : "text-gray-400"} transition-all`} />
                </button>
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-3">Premium Collection</p>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">{product.name}</h1>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{product.description}</p>
                  <div className="flex items-baseline gap-3 mb-8">
                    <span className="text-3xl font-extrabold gradient-text">Rs. {product.price?.toLocaleString()}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <button onClick={handleAddToCart} className="btn-gradient w-full flex items-center justify-center gap-2 !rounded-xl !py-4 text-base">
                    <ShoppingCart size={18} /> Add To Cart
                  </button>
                  <div className="grid grid-cols-3 gap-3 pt-4">
                    {features.map((feat, i) => (
                      <div key={i} className="text-center p-3 bg-white/[0.03] rounded-xl border border-white/5">
                        <feat.icon size={18} className="text-yellow-400 mx-auto mb-1.5" />
                        <p className="text-[10px] font-semibold text-gray-300">{feat.label}</p>
                        <p className="text-[9px] text-gray-600">{feat.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default ProductDetailsPage;
