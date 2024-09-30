import { Heart } from "lucide-react";
import { useState, useContext } from "react";
import { CartContext } from "../../../context/cartContext";
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
// import {Minus} from "lucide-react";

function ProductCard(props) {
    const [num, setNum] = useState(0);
    const { updateCart } = useContext(CartContext);
    const [isLiked, setIsLiked] = useState(false);

    const handleHeartClick = (e) => {
        e.stopPropagation(); // Prevent click from triggering the Link
        setIsLiked(!isLiked);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation(); // Prevent click from triggering the Link
        setNum(num + 1);
        updateCart({
            _id: props._id,
            name: props.name,
            price: props.price,
            image: props.image,
            description: props.description,
            count: 1, // increment by 1
        });
        toast.success('Item added to cart');
    };

    // const handleMinusClick = (e) => {
    //     e.stopPropagation(); 
    //     if (num > 0) {
    //         setNum(num - 1);
    //         updateCart({
    //             _id: props._id,
    //             name: props.name,
    //             price: props.price,
    //             image: props.image,
    //             description: props.description,
    //             count: -1, 
    //         });
    //     }
    // };

    const handleImageClick = () => {
        // This function will handle the navigation
    };

    return (
        <div className="h-[450px] relative">
            <div className="h-64 bg-[#f4f8f9] relative opacity-90 cursor-pointer" onClick={() => handleImageClick()}>
                <Link to={`/product/${props._id}`}>
                    <img src={props.image} alt={props.name} className="w-full h-full object-cover" />
                </Link>
            </div>
            <p className="text-xl font-bold text-yellow-400 shadow-lg bg-blue-950 p-4 rounded-lg flex justify-between items-center">
                {num}
                <Heart
                    className={`cursor-pointer text-red-500 ${isLiked ? 'fill-red-500' : ''}`}
                    onClick={handleHeartClick}
                />
            </p>
            <div className="mt-2">
                <div className="flex items-center justify-between">
                    <span className="block text-2xl font-semibold">{props.name}</span>
                    <span className="block font-semibold">Rs. {props.price}</span>
                </div>
                {/* <p className="text-sm">{props.description}</p> */}
                <div className="flex items-center space-x-2 mb-12">
                    <button
                        type="button"
                        className="bg-white text-black border-2 border-black px-4 py-1 text-lg rounded-lg mt-2 font-medium hover:bg-yellow-400 hover:text-blue-900"
                        onClick={handleAddToCart}
                    >
                        Add To Cart
                    </button>
                    {/* <button
                        onClick={handleMinusClick}
                        type="button"
                        className="border-2 border-black px-2 py-1 flex items-center justify-center bg-white text-black text-lg rounded-lg mt-2 font-bold hover:bg-yellow-400"
                        style={{ width: '40px', height: '40px' }}
                    >
                        <Minus className="w-5 h-4" /> 
                    </button> */}
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
