import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getProductById } from "../../services/api/products";
import { toast } from 'sonner';
import { CartContext } from "../../../src/context/cartContext";

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductById(id);
        console.log("Fetched Product Image URL: ", fetchedProduct.image);  // Log the image URL
        setProduct(fetchedProduct);
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    // Simulate loading state for at least 1 second
    const timer = setTimeout(() => {
      fetchProduct();
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  const handleAddToCart = () => {
    // Directly add the product to the cart without considering quantity
    updateCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      count: 1, // Set count to 1 as quantity input is removed
    });
    toast.success('Item added to cart');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="relative flex items-center justify-center min-h-screen">
        <img 
          src="/public/assets/Hero/bg4.jpg" 
          alt="Hero Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-20" 
        />
        <div className="relative z-10 text-4xl text-black">Loading product details...</div>
      </div>
    );
  }

  if (isError) {
    return <div className="text-center text-red-500">Error fetching product details.</div>;
  }

  return (
    <div className="pt-24 px-4 bg-gradient-to-r from-black to-indigo-500 min-h-screen">
      {product && (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">{product.name}</h1>
          {/* <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto rounded-md mb-6 shadow-md" 
          /> */}
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-gray-900 mb-4">Price: Rs. {product.price}</p>
          <div className="mt-6 flex justify-between">
            <button
              type="button"
              className="bg-blue-600 text-white px-6 py-2 text-lg rounded-lg hover:bg-blue-500 transition duration-300"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
            <button 
              onClick={handleGoBack}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
            >
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailsPage;
