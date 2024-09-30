import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Tab from "./Tab";
import { getAllProducts } from "../../../services/api/products";
import { getAllCategories } from "../../../services/api/categories";
import { Link } from "react-router-dom";

function Products() {
  // State to hold products, categories, loading state, errors, sorting order, and selected category
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortOrder, setSortOrder] = useState("low-to-high");
  const [selectedCategory, setSelectedCategory] = useState("ALL"); // New state for selected category

  // Function to fetch products
  const fetchProducts = async (categoryId) => {
    setIsLoading(true); 
    try {
      const response = await getAllProducts({ categoryId, sort: sortOrder });
      setProducts(response); // Set the fetched products in state
    } catch (e) {
      setError(e.message); // If any error occurs capturing it 
      console.error(e);
    } finally {
      setIsLoading(false); // Once the fetch is done it stops loading
    }
  };

  // Once a category tab is clicked, fetches the products from server for that particular category 
  const handleTabClick = (id) => {
    setSelectedCategory(id); // Update the selected category
    fetchProducts(id); // Fetch products for the selected category
  };

  // Handle change in sort by price 
  const handleSortChange = (event) => {
    const selectedSortOrder = event.target.value;
    setSortOrder(selectedSortOrder); // Updates the sort order
    fetchProducts(selectedCategory); // Fetch products with new sort order and current selected category
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData); // Setting categories for the tabs
        await fetchProducts("ALL"); // Fetch all products initially and display to the user
      } catch (e) {
        setError(e.message); 
        console.error(e);
      }
    };

    fetchInitialData();
  }, []);

  // Show a loading screen while data is being fetched
  if (isLoading) {
    return (
      <section className="relative py-16 px-4 w-full min-h-screen overflow-auto flex flex-col items-center justify-center">
        <img src="public/assets/Hero/bg4.jpg" alt="Hero Background" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="relative z-10 text-center">
          <div className="text-black text-5xl font-bold mb-4">Loading...</div>
          <div className="loader"></div> 
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative py-16 px-4 w-full min-h-screen overflow-auto bg-gradient-to-r from-red-500 to-yellow-500">
        <h1 className="text-white">Error: {error}</h1>
      </section>
    );
  }

  // Function to handle sorting 
  const sortProducts = (products, sortOrder) => {
    return products.sort((p1, p2) => {
      const priceA = parseFloat(p1.price);
      const priceB = parseFloat(p2.price);
      
      if (sortOrder === "low-to-high") {
        return priceA - priceB;
      } else if (sortOrder === "high-to-low") {
        return priceB - priceA;
      } 
      return 0; 
    });
  };

  const sortedProducts = sortProducts([...products], sortOrder);

  return (
    <section className="bg-neutral-900 relative py-16 px-4 w-full min-h-screen overflow-auto">
      <div className="relative z-10">
        <h1 className="text-5xl font-extrabold text-red-600 pt-16 mb-8 text-center">Premium Gear for Every Fitness Journey</h1>

        <div className="flex justify-between items-center mb-4 p-8">
          <div className="flex items-center">
            <label htmlFor="sort" className="text-white text-lg font-semibold mr-2">Sort by Price:</label>
            <select id="sort" value={sortOrder} onChange={handleSortChange} className="p-2 bg-white text-black rounded-lg">
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
          
          <Link to="/order">
            <button className="bg-yellow-400 text-black py-3 px-6 text-lg rounded-md hover:bg-red-600 hover:text-white hover:border-yellow-200 hover:border-2 transition duration-200 ease-in-out transform hover:scale-100 shadow-lg">
              View Past Orders
            </button>
          </Link>
        </div>

        {/* Category tabs */}
        <div className="flex space-x-4 mt-8 overflow-x-auto justify-center">
          {categories.length > 0 && [{ _id: "ALL", name: "All" }, ...categories].map((el) => (
            <Tab 
              key={el._id} 
              category={el} 
              onClick={handleTabClick} 
              isActive={selectedCategory === el._id} 
            />
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 text-white">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((el) => (
              <ProductCard key={el._id} _id={el._id} image={el.image} name={el.name} price={el.price} description={el.description} />
            ))
          ) : (
            <p className="text-white text-center">No products found</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Products;
