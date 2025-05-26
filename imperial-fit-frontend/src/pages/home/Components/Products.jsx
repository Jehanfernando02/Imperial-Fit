import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import Tab from "./Tab";
import { getAllProducts } from "../../../services/api/products";
import { getAllCategories } from "../../../services/api/categories";
import { Link } from "react-router-dom";
import { Dumbbell } from "lucide-react";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortOrder, setSortOrder] = useState("low-to-high");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [progress, setProgress] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const loadingMessages = [
    "Our servers are powering up!",
    "Loading premium fitness gear!",
    "Getting your workout essentials ready!",
    "Pumping up the shop for you!",
    "Almost ready to lift off!"
  ];

  const fetchProducts = async (categoryId, isInitial = false) => {
    if (isInitial) setIsInitialLoading(true);
    else setIsCategoryLoading(true);
    try {
      const response = await getAllProducts({ categoryId, sort: sortOrder });
      setProducts(response);
    } catch (e) {
      setError(e.message);
      console.error(e);
    } finally {
      if (isInitial) setIsInitialLoading(false);
      else setIsCategoryLoading(false);
    }
  };

  const handleTabClick = (id) => {
    setSelectedCategory(id);
    fetchProducts(id);
  };

  const handleSortChange = (event) => {
    const selectedSortOrder = event.target.value;
    setSortOrder(selectedSortOrder);
    fetchProducts(selectedCategory);
  };

  useEffect(() => {
    if (isInitialLoading) {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 20;
        });
      }, 500);

      const messageInterval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 3000);

      return () => {
        clearInterval(progressInterval);
        clearInterval(messageInterval);
      };
    }
  }, [isInitialLoading]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
        await fetchProducts("ALL", true);
      } catch (e) {
        setError(e.message);
        console.error(e);
      }
    };
    fetchInitialData();
  }, []);

  if (isInitialLoading) {
    return (
      <section className="relative flex items-center justify-center w-full min-h-screen px-4 py-12 bg-neutral-900">
        <img
          src="/assets/Hero/bg4.jpg"
          alt="Background"
          className="absolute inset-0 object-cover w-full h-full opacity-40 blur-sm"
        />
        <div className="relative z-10 max-w-lg text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="mx-auto mb-4"
          >
            <Dumbbell className="w-12 h-12 text-yellow-400" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 text-3xl font-extrabold tracking-tight text-yellow-400 sm:text-4xl"
          >
            Powering Up Your Shop!
          </motion.h2>
          <AnimatePresence mode="wait">
            <motion.p
              key={currentMessageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="mb-6 text-lg font-semibold text-gray-100 sm:text-xl"
            >
              {loadingMessages[currentMessageIndex]}
            </motion.p>
          </AnimatePresence>
          <div className="relative w-3/4 h-4 mx-auto overflow-hidden bg-gray-700 rounded-full">
            <motion.div
              className="h-4 bg-gradient-to-r from-yellow-400 to-red-600"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  if (isCategoryLoading) {
    return (
      <section className="relative flex items-center justify-center w-full min-h-screen px-4 py-12 bg-neutral-900">
        <img
          src="/assets/Hero/bg4.jpg"
          alt="Background"
          className="absolute inset-0 object-cover w-full h-full opacity-40 blur-sm"
        />
        <div className="relative z-10 text-3xl text-white animate-pulse">
          Loading
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative w-full min-h-screen px-4 py-12 bg-gradient-to-r from-red-500 to-yellow-500">
        <h1 className="text-xl text-center text-white sm:text-2xl">Error: {error}</h1>
      </section>
    );
  }

  const sortProducts = (products, sortOrder) => {
    return products.sort((p1, p2) => {
      const priceA = parseFloat(p1.price);
      const priceB = parseFloat(p2.price);
      return sortOrder === "low-to-high" ? priceA - priceB : priceB - priceA;
    });
  };

  const sortedProducts = sortProducts([...products], sortOrder);

  return (
    <section className="w-full min-h-screen px-4 py-12 bg-neutral-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="pt-12 mb-6 text-2xl font-extrabold text-center text-red-600 sm:text-3xl md:text-4xl">
          Premium Gear for Every Fitness Journey
        </h1>
        <div className="flex flex-col items-center justify-between gap-4 mb-6 sm:flex-row">
          <div className="flex items-center">
            <label htmlFor="sort" className="mr-2 text-sm font-semibold text-white sm:text-base">Sort by Price:</label>
            <select
              id="sort"
              value={sortOrder}
              onChange={handleSortChange}
              className="p-2 text-sm text-black bg-white rounded-lg sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
          <Link to="/order">
            <button className="px-4 py-2 text-sm text-black transition-all duration-300 bg-yellow-400 rounded-md shadow-md sm:text-base hover:bg-red-600 hover:text-white">
              View Past Orders
            </button>
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mt-6 overflow-x-auto sm:gap-4">
          {[{ _id: "ALL", name: "All" }, ...categories].map((el) => (
            <Tab
              key={el._id}
              category={el}
              onClick={handleTabClick}
              isActive={selectedCategory === el._id}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((el) => (
              <ProductCard
                key={el._id}
                _id={el._id}
                image={el.image}
                name={el.name}
                price={el.price}
                description={el.description}
              />
            ))
          ) : (
            <p className="text-sm text-center text-white col-span-full sm:text-base">No products found</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Products;