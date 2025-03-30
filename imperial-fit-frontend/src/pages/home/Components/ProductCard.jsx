import { useState, useEffect, useContext } from "react";
import { Heart, Plus, Minus } from "lucide-react";
import { CartContext } from "../../context/cartContext"; // Adjust path as needed
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { getProducts } from "../../services/api/products"; // Assume an API service exists

// ProductCard Component
function ProductCard({ _id, name, price, image, description }) {
  const [count, setCount] = useState(0);
  const { updateCart } = useContext(CartContext);
  const [isLiked, setIsLiked] = useState(false);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Removed from favorites" : "Added to favorites", {
      duration: 1500,
      className: "bg-yellow-500 text-white",
    });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setCount(count + 1);
    updateCart({ _id, name, price, image, description, count: 1 });
    toast.success(`${name} added to cart!`, {
      duration: 2000,
      className: "bg-green-500 text-white",
    });
  };

  const handleRemoveFromCart = (e) => {
    e.stopPropagation();
    if (count > 0) {
      setCount(count - 1);
      updateCart({ _id, name, price, image, description, count: -1 });
      toast.info(`Removed one ${name} from cart`, {
        duration: 1500,
        className: "bg-blue-500 text-white",
      });
    }
  };

  return (
    <div className="relative group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-400 ease-in-out transform hover:-translate-y-1 border border-gray-100/50 overflow-hidden w-full max-w-[280px] mx-auto">
      {/* Image Section */}
      <Link
        to={`/product/${_id}`}
        className="block h-36 sm:h-40 bg-gradient-to-b from-gray-50 to-gray-100 rounded-t-lg overflow-hidden relative"
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
      </Link>

      {/* Content Section */}
      <div className="p-3 sm:p-4">
        {/* Name and Price */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 tracking-tight truncate">
            {name}
          </h3>
          <span className="text-base sm:text-lg font-medium text-emerald-600">
            Rs. {price.toLocaleString()}
          </span>
        </div>

        {/* Description Snippet */}
        <p className="mt-1 text-xs text-gray-600 line-clamp-2">
          {description || "Top-tier gear for your fitness goals."}
        </p>

        {/* Controls */}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1 shadow-sm">
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
          <button
            onClick={handleHeartClick}
            className="p-1.5 rounded-full hover:bg-red-100 transition-colors duration-200"
          >
            <Heart
              size={18}
              className={`text-red-500 ${isLiked ? "fill-red-500" : "fill-none"} transition-all duration-300`}
            />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-3 w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-md font-semibold text-xs sm:text-sm shadow-sm hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-1"
        >
          <Plus size={14} />
          Add to Cart
        </button>
      </div>

      {/* Hover Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}

// ProductsPage Component
function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Sample data if API isn’t ready
  const sampleProducts = [
    { _id: "1", name: "Protein Powder", price: 2500, image: "/assets/products/protein.jpg", description: "High-quality whey for muscle recovery." },
    { _id: "2", name: "Resistance Bands", price: 1500, image: "/assets/products/bands.jpg", description: "Versatile bands for strength training." },
    { _id: "3", name: "Yoga Mat", price: 2000, image: "/assets/products/mat.jpg", description: "Non-slip mat for ultimate comfort." },
    { _id: "4", name: "Dumbbells Set", price: 3500, image: "/assets/products/dumbbells.jpg", description: "Adjustable weights for all levels." },
    { _id: "5", name: "Shaker Bottle", price: 800, image: "/assets/products/shaker.jpg", description: "Leak-proof bottle for your shakes." },
  ];

  if (loading) {
    return (
      <main className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
        <img
          src="/assets/Hero/bg4.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-15 blur-xl scale-110"
        />
        <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>
        <div className="relative z-10 text-center animate-softFadeIn">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Loading Products...
          </h2>
          <p className="text-lg md:text-xl text-gray-200">
            Gear up—your fitness essentials are almost here!
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-gray-900 py-16 px-4 sm:px-8 lg:px-16 overflow-hidden">
      {/* Blurred Background */}
      <img
        src="/assets/Hero/bg4.jpg"
        alt="Products Background"
        className="absolute inset-0 w-full h-full object-cover opacity-15 blur-xl scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center text-yellow-400 mb-8 sm:mb-12 pt-12 tracking-tight animate-softFadeIn">
          Shop Fitness Essentials
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-200 text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
          Elevate your workouts with top-tier gear designed for every goal.
        </p>

        {/* Products Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {(products.length > 0 ? products : sampleProducts).map((product) => (
            <ProductCard
              key={product._id}
              _id={product._id}
              name={product.name}
              price={product.price}
              image={product.image}
              description={product.description}
            />
          ))}
        </section>
      </div>
    </main>
  );
}

export default ProductsPage;