import { useState } from "react";
import { ChevronDown, ChevronUp, Calendar, User, ArrowRight, Zap, Target, BookOpen, Star, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function BlogPage() {
  const [expandedArticle, setExpandedArticle] = useState(null);

  const blogArticles = [
    {
      title: "5 Essential Strength Workouts",
      category: "TRAINING",
      color: "from-emerald-500 to-green-600",
      date: "Oct 12, 2023",
      description: "Unlock your full potential with these foundational moves—perfect for any fitness level.",
      fullDescription: "Ready to build strength that lasts? Our guide to 5 Essential Strength Workouts takes you through the must-know lifts: squats, deadlifts, bench presses, pull-ups, and overhead presses.",
      sections: [
        {
          title: "The Big Three",
          icon: Target,
          content: "Squats, Deadlifts, and Bench Press form the core of any serious strength program. These compound movements recruit multiple muscle groups simultaneously."
        },
        {
          title: "Progressive Overload",
          icon: Zap,
          content: "To grow, you must consistently increase the stress on your muscles. We recommend tracking every set and adding weight or reps every week."
        },
        {
          title: "Recovery is Key",
          icon: Star,
          content: "Muscle isn't built in the gym; it's built while you sleep. Aim for 7-9 hours of quality rest and ensure your protein intake is optimized."
        }
      ]
    },
    {
      title: "Ultimate HIIT Guide for Fat Loss",
      category: "CARDIO",
      color: "from-blue-500 to-indigo-600",
      date: "Oct 15, 2023",
      description: "Supercharge your metabolism with our expert HIIT blueprint—torch fat fast.",
      fullDescription: "Say hello to fat loss with our Ultimate HIIT Guide. High-Intensity Interval Training is your secret weapon to maximize calorie burn in minimum time.",
      sections: [
        {
          title: "Interval Structure",
          icon: Zap,
          content: "We recommend a 2:1 work-to-rest ratio (e.g., 40s explosive effort followed by 20s recovery) to keep the heart rate elevated."
        },
        {
          title: "Exercise Selection",
          icon: Target,
          content: "Focus on full-body movements like burpees, mountain climbers, and thrusters to engage the most muscle mass possible."
        }
      ]
    },
    {
      title: "Consistency Tips",
      category: "MINDSET",
      color: "from-red-500 to-orange-600",
      date: "Oct 18, 2023",
      description: "Stay on track with proven strategies for lasting fitness success.",
      fullDescription: "Consistency is king, and we’ve got the tips to make it stick. Learn how to turn temporary effort into lifelong results.",
      sections: [
        {
          title: "Habit Stacking",
          icon: BookOpen,
          content: "Link your new fitness habit to an existing daily routine (like doing 20 squats after brushing your teeth) to ensure it sticks."
        },
        {
          title: "Forgive Yourself",
          icon: Star,
          content: "A missed workout isn't a failure. Get back on track immediately instead of letting one slip-up turn into a week of inactivity."
        }
      ]
    },
    {
      title: "Best Post-Workout Meals",
      category: "NUTRITION",
      color: "from-violet-500 to-purple-600",
      date: "Oct 20, 2023",
      description: "Refuel like a pro with nutrient-packed meals for optimal recovery.",
      fullDescription: "What you eat after a workout matters—our Best Post-Workout Meals guide has you covered for peak recovery.",
      sections: [
        {
          title: "Protein Sourcing",
          icon: CheckCircle,
          content: "Aim for 20-40g of high-quality protein (whey, chicken, or tofu) within 60 minutes of finishing your session."
        },
        {
          title: "Carb Replenishment",
          icon: Zap,
          content: "Fast-digesting carbs like white rice or fruit help replenish glycogen stores and halt muscle breakdown."
        }
      ]
    },
    {
      title: "Macronutrients Guide",
      category: "NUTRITION",
      color: "from-amber-500 to-orange-600",
      date: "Oct 22, 2023",
      description: "Master your nutrition with this breakdown tailored to your goals.",
      fullDescription: "Nutrition doesn’t have to be complicated—our Macronutrients Guide breaks it down for absolute clarity.",
      sections: [
        {
          title: "Proteins",
          icon: Target,
          content: "The building blocks of muscle. Aim for 0.8g to 1g per pound of body weight depending on your goals."
        },
        {
          title: "Fats & Carbs",
          icon: Star,
          content: "Fats are essential for hormone health, while carbs are your primary energy source. Adjust these based on your activity levels."
        }
      ]
    },
    {
      title: "Truth About Supplements",
      category: "NUTRITION",
      color: "from-cyan-500 to-teal-600",
      date: "Oct 25, 2023",
      description: "Cut through the hype with facts on supplements that work.",
      fullDescription: "Supplements can feel like a maze—our Truth About Supplements guide clears the fog on what actually works.",
      sections: [
        {
          title: "The Essentials",
          icon: CheckCircle,
          content: "Creatine monohydrate and Whey protein are the most researched and effective supplements for performance and recovery."
        },
        {
          title: "Marketing vs Reality",
          icon: BookOpen,
          content: "Most 'fat burners' are just expensive caffeine. Focus on your caloric deficit first before spending on specialty pills."
        }
      ]
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-16">
      <div className="max-w-7xl mx-auto pt-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold gradient-text mb-4 tracking-tight">
            Fitness Insights
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Expert advice, training tips, and nutrition guides to help you master your fitness journey.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogArticles.map((article, index) => (
            <motion.article
              key={index}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card overflow-hidden hover-glow transition-all duration-500 group flex flex-col ${expandedArticle === index ? 'md:col-span-2 lg:col-span-3' : ''}`}
            >
              {/* Top Accent */}
              <div className={`h-1 w-full bg-gradient-to-r ${article.color}`} />

              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] font-bold bg-white/5 px-2 py-1 rounded text-red-400 border border-white/5 uppercase tracking-widest">{article.category}</span>
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold">
                    <Calendar size={12} />
                    {article.date}
                  </div>
                </div>

                <h3 className={`font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors ${expandedArticle === index ? 'text-3xl' : 'text-xl'}`}>{article.title}</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-1">{article.description}</p>

                <div className="mt-auto pt-6 border-t border-white/5">
                  <button
                    onClick={() => setExpandedArticle(expandedArticle === index ? null : index)}
                    className="flex items-center gap-2 text-xs font-bold text-yellow-400 hover:text-white transition-colors group/btn"
                  >
                    {expandedArticle === index ? "CLOSE ARTICLE" : "READ FULL ARTICLE"}
                    <ArrowRight size={14} className={`transition-transform duration-300 ${expandedArticle === index ? "-rotate-90" : "group-hover/btn:translate-x-1"}`} />
                  </button>
                </div>

                <AnimatePresence>
                  {expandedArticle === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-8 mt-8 border-t border-white/10">
                        <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-4xl italic">
                           "{article.fullDescription}"
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                          {article.sections.map((section, idx) => (
                            <motion.div 
                              key={idx}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="p-6 bg-white/[0.03] rounded-2xl border border-white/5"
                            >
                              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">
                                <section.icon className="text-red-500" size={20} />
                              </div>
                              <h4 className="text-white font-bold mb-2">{section.title}</h4>
                              <p className="text-gray-400 text-xs leading-relaxed">{section.content}</p>
                            </motion.div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between py-6 border-t border-white/5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-xs font-bold text-white">IF</div>
                            <div>
                              <p className="text-xs font-bold text-white uppercase tracking-wider">Imperial Fit Team</p>
                              <p className="text-[10px] text-gray-500 uppercase font-bold">Fitness Experts</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => setExpandedArticle(null)}
                            className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest transition-colors"
                          >
                            Back to Feed
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogPage;