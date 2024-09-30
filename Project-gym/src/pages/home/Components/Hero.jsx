import { Link } from "react-router-dom";
function Hero() {
    return (
        <section className="relative w-full h-screen overflow-hidden">
            {/* Background Image */}
            <img 
                src="public/assets/Hero/bg4.jpg" 
                alt="Hero Background" 
                className="absolute inset-0 w-full h-full object-cover opacity-100" 
            />
            <div className="absolute inset-0 bg-black opacity-40"></div>
            {/* Content Wrapper */}
            <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-16 py-12 text-white">
                {/* Content */}
                <div className="max-w-3xl mx-auto text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight font-poppins mt-6">

                                            Welcome to Imperial Fit!
                    </h1>
                  <p className="bg-stone-800 text-white px-8 py-6 md:px-12 md:py-8 rounded-lg shadow-lg max-w-3xl mx-auto leading-relaxed mb-8">
    At Imperial Fit, we provide everything you need to elevate your fitness journey. Our website features comprehensive gym schedules catering to all levels, from beginners to advanced athletes, targeting every muscle group to help you achieve your fitness goals.
    <br /><br />
    Explore our <strong className="text-red-400">Shop</strong>, where you’ll find top-quality equipment, stylish apparel, and essential supplements to support your training.
    <br /><br />
    Stay informed and motivated with our <strong className="text-red-400">Blog</strong>, offering valuable insights on fitness tips, nutrition advice, and the latest news and updates.
    <br /><br />
    Discover tailored <strong className="text-red-400">Programs</strong> designed to meet your specific needs and enhance your overall fitness experience. Join us at Imperial Fit and transform your health and well-being with the best resources and community support available!
</p>

                    {/* Call-to-Action Button */}
                    <div className="text-center md:text-left">
                        <Link
                            to="/shop"
                            className="inline-block px-6 py-3 text-lg font-semibold text-black bg-red-600 rounded-lg shadow-lg hover:bg-yellow-500 transition duration-300"
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
