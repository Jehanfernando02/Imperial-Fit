import React from "react";
import { Link } from "react-router-dom";

function ConfirmationPage() {
  return (
    <div className="min-h-screen flex justify-center items-center pt-32">
         {/* Background Image */}
         <img 
                src="public/assets/Hero/bg4.jpg" 
                alt="Hero Background" 
                className="absolute inset-0 w-full h-full object-cover opacity-50" 
            />
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full text-center transition-transform transform hover:scale-105">
        <h2 className="text-4xl font-extrabold mb-6 text-gray-800">Thank You!</h2>
        <p className="text-lg text-gray-600 mb-4">
          Your order has been successfully placed.
        </p>
        <Link
          to="/"
          className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}

export default ConfirmationPage;
