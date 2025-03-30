import { useState } from "react";
import { ChevronDown, ChevronUp, Clock, Eye, Calendar } from "lucide-react";

function BlogPage() {
  const [expandedArticle, setExpandedArticle] = useState(null);

  const toggleExpand = (index) => {
    setExpandedArticle(expandedArticle === index ? null : index);
  };

  // Enhanced color palette for blog articles
  const blogArticles = [
    {
      title: "5 Essential Strength Workouts",
      color: "from-emerald-500 to-green-700",
      readTime: "5 min read",
      views: "2.5k",
      date: "Mar 22, 2025",
      content:
        "Unlock your full potential with these foundational moves. Master squats, deadlifts, bench presses, pull-ups, and overhead presses to build total body strength and resilience—perfect for any fitness level looking to level up.",
    },
    {
      title: "Ultimate HIIT Guide for Fat Loss",
      color: "from-sky-500 to-blue-700",
      readTime: "8 min read",
      views: "3.8k",
      date: "Mar 18, 2025", 
      content:
        "Supercharge your metabolism with our expert HIIT blueprint. Kick off with dynamic warm-ups, power through intense intervals, and wind down with cool-downs—designed to torch fat and boost energy in minimal time.",
    },
    {
      title: "Consistency Tips",
      color: "from-rose-500 to-red-700",
      readTime: "4 min read",
      views: "4.2k",
      date: "Mar 15, 2025",
      content:
        "Stay on track with proven strategies: set clear goals, craft a solid routine, monitor your progress, and adapt as needed. Consistency is the secret sauce to lasting fitness success—start building it today.",
    },
    {
      title: "Best Post-Workout Meals",
      color: "from-violet-500 to-purple-700",
      readTime: "6 min read",
      views: "3.1k",
      date: "Mar 10, 2025",
      content:
        "Refuel like a pro with nutrient-packed meals. Combine protein, carbs, and hydration within 30-60 minutes post-workout to optimize recovery and muscle growth—your body will thank you.",
    },
    {
      title: "Macronutrients Guide",
      color: "from-amber-500 to-orange-700",
      readTime: "7 min read",
      views: "2.9k",
      date: "Mar 5, 2025",
      content:
        "Master your nutrition with this breakdown. Balance proteins for muscle repair, fats for energy, and carbs for fuel—tailored to your fitness goals, from fat loss to strength gains.",
    },
    {
      title: "Truth About Supplements",
      color: "from-cyan-500 to-teal-700",
      readTime: "9 min read",
      views: "5.3k",
      date: "Feb 28, 2025",
      content:
        "Cut through the hype with facts on protein powders, creatine, and omega-3s. Learn what works, what's worth it, and how to integrate them into your routine for real results.",
    },
    {
      title: "New Fall Fitness Classes",
      color: "from-indigo-500 to-indigo-800",
      readTime: "3 min read",
      views: "1.8k",
      date: "Feb 25, 2025",
      content:
        "Get pumped for our latest lineup! Exciting new classes drop this fall—think high-energy circuits and mindful flows—to keep your workouts fresh and your goals in sight.",
    },
    {
      title: "Workout Safety Tips",
      color: "from-fuchsia-500 to-pink-700",
      readTime: "5 min read",
      views: "2.4k",
      date: "Feb 20, 2025",
      content:
        "Train smart with our updated safety protocols. From proper form to equipment checks, stay injury-free and confident as you push your limits—safety first, gains second.",
    },
    {
      title: "Member Success Stories",
      color: "from-yellow-500 to-amber-700",
      readTime: "6 min read",
      views: "4.7k",
      date: "Feb 15, 2025",
      content:
        "Be inspired by our community's triumphs. Real members share how they smashed goals, overcame obstacles, and transformed their lives—proof that hard work pays off.",
    },
  ];

  return (
    <main className="relative min-h-screen bg-gray-900 py-16 px-4 sm:px-8 lg:px-16 overflow-hidden">
      {/* Blurred Background */}
      <img
        src="/assets/Hero/bg4.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4 tracking-tight">
            Fitness Insights & Updates
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-6"></div>
          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto">
            Discover expert tips, cutting-edge advice, and the latest fitness trends to elevate your journey.
          </p>
        </div>

        {/* Blog Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {blogArticles.map((article, index) => (
            <article
              key={index}
              className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-700 group"
            >
              {/* Color Bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${article.color}`}></div>
              
              <div className="p-5">
                {/* Title and Stats */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-2">
                  {article.title}
                </h3>
                
                {/* Stats Row */}
                <div className="flex items-center text-gray-400 text-xs mb-3 space-x-3">
                  <div className="flex items-center">
                    <Clock size={12} className="mr-1" />
                    <span>{article.readTime}</span>
                  </div>
                  <div className="flex items-center">
                    <Eye size={12} className="mr-1" />
                    <span>{article.views}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={12} className="mr-1" />
                    <span>{article.date}</span>
                  </div>
                </div>
                
                {/* Preview Content */}
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                  {article.content}
                </p>

                {/* Expandable Read More */}
                <button
                  onClick={() => toggleExpand(index)}
                  className="flex items-center text-yellow-400 hover:text-orange-400 transition-colors duration-300 font-medium text-sm"
                >
                  {expandedArticle === index ? "Read Less" : "Read More"}
                  {expandedArticle === index ? (
                    <ChevronUp className="ml-1 w-4 h-4" />
                  ) : (
                    <ChevronDown className="ml-1 w-4 h-4" />
                  )}
                </button>
                
                {/* Expanded Content */}
                {expandedArticle === index && (
                  <div className="mt-3 text-gray-300 animate-softFadeIn text-sm">
                    {article.content}
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <a href="#" className="inline-flex items-center text-yellow-400 hover:text-orange-400 transition-colors duration-300 font-medium">
                        View Full Article 
                        <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </section>
        
        {/* Newsletter Signup - Enhanced with gradient */}
        <div className="mt-16 bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-80 backdrop-blur-sm rounded-lg p-6 sm:p-8 border border-gray-700 max-w-3xl mx-auto shadow-lg">
          <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
          <p className="text-gray-300 mb-4">Get our latest fitness tips and exclusive content delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-md">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default BlogPage;