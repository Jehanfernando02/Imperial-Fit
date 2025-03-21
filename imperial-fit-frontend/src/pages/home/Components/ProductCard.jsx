import { Heart, Plus, Minus } from "lucide-react";
import { useState, useContext } from "react";
import { CartContext } from "../../../context/cartContext";
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

function ProductCard(props) {
    const [count, setCount] = useState(0);
    const { updateCart } = useContext(CartContext);
    const [isLiked, setIsLiked] = useState(false);

    const handleHeartClick = (e) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
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
        toast.success('Item added to cart');
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
        }
    };

    return (
        <div className="relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            <Link to={`/product/${props._id}`} className="block h-40 sm:h-48 md:h-56 bg-[#f4f8f9] rounded-t-lg overflow-hidden">
                <img 
                    src={props.image} 
                    alt={props.name} 
                    className="w-full h-full object-contain sm:object-cover transition-transform duration-300 hover:scale-105" 
                />
            </Link>
            <div className="p-3 sm:p-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-base sm:text-lg font-semibold text-gray-800">{props.name}</span>
                    <span className="text-base sm:text-lg font-semibold text-green-600">Rs. {props.price}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleRemoveFromCart}
                            className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
                            disabled={count === 0}
                        >
                            <Minus size={14} />
                        </button>
                        <span className="text-base sm:text-lg text-fuchsia-700">{count}</span>
                        <button
                            onClick={handleAddToCart}
                            className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                        >
                            <Plus size={14} />
                        </button>
                    </div>
                    <Heart
                        className={`cursor-pointer text-red-500 w-5 h-5 sm:w-6 sm:h-6 ${isLiked ? 'fill-red-500' : ''}`}
                        onClick={handleHeartClick}
                    />
                </div>
                <button
                    onClick={handleAddToCart}
                    className="mt-3 w-full bg-yellow-400 text-black px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-300"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ProductCard;