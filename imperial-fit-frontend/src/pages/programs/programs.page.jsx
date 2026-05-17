import { useState } from "react";
import { ChevronDown, ChevronUp, Clock, BarChart, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FitnessCalculator from "./Components/FitnessCalculator";
import WorkoutQuiz from "./Components/WorkoutQuiz";

function ProgramsPage() {
  const [filter, setFilter] = useState("All");
  const [expandedProgram, setExpandedProgram] = useState(null);

  const categoryColors = {
    Strength: "from-purple-500 to-indigo-600",
    Cardio: "from-blue-500 to-cyan-600",
    Flexibility: "from-emerald-500 to-teal-600",
    Personalized: "from-rose-500 to-orange-600",
    default: "from-gray-500 to-slate-600",
  };

  const programs = [
    {
      _id: "1",
      title: "Weight Training",
      category: "Strength",
      description: "Transform your physique with our expertly designed weight training program.",
      fullDescription: "Dive into a comprehensive strength-building experience with our Weight Training program. This 8-week journey is crafted for all levels, from beginners to advanced lifters. You’ll master foundational lifts like squats, deadlifts, and bench presses, using progressive resistance to sculpt lean muscle and boost power.",
      duration: "8 weeks",
      difficulty: "Beginner to Advanced",
      trainer: "John Doe",
    },
    {
      _id: "2",
      title: "Cardio Training",
      category: "Cardio",
      description: "Ignite your stamina with dynamic cardio workouts crafted to elevate your heart rate.",
      fullDescription: "Get ready to push your limits with our Cardio Training program. Over 6 weeks, you’ll engage in heart-pumping sessions—think treadmill sprints, cycling circuits, and jump rope drills—designed to torch calories and enhance endurance.",
      duration: "6 weeks",
      difficulty: "Intermediate",
      trainer: "Jane Smith",
    },
    {
      _id: "3",
      title: "Yoga & Flexibility",
      category: "Flexibility",
      description: "Find your zen and enhance mobility with our Yoga & Flexibility program.",
      fullDescription: "Unwind and stretch your way to better health with our 4-week Yoga & Flexibility program. Suitable for all levels, this calming yet challenging series, led by Emily Yoga, guides you through poses like downward dog, warrior flows, and deep stretches.",
      duration: "4 weeks",
      difficulty: "All Levels",
      trainer: "Emily Yoga",
    },
    {
      _id: "4",
      title: "HIIT",
      category: "Cardio",
      description: "Unleash your inner athlete with High-Intensity Interval Training (HIIT).",
      fullDescription: "Step up to the ultimate fat-burning challenge with our 5-week HIIT program. Perfect for advanced fitness buffs, this fast-paced regimen, led by Mike Intensity, alternates explosive moves—burpees, sprints, and kettlebell swings—with short recovery periods.",
      duration: "5 weeks",
      difficulty: "Advanced",
      trainer: "Mike Intensity",
    },
    {
      _id: "5",
      title: "Personal Training",
      category: "Personalized",
      description: "Experience fitness tailored just for you with our Personal Training program.",
      fullDescription: "Your fitness journey gets personal with our custom Personal Training program. Alex Fit, your dedicated coach, designs a plan that fits your unique goals—whether it’s strength, endurance, or recovery.",
      duration: "Custom",
      difficulty: "All Levels",
      trainer: "Alex Fit",
    },
  ];

  const categories = ["All", "Strength", "Cardio", "Flexibility", "Personalized"];
  const filteredPrograms = filter === "All"
    ? programs
    : programs.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-16">
      <div className="max-w-7xl mx-auto pt-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold gradient-text mb-4 tracking-tight">
            Fitness Hub
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tools and programs designed to help you master your body and achieve your elite potential.
          </p>
        </motion.div>

        {/* Calculator */}
        <FitnessCalculator />

        {/* Personalized Quiz */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">Find Your Perfect Plan</h2>
          <p className="text-gray-500 text-sm">Answer 3 simple questions to get a tailored training recommendation.</p>
        </div>
        <WorkoutQuiz />

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                filter === cat
                  ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/25"
                  : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPrograms.map((program, index) => (
              <motion.div
                key={program._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card-strong overflow-hidden hover-glow group"
              >
                {/* Header Gradient */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${categoryColors[program.category] || categoryColors.default}`} />

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{program.category}</span>
                    <span className="text-[10px] font-bold bg-white/5 px-2 py-1 rounded text-yellow-400 border border-white/5">{program.duration}</span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">{program.title}</h2>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">{program.description}</p>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setExpandedProgram(expandedProgram === program._id ? null : program._id)}
                      className="flex items-center gap-1.5 text-xs font-bold text-yellow-400 hover:text-white transition-colors"
                    >
                      {expandedProgram === program._id ? "HIDE DETAILS" : "VIEW DETAILS"}
                      {expandedProgram === program._id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>

                  <AnimatePresence>
                    {expandedProgram === program._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 mt-6 border-t border-white/5 space-y-4">
                          <p className="text-sm text-gray-300 leading-relaxed">{program.fullDescription}</p>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <BarChart size={14} className="text-red-400" />
                              <span className="text-[10px] text-gray-400 uppercase font-bold">{program.difficulty}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User size={14} className="text-red-400" />
                              <span className="text-[10px] text-gray-400 uppercase font-bold">{program.trainer}</span>
                            </div>
                          </div>
                          <button className="btn-gradient w-full !py-2.5 !text-xs !rounded-xl mt-2">ENROLL NOW</button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default ProgramsPage;