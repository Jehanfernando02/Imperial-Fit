function HSection() {
  return (
      <section className="relative py-16 px-4 sm:px-6 md:px-12 lg:px-16 w-full min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 overflow-auto">
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
          <div className="absolute inset-0 bg-black opacity-60"></div>

          <div className="relative z-10 flex flex-col justify-center h-full text-gray-100">
              <div className="max-w-4xl mx-auto text-center">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-8 leading-tight text-yellow-300">
                      Elevate Your Fitness Journey with Imperial Fit
                  </h1>
                  <p className="bg-gray-900/90 text-sm sm:text-base md:text-lg px-4 py-6 sm:px-8 md:px-12 md:py-8 rounded-lg shadow-2xl max-w-3xl mx-auto leading-relaxed mb-8">
                      Visit our <strong className="text-yellow-400">Shop</strong> for premium fitness products:
                      <ul className="list-disc list-inside text-left mt-4">
                          <li><strong className="text-red-500">Mass Gainers</strong> - Build muscle effectively.</li>
                          <li><strong className="text-red-500">Whey Protein</strong> - Support recovery and growth.</li>
                          <li><strong className="text-red-500">Creatine</strong> - Boost strength and endurance.</li>
                          <li><strong className="text-red-500">Accessories</strong> - Optimize your workouts.</li>
                          <li><strong className="text-red-500">Weights</strong> - Perfect for all exercises.</li>
                      </ul>
                      Add items to your cart and enjoy a seamless checkout experience!
                  </p>
                  <p className="bg-gray-900/90 text-sm sm:text-base md:text-lg px-4 py-6 sm:px-8 md:px-12 md:py-8 rounded-lg shadow-2xl max-w-3xl mx-auto leading-relaxed">
                      At Imperial Fit, we offer top-notch resources and unparalleled support. Shop with ease using our cash-on-delivery option and take your fitness to new heights.
                  </p>
              </div>
          </div>
      </section>
  );
}

export default HSection;