function BlogPage() {
  return (
      <main className="bg-gray-900 min-h-screen py-8 px-4 md:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-bold text-center text-yellow-400 mb-8 md:mb-12 pt-12">
                  Fitness Insights & Updates
              </h1>
              <p className="text-base md:text-lg text-gray-300 text-center mb-8 md:mb-12">
                  Expert advice on fitness, nutrition, and the latest updates to fuel your journey.
              </p>

              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {[
                      {
                          title: "5 Essential Strength Workouts",
                          color: "bg-green-600",
                          content: "Master squats, deadlifts, bench press, pull-ups, and overhead press for total body strength."
                      },
                      {
                          title: "Ultimate HIIT Guide for Fat Loss",
                          color: "bg-blue-600",
                          content: "Boost metabolism with warm-ups, intense intervals, and cool-downs."
                      },
                      {
                          title: "Consistency Tips",
                          color: "bg-red-600",
                          content: "Set goals, build routines, track progress, and stay adaptable."
                      }
                  ].map((article, index) => (
                      <article 
                          key={index} 
                          className={`${article.color} rounded-lg p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1`}
                      >
                          <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{article.title}</h3>
                          <p className="text-gray-100 text-sm md:text-base">{article.content}</p>
                      </article>
                  ))}
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {[
                      {
                          title: "Best Post-Workout Meals",
                          color: "bg-purple-600",
                          content: "Refuel with protein, carbs, and hydration within 30-60 minutes."
                      },
                      {
                          title: "Macronutrients Guide",
                          color: "bg-orange-600",
                          content: "Balance proteins, fats, and carbs for your goals."
                      },
                      {
                          title: "Truth About Supplements",
                          color: "bg-teal-600",
                          content: "Protein powders, creatine, and omega-3s demystified."
                      }
                  ].map((article, index) => (
                      <article 
                          key={index} 
                          className={`${article.color} rounded-lg p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1`}
                      >
                          <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{article.title}</h3>
                          <p className="text-gray-100 text-sm md:text-base">{article.content}</p>
                      </article>
                  ))}
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                      {
                          title: "New Fall Fitness Classes",
                          color: "bg-indigo-600",
                          content: "Exciting new classes launching this season."
                      },
                      {
                          title: "Workout Safety Tips",
                          color: "bg-pink-600",
                          content: "Stay safe with our latest protocols."
                      },
                      {
                          title: "Member Success Stories",
                          color: "bg-yellow-600",
                          content: "Inspiration from our community’s achievements."
                      }
                  ].map((article, index) => (
                      <article 
                          key={index} 
                          className={`${article.color} rounded-lg p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1`}
                      >
                          <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{article.title}</h3>
                          <p className="text-gray-100 text-sm md:text-base">{article.content}</p>
                      </article>
                  ))}
              </section>
          </div>
      </main>
  );
}

export default BlogPage;