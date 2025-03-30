import { Heart, Plus, Minus } from "lucide-react";
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
    <div className="relative group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
      {/* Image Section */}
      <Link
        to={`/product/${props._id}`}
        className="block h-48 sm:h-60 md:h-72 bg-gradient-to-b from-gray-50 to-gray-100 rounded-t-xl overflow-hidden relative"
      >
        <img
          src={props.image}
          alt={props.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
      </Link>

      {/* Content Section */}
      <div className="p-4 sm:p-5">
        {/* Name and Price */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight truncate">
            {props.name}
          </h3>
          <span className="text-lg sm:text-xl font-semibold text-emerald-600">
            Rs. {props.price.toLocaleString()}
          </span>
        </div>

        {/* Description Snippet */}
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {props.description || "Premium gear to elevate your fitness journey."}
        </p>

        {/* Controls */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1 shadow-sm">
            <button
              onClick={handleRemoveFromCart}
              className="p-1.5 bg-white rounded-full hover:bg-gray-200 disabled:opacity-40 transition-colors duration-200"
              disabled={count === 0}
            >
              <Minus size={16} className="text-gray-700" />
            </button>
            <span className="text-lg font-medium text-indigo-600 w-8 text-center">
              {count}
            </span>
            <button
              onClick={handleAddToCart}
              className="p-1.5 bg-white rounded-full hover:bg-gray-200 transition-colors duration-200"
            >
              <Plus size={16} className="text-gray-700" />
            </button>
          </div>
          <button
            onClick={handleHeartClick}
            className="p-2 rounded-full hover:bg-red-100 transition-colors duration-200"
          >
            <Heart
              size={22}
              className={`text-red-500 ${isLiked ? "fill-red-500" : "fill-none"} transition-all duration-300`}
            />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold text-sm sm:text-base shadow-md hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Add to Cart
        </button>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
      </div>
    </div>
  );
}

export default ProductCard;