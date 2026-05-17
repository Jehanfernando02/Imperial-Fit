import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import Tab from "./Tab";
import { getAllProducts } from "../../../services/api/products";
import { getAllCategories } from "../../../services/api/categories";
import { Link } from "react-router-dom";
import { Dumbbell, Package, ChevronDown } from "lucide-react";

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
      return () => { clearInterval(progressInterval); clearInterval(messageInterval); };
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
      <section className="relative flex items-center justify-center w-full min-h-screen px-4 py-12">
        <img src="/assets/Hero/bg4.jpg" alt="Background" className="absolute inset-0 object-cover w-full h-full opacity-[0.05] blur-sm" />
        <div className="relative z-10 max-w-lg text-center">
          <motion.div animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} className="mx-auto mb-4">
            <Dumbbell className="w-12 h-12 text-yellow-400" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-4 text-3xl font-extrabold tracking-tight gradient-text sm:text-4xl">
            Powering Up Your Shop!
          </motion.h2>
          <AnimatePresence mode="wait">
            <motion.p key={currentMessageIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }} className="mb-6 text-lg font-semibold text-gray-300 sm:text-xl">
              {loadingMessages[currentMessageIndex]}
            </motion.p>
          </AnimatePresence>
          <div className="relative w-3/4 h-2 mx-auto overflow-hidden bg-white/10 rounded-full">
            <motion.div className="h-2 bg-gradient-to-r from-red-500 to-yellow-400 rounded-full" initial={{ width: "0%" }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: "easeOut" }} />
          </div>
        </div>
      </section>
    );
  }

  if (isCategoryLoading) {
    return (
      <section className="relative flex items-center justify-center w-full min-h-screen">
        <div className="w-10 h-10 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex items-center justify-center w-full min-h-screen">
        <div className="glass-card p-8 text-center"><p className="text-red-400">Error: {error}</p></div>
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
    <section className="w-full min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="pt-8 mb-10 text-center">
          <h1 className="text-3xl font-extrabold gradient-text sm:text-4xl md:text-5xl mb-3">
            Premium Fitness Gear
          </h1>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">Curated collection for every fitness journey</p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <label htmlFor="sort" className="text-sm font-medium text-gray-400">Sort:</label>
            <div className="relative">
              <select
                id="sort"
                value={sortOrder}
                onChange={handleSortChange}
                className="glass-input appearance-none rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-200 cursor-pointer"
              >
                <option value="low-to-high" className="bg-neutral-900">Low to High</option>
                <option value="high-to-low" className="bg-neutral-900">High to Low</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/order" className="flex items-center gap-2 glass-input !border-yellow-400/20 hover:!border-yellow-400/40 rounded-xl px-4 py-2.5 text-sm text-yellow-400 font-medium transition-all">
              <Package size={14} /> Past Orders
            </Link>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {[{ _id: "ALL", name: "All" }, ...categories].map((el) => (
            <Tab key={el._id} category={el} onClick={handleTabClick} isActive={selectedCategory === el._id} />
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((el) => (
              <ProductCard key={el._id} _id={el._id} image={el.image} name={el.name} price={el.price} description={el.description} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="glass-card inline-block p-8">
                <Package size={40} className="text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No products found</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Products;