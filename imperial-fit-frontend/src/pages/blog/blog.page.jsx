import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function BlogPage() {
  const [expandedArticle, setExpandedArticle] = useState(null);

  const toggleExpand = (index) => {
    setExpandedArticle(expandedArticle === index ? null : index);
  };

  const blogArticles = [
    {
      title: "5 Essential Strength Workouts",
      color: "bg-green-600",
      content:
        "Unlock your full potential with these foundational moves. Master squats, deadlifts, bench presses, pull-ups, and overhead presses to build total body strength and resilience—perfect for any fitness level looking to level up.",
    },
    {
      title: "Ultimate HIIT Guide for Fat Loss",
      color: "bg-blue-600",
      content:
        "Supercharge your metabolism with our expert HIIT blueprint. Kick off with dynamic warm-ups, power through intense intervals, and wind down with cool-downs—designed to torch fat and boost energy in minimal time.",
    },
    {
      title: "Consistency Tips",
      color: "bg-red-600",
      content:
        "Stay on track with proven strategies: set clear goals, craft a solid routine, monitor your progress, and adapt as needed. Consistency is the secret sauce to lasting fitness success—start building it today.",
    },
    {
      title: "Best Post-Workout Meals",
      color: "bg-purple-600",
      content:
        "Refuel like a pro with nutrient-packed meals. Combine protein, carbs, and hydration within 30-60 minutes post-workout to optimize recovery and muscle growth—your body will thank you.",
    },
    {
      title: "Macronutrients Guide",
      color: "bg-orange-600",
      content:
        "Master your nutrition with this breakdown. Balance proteins for muscle repair, fats for energy, and carbs for fuel—tailored to your fitness goals, from fat loss to strength gains.",
    },
    {
      title: "Truth About Supplements",
      color: "bg-teal-600",
      content:
        "Cut through the hype with facts on protein powders, creatine, and omega-3s. Learn what works, what’s worth it, and how to integrate them into your routine for real results.",
    },
    {
      title: "New Fall Fitness Classes",
      color: "bg-indigo-600",
      content:
        "Get pumped for our latest lineup! Exciting new classes drop this fall—think high-energy circuits and mindful flows—to keep your workouts fresh and your goals in sight.",
    },
    {
      title: "Workout Safety Tips",
      color: "bg-pink-600",
      content:
        "Train smart with our updated safety protocols. From proper form to equipment checks, stay injury-free and confident as you push your limits—safety first, gains second.",
    },
    {
      title: "Member Success Stories",
      color: "bg-yellow-600",
      content:
        "Be inspired by our community’s triumphs. Real members share how they smashed goals, overcame obstacles, and transformed their lives—proof that hard work pays off.",
    },
  ];

  return (
    <main className="relative min-h-screen bg-gray-900 py-16 px-4 sm:px-8 lg:px-16 overflow-hidden">
      {/* Blurred Background */}
      <img
        src="/assets/Hero/bg4.jpg"
        alt="Blog Background"
        className="absolute inset-0 w-full h-full object-cover opacity-15 blur-xl scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center text-yellow-400 mb-8 sm:mb-12 pt-12 tracking-tight animate-softFadeIn">
          Fitness Insights & Updates
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-200 text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
          Discover expert tips, cutting-edge advice, and the latest fitness trends to elevate your journey.
        </p>

        {/* Blog Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {blogArticles.map((article, index) => (
            <article
              key={index}
              className={`${article.color} rounded-lg p-4 sm:p-5 shadow-md hover:shadow-xl transition-all duration-400 ease-in-out transform hover:-translate-y-1 bg-opacity-90 backdrop-blur-sm border border-gray-200/20 group relative overflow-hidden`}
            >
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

              <h3 className="relative z-10 text-lg sm:text-xl font-semibold text-white mb-2 tracking-tight line-clamp-2">
                {article.title}
              </h3>
              <p className="relative z-10 text-gray-100 text-xs sm:text-sm mb-3 line-clamp-2">
                {article.content}
              </p>

              {/* Expandable Read More */}
              <button
                onClick={() => toggleExpand(index)}
                className="relative z-10 flex items-center text-yellow-300 hover:text-yellow-400 transition-colors duration-300 font-medium text-xs sm:text-sm"
              >
                {expandedArticle === index ? "Read Less" : "Read More"}
                {expandedArticle === index ? (
                  <ChevronUp className="ml-1 w-4 h-4" />
                ) : (
                  <ChevronDown className="ml-1 w-4 h-4" />
                )}
              </button>
              {expandedArticle === index && (
                <div className="relative z-10 mt-3 text-gray-100 animate-softFadeIn text-xs sm:text-sm">
                  {article.content}
                </div>
              )}

              {/* Hover Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

export default BlogPage;