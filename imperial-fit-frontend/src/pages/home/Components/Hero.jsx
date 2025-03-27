import { Link } from "react-router-dom";

function Hero() {
    return (
        <section className="relative w-full h-screen overflow-hidden">
            <img 
            //correct path
                src="assets/Hero/bg4.jpg" 
                alt="Hero Background" 
                className="absolute inset-0 w-full h-full object-cover opacity-90" 
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 flex flex-col justify-center h-full px-4 sm:px-6 md:px-12 lg:px-16 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        Welcome to Imperial Fit!
                    </h1>
                    <p className="bg-stone-800/80 text-sm sm:text-base md:text-lg px-4 py-6 sm:px-8 md:px-12 md:py-8 rounded-lg shadow-lg max-w-3xl mx-auto leading-relaxed">
                        At Imperial Fit, we provide everything you need to elevate your fitness journey. Explore our comprehensive gym schedules, premium shop, insightful blog, and tailored programs designed for all levels.
                    </p>
                    <div className="mt-8">
                        <Link
                            to="/shop"
                            className="inline-block px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold text-black bg-red-600 rounded-lg shadow-lg hover:bg-yellow-500 transition-all duration-300"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;