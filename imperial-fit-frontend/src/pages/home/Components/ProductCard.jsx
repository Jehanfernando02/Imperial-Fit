import { Heart, Plus, Minus, ShoppingCart } from "lucide-react";
import { useState, useContext } from "react";
import { CartContext } from "../../../context/cartContext";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function ProductCard(props) {
  const [count, setCount] = useState(0);
  const { updateCart } = useContext(CartContext);
  const [isLiked, setIsLiked] = useState(false);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Removed from favorites" : "Added to favorites", {
      duration: 1500,
    });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCount(count + 1);
    updateCart({
      _id: props._id,
      name: props.name,
      price: props.price,
      image: props.image,
      description: props.description,
      count: 1,
    });
    toast.success(`${props.name} added to cart!`, {
      duration: 2000,
    });
  };

  const handleRemoveFromCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (count > 0) {
      setCount(count - 1);
      updateCart({
        _id: props._id,
        name: props.name,
        price: props.price,
        image: props.image,
        description: props.description,
        count: -1,
      });
      toast.info(`Removed one ${props.name} from cart`, {
        duration: 1500,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative group glass-card overflow-hidden hover-glow transition-all duration-500"
    >
      {/* Top gradient accent */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300 z-10" />

      {/* Heart button */}
      <button
        onClick={handleHeartClick}
        className="absolute top-4 right-4 z-20 p-2 bg-black/40 backdrop-blur-sm rounded-full hover:bg-red-500/20 transition-all duration-200 border border-white/10"
      >
        <Heart
          size={16}
          className={`${isLiked ? "fill-red-500 text-red-500" : "text-gray-400"} transition-all duration-200`}
        />
      </button>

      {/* Image Section */}
      <Link
        to={`/product/${props._id}`}
        className="block relative z-10 p-4 pb-2"
      >
        <div className="h-44 bg-white/5 rounded-xl overflow-hidden flex items-center justify-center p-4 border border-white/5">
          <img
            src={props.image}
            alt={props.name}
            className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-4 pt-2 relative z-10">
        <div className="flex items-start justify-between mb-2 gap-2">
          <h3 className="text-sm font-bold text-gray-100 tracking-tight truncate flex-1">
            {props.name}
          </h3>
          <span className="text-sm font-bold text-yellow-400 whitespace-nowrap">
            Rs. {props.price?.toLocaleString()}
          </span>
        </div>

        <p className="text-xs text-gray-500 line-clamp-2 mb-4 min-h-[2rem]">
          {props.description || "Premium gear to elevate your fitness journey."}
        </p>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 bg-white/5 rounded-full p-0.5 border border-white/10">
            <button
              onClick={handleRemoveFromCart}
              className="p-1.5 rounded-full hover:bg-white/10 disabled:opacity-30 transition-colors duration-200"
              disabled={count === 0}
            >
              <Minus size={12} className="text-gray-400" />
            </button>
            <span className="text-xs font-semibold text-yellow-400 w-6 text-center">
              {count}
            </span>
            <button
              onClick={handleAddToCart}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors duration-200"
            >
              <Plus size={12} className="text-gray-400" />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="btn-gradient !py-2 !px-4 !rounded-full text-xs flex items-center gap-1.5"
          >
            <ShoppingCart size={12} />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;