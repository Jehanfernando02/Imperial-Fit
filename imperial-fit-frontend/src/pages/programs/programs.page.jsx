function ProgramsPage() {
  return (
      <main className="bg-gray-900 min-h-screen px-8 py-24">
          <div className="max-w-7xl mx-auto">
              <h1 className="text-5xl font-bold text-center text-yellow-400 mb-16">
                  Our Fitness Programs
              </h1>

              <section className="mb-12 bg-blue-600 rounded-lg p-8 shadow-lg hover:shadow-xl transition duration-300">
                  <h2 className="text-3xl font-semibold text-white mb-4">Weight Training</h2>
                  <p className="text-lg text-gray-200">
                      Build strength and muscle with our comprehensive weight training programs. Whether you're a beginner or an experienced lifter, our trainers will guide you through tailored routines to meet your goals. We focus on proper form, progressive overload, and balanced nutrition to ensure you gain lean muscle mass and improve overall strength.
                  </p>
              </section>

              <section className="mb-12 bg-green-600 rounded-lg p-8 shadow-lg hover:shadow-xl transition duration-300">
                  <h2 className="text-3xl font-semibold text-white mb-4">Cardio Training</h2>
                  <p className="text-lg text-gray-200">
                      Improve your cardiovascular health with our high-energy cardio programs. From interval training to steady-state cardio, we offer a variety of workouts designed to burn calories, improve endurance, and boost heart health. Join our group classes or work one-on-one with a trainer to maximize your cardio sessions.
                  </p>
              </section>

              <section className="mb-12 bg-purple-600 rounded-lg p-8 shadow-lg hover:shadow-xl transition duration-300">
                  <h2 className="text-3xl font-semibold text-white mb-4">Yoga & Flexibility</h2>
                  <p className="text-lg text-gray-200">
                      Enhance your flexibility and reduce stress with our yoga programs. Our certified instructors offer classes ranging from beginner to advanced levels, focusing on breath control, balance, and mental relaxation. Whether you're looking to increase your range of motion or find inner peace, our yoga classes are perfect for all fitness levels.
                  </p>
              </section>

              <section className="mb-12 bg-orange-600 rounded-lg p-8 shadow-lg hover:shadow-xl transition duration-300">
                  <h2 className="text-3xl font-semibold text-white mb-4">High-Intensity Interval Training (HIIT)</h2>
                  <p className="text-lg text-gray-200">
                      Experience the benefits of HIIT with our dynamic and challenging programs. These high-intensity workouts are designed to push your limits, combining short bursts of intense exercise with periods of rest or lower-intensity exercise. Perfect for those looking to burn fat, build endurance, and improve overall fitness in a time-efficient manner.
                  </p>
              </section>

              <section className="mb-12 bg-red-600 rounded-lg p-8 shadow-lg hover:shadow-xl transition duration-300">
                  <h2 className="text-3xl font-semibold text-white mb-4">Personal Training</h2>
                  <p className="text-lg text-gray-200">
                      Get personalized guidance with our expert personal trainers. Whether you're looking to lose weight, gain muscle, or simply improve your fitness, our trainers will create a custom program tailored to your needs and goals. Enjoy one-on-one sessions that focus on proper technique, motivation, and accountability.
                  </p>
              </section>
          </div>
      </main>
  );
}

export default ProgramsPage;
