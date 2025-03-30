import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Tab from "./Tab";
import { getAllProducts } from "../../../services/api/products";
import { getAllCategories } from "../../../services/api/categories";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true); // For initial page load
  const [isCategoryLoading, setIsCategoryLoading] = useState(false); // For category switches
  const [error, setError] = useState("");
  const [sortOrder, setSortOrder] = useState("low-to-high");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

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
    fetchProducts(id); // Category switch, not initial load
  };

  const handleSortChange = (event) => {
    const selectedSortOrder = event.target.value;
    setSortOrder(selectedSortOrder);
    fetchProducts(selectedCategory); // Category re-fetch, not initial load
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
        await fetchProducts("ALL", true); // Initial load
      } catch (e) {
        setError(e.message);
        console.error(e);
      }
    };
    fetchInitialData();
  }, []);

  if (isInitialLoading) {
    return (
      <section className="relative py-12 px-4 w-full min-h-screen flex items-center justify-center bg-neutral-900">
        <img 
          src="/assets/Hero/bg4.jpg" 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm" 
        />
        <div className="relative z-10 text-center max-w-md animate-softFadeIn">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Warming up your workout gear!
          </h2>
          <p className="text-gray-200 text-sm sm:text-base mb-6">
            Our servers are stretching—just a moment, and we’ll be ready!
          </p>
          <div className="w-3/4 mx-auto bg-gray-700 rounded-full h-2 overflow-hidden">
            <div className="bg-yellow-400 h-2 animate-softPulse"></div>
          </div>
        </div>
      </section>
    );
  }

  if (isCategoryLoading) {
    return (
      <section className="relative py-12 px-4 w-full min-h-screen flex items-center justify-center bg-neutral-900">
        <div className="text-center">
          <p className="text-white text-lg">Loading...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative py-12 px-4 w-full min-h-screen bg-gradient-to-r from-red-500 to-yellow-500">
        <h1 className="text-white text-center text-xl sm:text-2xl">Error: {error}</h1>
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
    <section className="bg-neutral-900 py-12 px-4 sm:px-6 lg:px-8 w-full min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-red-600 mb-6 text-center pt-12">
          Premium Gear for Every Fitness Journey
        </h1>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center">
            <label htmlFor="sort" className="text-white text-sm sm:text-base font-semibold mr-2">Sort by Price:</label>
            <select
              id="sort"
              value={sortOrder}
              onChange={handleSortChange}
              className="p-2 text-sm sm:text-base bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
          <Link to="/order">
            <button className="bg-yellow-400 text-black py-2 px-4 text-sm sm:text-base rounded-md hover:bg-red-600 hover:text-white transition-all duration-300 shadow-md">
              View Past Orders
            </button>
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 overflow-x-auto">
          {[{ _id: "ALL", name: "All" }, ...categories].map((el) => (
            <Tab
              key={el._id}
              category={el}
              onClick={handleTabClick}
              isActive={selectedCategory === el._id}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
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
            <p className="text-white text-center col-span-full text-sm sm:text-base">No products found</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Products;