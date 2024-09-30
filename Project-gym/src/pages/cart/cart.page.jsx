import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import { Link } from "react-router-dom";

function CartPage() {
  const { cart } = useContext(CartContext);

  // Calculate total amount with validation
  const totalAmount = cart.reduce((total, item) => {
    // Ensure the price exists and is a valid number
    const price = item?.price ? parseFloat(item.price.replace(/,/g, "")) : 0;
    const count = parseInt(item.count) || 0;
    return total + price * count;
  }, 0);

  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="py-12 px-16 max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-8 pt-16">
          Your Shopping Cart
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cart.length > 0 ? (
            cart.map((el) => (
              <div
                key={el.id}
                className="flex items-center border border-gray-300 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
              >
                <div className="w-1/3 md:w-1/4 bg-[#f4f8f9] rounded-lg overflow-hidden">
                  <img
                    src={el.image}
                    alt={el.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="w-2/3 md:w-3/4 pl-6">
                  <h1 className="text-3xl font-bold text-gray-700 mb-2">
                    {el.name}
                  </h1>
                  {/* <p className="text-gray-600 mb-4">{el.description}</p> */}
                  <div className="text-lg font-semibold text-gray-800">
                    <span>Price: </span>
                    <span className="text-green-600">
                      Rs. {el.price ? el.price : "N/A"}
                    </span>
                  </div>
                  <p className="mt-2 text-lg text-fuchsia-700">
                    Amount: {el.count}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xl text-gray-600 col-span-2">
              Your cart is currently empty.
            </p>
          )}
        </div>

        {cart.length > 0 && (
          <div className="mt-12 text-center">
            <div className="text-2xl font-bold text-gray-800 mb-4">
              Total Amount:{" "}
              <span className="text-red-600">
                Rs. {totalAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </span>
            </div>
            <Link
              className="inline-block border-2 border-gray-800 px-6 py-2 text-lg rounded-lg font-medium text-gray-800 bg-yellow-400 hover:bg-yellow-500 transition-colors duration-300"
              to="/checkout"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

export default CartPage;
