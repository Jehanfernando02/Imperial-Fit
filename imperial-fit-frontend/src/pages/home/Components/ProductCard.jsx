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
    <div className="relative group bg-white bg-opacity-80 backdrop-blur-sm rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-200 overflow-hidden">
      {/* Background image - consistent with other pages */}
      <div className="absolute inset-0 z-0 opacity-5">
        <img 
          src="/assets/Hero/bg4.jpg" 
          alt="Background" 
          className="w-full h-full object-cover blur-md" 
        />
      </div>
      
      {/* Background gradient accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
      
      {/* Heart button - moved to top right corner */}
      <button
        onClick={handleHeartClick}
        className="absolute top-2 right-2 z-10 p-1.5 bg-white bg-opacity-70 backdrop-blur-sm rounded-full hover:bg-red-100 transition-colors duration-200 shadow-sm"
      >
        <Heart
          size={18}
          className={`text-red-500 ${isLiked ? "fill-red-500" : "fill-none"} transition-all duration-200`}
        />
      </button>

      {/* Image Section - Reduced height */}
      <Link
        to={`/product/${props._id}`}
        className="block h-40 bg-gray-50 overflow-hidden relative"
      >
        <img
          src={props.image}
          alt={props.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300"></div>
      </Link>

      {/* Content Section - More compact */}
      <div className="p-4 relative z-10">
        {/* Name and Price */}
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900 tracking-tight truncate max-w-[70%]">
            {props.name}
          </h3>
          <span className="text-base font-semibold text-emerald-600">
            Rs. {props.price.toLocaleString()}
          </span>
        </div>

        {/* Description Snippet - Shorter */}
        <p className="mt-1 text-xs text-gray-600 line-clamp-1">
          {props.description || "Premium gear to elevate your fitness journey."}
        </p>

        {/* Controls - Redesigned to be more compact */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1 bg-gray-100 rounded-full p-0.5 shadow-sm">
            <button
              onClick={handleRemoveFromCart}
              className="p-1 bg-white rounded-full hover:bg-gray-200 disabled:opacity-40 transition-colors duration-200"
              disabled={count === 0}
            >
              <Minus size={14} className="text-gray-700" />
            </button>
            <span className="text-sm font-medium text-indigo-600 w-6 text-center">
              {count}
            </span>
            <button
              onClick={handleAddToCart}
              className="p-1 bg-white rounded-full hover:bg-gray-200 transition-colors duration-200"
            >
              <Plus size={14} className="text-gray-700" />
            </button>
          </div>
          
          {/* Add to Cart Button - More compact */}
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full font-medium text-xs shadow-md hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 flex items-center gap-1"
          >
            <ShoppingCart size={14} />
            Add
          </button>
        </div>
      </div>
      
      {/* Hover effect on the border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-300 rounded-lg transition-all duration-300 pointer-events-none"></div>
    </div>
  );
}

export default ProductCard;