import { Heart, Plus, Minus, ShoppingCart } from "lucide-react";
import { useState, useContext } from "react";
import { CartContext } from "../../../context/cartContext";
import { toast } from "sonner";
import { Link } from "react-router-dom";

function ProductCard(props) {
  const [count, setCount] = useState(0);
  const { updateCart } = useContext(CartContext);
  const [isLiked, setIsLiked] = useState(false);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Removed from favorites" : "Added to favorites", {
      duration: 1500,
    });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
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
      className: "bg-green-500 text-white",
    });
  };

  const handleRemoveFromCart = (e) => {
    e.stopPropagation();
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
    <div className="relative group rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 overflow-hidden border border-gray-200">
      {/* Background image with blur effect */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/Hero/bg4.jpg" 
          alt="Background" 
          className="w-full h-full object-cover opacity-10 blur-sm" 
        />
      </div>
      
      {/* Semi-transparent overlay for better contrast */}
      <div className="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-sm z-0"></div>
      
      {/* Gradient accent at the top */}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 z-10"></div>
      
      {/* Heart button with improved styling */}
      <button
        onClick={handleHeartClick}
        className="absolute top-3 right-3 z-20 p-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-full hover:bg-red-100 transition-colors duration-200 shadow-md"
      >
        <Heart
          size={18}
          className={`text-red-500 ${isLiked ? "fill-red-500" : "fill-none"} transition-all duration-200`}
        />
      </button>

      {/* Image Section with proper padding and containment */}
      <Link
        to={`/product/${props._id}`}
        className="block relative z-10 pt-5 px-5 pb-3"
      >
        <div className="h-44 bg-white bg-opacity-50 backdrop-blur-sm rounded-lg overflow-hidden flex items-center justify-center p-3">
          <img
            src={props.image}
            alt={props.name}
            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Content Section with improved spacing */}
      <div className="p-5 pt-2 relative z-10">
        {/* Name and Price with better spacing */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-bold text-gray-900 tracking-tight truncate max-w-[70%]">
            {props.name}
          </h3>
          <span className="text-base font-semibold text-emerald-600">
            Rs. {props.price.toLocaleString()}
          </span>
        </div>

        {/* Description with more room */}
        <p className="text-xs text-gray-600 line-clamp-2 mb-3 min-h-8">
          {props.description || "Premium gear to elevate your fitness journey."}
        </p>

        {/* Controls with improved styling */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 bg-gray-100 rounded-full p-0.5 shadow-sm">
            <button
              onClick={handleRemoveFromCart}
              className="p-1.5 bg-white rounded-full hover:bg-gray-200 disabled:opacity-40 transition-colors duration-200"
              disabled={count === 0}
            >
              <Minus size={14} className="text-gray-700" />
            </button>
            <span className="text-sm font-medium text-indigo-600 w-7 text-center">
              {count}
            </span>
            <button
              onClick={handleAddToCart}
              className="p-1.5 bg-white rounded-full hover:bg-gray-200 transition-colors duration-200"
            >
              <Plus size={14} className="text-gray-700" />
            </button>
          </div>
          
          {/* Add to Cart Button with enhanced styling */}
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-medium text-xs shadow-md hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 flex items-center gap-1.5"
          >
            <ShoppingCart size={14} />
            Add to Cart
          </button>
        </div>
      </div>
      
      {/* Enhanced hover effect on the border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-300 rounded-lg transition-all duration-300 pointer-events-none z-10"></div>
    </div>
  );
}

export default ProductCard;