import { Link } from "react-router-dom";

function ConfirmationPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-32 relative">
            <img 
                src="/public/assets/Hero/bg4.jpg" 
                alt="Background" 
                className="absolute inset-0 w-full h-full object-cover opacity-50" 
            />
            <div className="relative z-10 bg-white p-8 sm:p-10 rounded-lg shadow-lg max-w-md w-full text-center transition-transform transform hover:scale-105">
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-gray-800">Thank You!</h2>
                <p className="text-base sm:text-lg text-gray-600 mb-6">
                    Your order has been successfully placed.
                </p>
                <Link
                    to="/"
                    className="inline-block bg-red-500 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                    Return to Home
                </Link>
            </div>
        </div>
    );
}

export default ConfirmationPage;