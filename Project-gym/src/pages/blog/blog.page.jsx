function BlogPage() {
  return (
    <main className="bg-gray-900 min-h-screen py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-yellow-400 mb-16 pt-16">
          Stay Informed and Motivated with Our Blog
        </h1>
        <p className="text-lg text-gray-300 text-center mb-12">
          Discover valuable insights on fitness tips, nutrition advice, and the latest news and updates to keep you motivated on your fitness journey.
        </p>

        <section className="mb-16">
          <h2 className="text-4xl font-semibold text-white mb-8">
            Fitness Tips
          </h2>

          <article className="mb-8 bg-green-500 rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold text-white mb-2">
              5 Essential Workouts for Building Strength
            </h3>
            <p className="text-lg text-gray-100">
              Whether you're a beginner or a seasoned athlete, these five exercises should be staples in your workout routine.
            </p>
            <div className="mt-4">
              <p className="text-base text-gray-200">
                **1. Squats:** A fundamental movement for lower body strength.<br />
                **2. Deadlifts:** Essential for building posterior chain strength.<br />
                **3. Bench Press:** Focuses on upper body strength.<br />
                **4. Pull-Ups:** Excellent for upper back and bicep development.<br />
                **5. Overhead Press:** Key for shoulder strength and stability.
              </p>
            </div>
          </article>

          <article className="mb-8 bg-blue-500 rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold text-white mb-2">
              The Ultimate Guide to HIIT for Fat Loss
            </h3>
            <p className="text-lg text-gray-100">
              High-Intensity Interval Training (HIIT) is a time-efficient way to burn fat and boost your metabolism.
            </p>
            <div className="mt-4">
              <p className="text-base text-gray-200">
                **1. Warm-Up:** Start with 5-10 minutes of light cardio.<br />
                **2. Intervals:** Alternate between intense exercise and rest.<br />
                **3. Cool Down:** Finish with a cool-down and stretching.
              </p>
            </div>
          </article>

          <article className="mb-8 bg-red-500 rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold text-white mb-2">
              How to Stay Consistent with Your Fitness Goals
            </h3>
            <p className="text-lg text-gray-100">
              Consistency is key to achieving your fitness goals. Explore practical tips for staying motivated.
            </p>
            <div className="mt-4">
              <p className="text-base text-gray-200">
                **1. Set Clear Goals:** Define what you want to achieve.<br />
                **2. Create a Routine:** Establish a workout schedule.<br />
                **3. Track Progress:** Use a journal or app to monitor your achievements.<br />
                **4. Stay Flexible:** Be prepared to adapt your routine.
              </p>
            </div>
          </article>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-semibold text-white mb-8">
            Nutrition Advice
          </h2>

          <article className="mb-8 bg-purple-500 rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold text-white mb-2">
              The Best Post-Workout Meals for Muscle Recovery
            </h3>
            <p className="text-lg text-gray-100">
              Refueling your body after a workout is crucial for muscle recovery and growth.
            </p>
            <div className="mt-4">
              <p className="text-base text-gray-200">
                **1. Protein Sources:** Include lean meats, eggs, or plant-based proteins.<br />
                **2. Carbohydrates:** Opt for whole grains or fruits.<br />
                **3. Timing:** Eat within 30-60 minutes post-workout.<br />
                **4. Hydration:** Rehydrate with water or a recovery drink.
              </p>
            </div>
          </article>

          <article className="mb-8 bg-orange-500 rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold text-white mb-2">
              A Beginner's Guide to Macronutrients
            </h3>
            <p className="text-lg text-gray-100">
              Understanding macronutrients is essential for optimizing your diet.
            </p>
            <div className="mt-4">
              <p className="text-base text-gray-200">
                **1. Proteins:** Essential for muscle repair.<br />
                **2. Fats:** Important for hormone production.<br />
                **3. Carbohydrates:** The body's primary energy source.<br />
                **4. Balance:** Find the right ratio for your goals.
              </p>
            </div>
          </article>

          <article className="mb-8 bg-teal-500 rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold text-white mb-2">
              The Truth About Supplements: What You Need to Know
            </h3>
            <p className="text-lg text-gray-100">
              With so many supplements on the market, it can be hard to know what's worth taking.
            </p>
            <div className="mt-4">
              <p className="text-base text-gray-200">
                **1. Protein Powders:** Useful for meeting daily protein requirements.<br />
                **2. Creatine:** Supports strength gains.<br />
                **3. Omega-3s:** Promotes heart health.<br />
                **4. Multivitamins:** Fill nutritional gaps.
              </p>
            </div>
          </article>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-semibold text-white mb-8">
            Latest News & Updates
          </h2>

          <article className="mb-8 bg-indigo-500 rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold text-white mb-2">
              New Fitness Classes Launching This Fall
            </h3>
            <p className="text-lg text-gray-100">
              We're excited to announce the launch of new fitness classes this fall.
            </p>
          </article>

          <article className="mb-8 bg-pink-500 rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold text-white mb-2">
              How to Stay Safe During Your Workouts
            </h3>
            <p className="text-lg text-gray-100">
              Safety is our top priority. Learn about the latest safety protocols.
            </p>
          </article>

          <article className="mb-8 bg-yellow-500 rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold text-white mb-2">
              Member Spotlight: Success Stories from Our Community
            </h3>
            <p className="text-lg text-gray-100">
              Get inspired by the success stories of fellow members who have achieved their fitness goals.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}

export default BlogPage;
