import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function BlogPage() {
  const [expandedArticle, setExpandedArticle] = useState(null);

  const toggleExpand = (index) => {
    setExpandedArticle(expandedArticle === index ? null : index);
  };

  // Enhanced blog articles with full descriptions
  const blogArticles = [
    {
      title: "5 Essential Strength Workouts",
      color: "from-emerald-500 to-green-700",
      description:
        "Unlock your full potential with these foundational moves—perfect for any fitness level.",
      fullDescription:
        "Ready to build strength that lasts? Our guide to 5 Essential Strength Workouts takes you through the must-know lifts: squats, deadlifts, bench presses, pull-ups, and overhead presses. Whether you’re a beginner stepping into the gym or a seasoned lifter refining your form, these exercises target every major muscle group for total-body resilience. Pair them with progressive overload, and watch your power soar—your fitness journey just got a serious upgrade.",
    },
    {
      title: "Ultimate HIIT Guide for Fat Loss",
      color: "from-sky-500 to-blue-700",
      description:
        "Supercharge your metabolism with our expert HIIT blueprint—torch fat fast.",
      fullDescription:
        "Say hello to fat loss with our Ultimate HIIT Guide. High-Intensity Interval Training is your secret weapon—think explosive burpees, sprints, and mountain climbers paired with short rests to keep your heart pumping. This blueprint walks you through dynamic warm-ups, killer intervals, and cool-downs that maximize calorie burn and boost energy in under 30 minutes. Crafted by fitness pros, it’s the efficient way to shred fat and feel unstoppable.",
    },
    {
      title: "Consistency Tips",
      color: "from-rose-500 to-red-700",
      description:
        "Stay on track with proven strategies for lasting fitness success.",
      fullDescription:
        "Consistency is king, and we’ve got the tips to make it stick. Learn how to set achievable goals that fire you up, build routines that fit your life, and track progress without burnout. From habit stacking to staying adaptable when life gets messy, this guide is your roadmap to turning effort into results. It’s not about perfection—it’s about showing up, day after day, and owning your fitness story.",
    },
    {
      title: "Best Post-Workout Meals",
      color: "from-violet-500 to-purple-700",
      description:
        "Refuel like a pro with nutrient-packed meals for optimal recovery.",
      fullDescription:
        "What you eat after a workout matters—our Best Post-Workout Meals guide has you covered. Within 30-60 minutes, fuel up with protein-rich options like grilled chicken or Greek yogurt, paired with carbs such as sweet potatoes or quinoa, and a hydration boost. These combos repair muscle, replenish energy, and set you up for your next session. Simple, delicious, and science-backed—your recovery just got tastier.",
    },
    {
      title: "Macronutrients Guide",
      color: "from-amber-500 to-orange-700",
      description:
        "Master your nutrition with this breakdown tailored to your goals.",
      fullDescription:
        "Nutrition doesn’t have to be complicated—our Macronutrients Guide breaks it down. Proteins rebuild muscle, fats fuel long-term energy, and carbs power your workouts. Whether you’re chasing fat loss, muscle gains, or balance, we’ll show you how to tweak your plate—think lean meats, avocados, and whole grains. It’s your cheat sheet to eating smart and hitting your fitness targets with every bite.",
    },
    {
      title: "Truth About Supplements",
      color: "from-cyan-500 to-teal-700",
      description:
        "Cut through the hype with facts on supplements that work.",
      fullDescription:
        "Supplements can feel like a maze—our Truth About Supplements guide clears the fog. We dive into the big players: protein powders for post-workout boosts, creatine for strength gains, and omega-3s for recovery. Learn what’s legit, what’s hype, and how to weave them into your routine without breaking the bank. Backed by science, this is your no-nonsense take on powering up your fitness game.",
    },
    {
      title: "New Fall Fitness Classes",
      color: "from-indigo-500 to-indigo-800",
      description:
        "Get pumped for our latest lineup of exciting fall classes.",
      fullDescription:
        "Fall into fitness with our New Fall Fitness Classes! This season’s lineup brings high-energy circuits to torch calories and mindful flows to center your mind—perfect for keeping your routine fresh. From spin sessions that push your limits to yoga that restores your calm, these classes are designed to spark motivation and keep your goals on track. Join the fun and feel the autumn vibe in every sweat-soaked minute.",
    },
    {
      title: "Workout Safety Tips",
      color: "from-fuchsia-500 to-pink-700",
      description:
        "Train smart with our updated safety protocols—gains without risks.",
      fullDescription:
        "Safety first, gains second—our Workout Safety Tips ensure you thrive. Master proper form for lifts like deadlifts, check equipment before you start, and listen to your body to avoid overtraining. From warm-ups to cool-downs, we’ve got pro advice to keep injuries at bay and confidence high. Whether you’re in the gym or at home, these protocols are your shield for a stronger, safer fitness journey.",
    },
    {
      title: "Member Success Stories",
      color: "from-yellow-500 to-amber-700",
      description:
        "Be inspired by our community’s triumphs—real results, real people.",
      fullDescription:
        "Our Member Success Stories will light your fire. Meet real people who’ve crushed it—losing 50 pounds, running their first 5K, or benching double their body weight. These aren’t just wins; they’re tales of grit, setbacks, and breakthroughs that prove hard work pays off. Packed with tips from their journeys, this is your dose of inspiration to chase your own goals and join the ranks of our fitness champs.",
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
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4 tracking-tight animate-softFadeIn">
            Fitness Insights & Updates
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Dive into expert tips, cutting-edge advice, and the latest fitness trends to fuel your journey.
          </p>
        </div>

        {/* Blog Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {blogArticles.map((article, index) => (
            <article
              key={index}
              className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-400 ease-in-out transform hover:-translate-y-1 border border-gray-700/50 group"
            >
              {/* Color Bar */}
              <div className={`h-1 w-full bg-gradient-to-r ${article.color}`}></div>

              <div className="p-4 sm:p-5">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 tracking-tight line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm mb-3 line-clamp-2">
                  {article.description}
                </p>

                {/* Expandable Read More */}
                <button
                  onClick={() => toggleExpand(index)}
                  className="flex items-center text-yellow-400 hover:text-orange-400 transition-colors duration-300 font-medium text-xs sm:text-sm"
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
                  <div className="mt-3 text-gray-300 animate-softFadeIn text-xs sm:text-sm">
                    {article.fullDescription}
                  </div>
                )}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

export default BlogPage;