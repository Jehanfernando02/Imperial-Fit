function HSection() {
    return (
      <section className="relative py-16 px-4 w-full min-h-screen overflow-auto bg-gradient-to-r from-gray-800 to-gray-900">
        <img
          src="/assets/Hero/bg4.jpg"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
  
        <img
          src="/assets/Hero/bg1.avif"
          alt="Back2"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
  
        <div className="absolute inset-0 bg-black opacity-50"></div>
  
        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-16 py-12 text-gray-100">
          {/* Content */}
          <div className="max-w-4xl mx-auto text-center md:text-left">
            <h1 className="text-4xl md:text-3xl font-extrabold mb-8 leading-tight font-poppins mt-6 text-yellow-300">
              Elevate Your Fitness Journey with Imperial Fit
            </h1>
  
            <p className="bg-gray-900 text-gray-100 px-8 py-6 md:px-12 md:py-8 rounded-lg shadow-2xl max-w-3xl mx-auto leading-relaxed mb-8">
              Visit our <strong className="text-yellow-400">Shop</strong> to explore a wide range of premium fitness products. Our categories include:
              <ul className="list-disc list-inside mb-4"><br></br>
                <li><strong className="text-red-500">Mass Gainers</strong> - Achieve your muscle-building goals with our effective mass gainers.</li>
                <li><strong className="text-red-500">Whey Protein</strong> - Boost your protein intake with high-quality whey protein, perfect for muscle recovery and growth.</li>
                <li><strong className="text-red-500">Creatine</strong> - Enhance your strength and endurance with top-grade creatine supplements.</li>
                <li><strong className="text-red-500">Accessories</strong> - Find essential workout accessories to optimize your training sessions.</li>
                <li><strong className="text-red-500">Weights</strong> - Choose from a variety of weights to suit your exercise needs.</li>
              </ul>
              Don’t forget to add your selected items to the cart and proceed to checkout for a seamless shopping experience. Equip yourself with the best to push your limits and achieve remarkable results!
            </p>
  
            <p className="bg-gray-900 text-gray-100 px-8 py-6 md:px-12 md:py-8 rounded-lg shadow-2xl max-w-3xl mx-auto leading-relaxed mb-8">
  At Imperial Fit, we are committed to providing top-notch fitness resources and unparalleled customer support. Our user-friendly website makes it easy to browse, select, and purchase the best products for your fitness journey. Whether you’re looking to build muscle, increase endurance, or simply maintain a healthy lifestyle, we have everything you need to succeed. Plus, we offer a convenient cash-on-delivery option, allowing you to shop with ease and confidence. Simply add your items to the cart, choose cash-on-delivery at checkout, and enjoy a seamless shopping experience from start to finish.
</p>

  
           
          </div>
        </div>
      </section>
    );
  }
  
  export default HSection;
  