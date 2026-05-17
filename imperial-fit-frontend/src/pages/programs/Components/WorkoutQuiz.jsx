import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Trophy, Dumbbell, Zap, Heart, Target } from "lucide-react";

const PLANS = {
  strength: {
    title: "Elite Strength Protocol",
    desc: "Focus on heavy compound movements to maximize muscle density and raw power.",
    schedule: "4 Days / Week",
    focus: "Hypertrophy & Strength",
    exercises: ["Squats", "Deadlifts", "Bench Press", "Overhead Press"],
    color: "from-purple-600 to-indigo-700"
  },
  fatloss: {
    title: "Metabolic Shred",
    desc: "High-intensity circuits designed to torch calories and improve cardiovascular endurance.",
    schedule: "5 Days / Week",
    focus: "Fat Loss & Conditioning",
    exercises: ["Burpees", "Mountain Climbers", "Kettlebell Swings", "Sprints"],
    color: "from-red-600 to-orange-700"
  },
  home: {
    title: "Bodyweight Warrior",
    desc: "No gym? No problem. Master your own bodyweight with these elite calisthenics moves.",
    schedule: "3 Days / Week",
    focus: "Mobility & Lean Muscle",
    exercises: ["Pushups", "Pullups", "Pike Pushups", "Plank Variations"],
    color: "from-emerald-600 to-teal-700"
  },
  hybrid: {
    title: "Athletic Performance",
    desc: "The best of both worlds. Combine strength training with explosive athletic movements.",
    schedule: "4 Days / Week",
    focus: "Explosiveness & Power",
    exercises: ["Box Jumps", "Power Cleans", "Front Squats", "Rowing"],
    color: "from-blue-600 to-cyan-700"
  }
};

function WorkoutQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    goal: "", level: "", equipment: ""
  });
  const [result, setResult] = useState(null);

  const steps = [
    {
      title: "What is your primary goal?",
      key: "goal",
      options: [
        { label: "Build Muscle", value: "muscle", icon: Dumbbell },
        { label: "Lose Weight", value: "weight", icon: Zap },
        { label: "Better Health", value: "health", icon: Heart },
        { label: "Increase Power", value: "power", icon: Target }
      ]
    },
    {
      title: "What is your experience level?",
      key: "level",
      options: [
        { label: "Beginner", value: "beginner" },
        { label: "Intermediate", value: "intermediate" },
        { label: "Advanced", value: "advanced" }
      ]
    },
    {
      title: "Where will you be training?",
      key: "equipment",
      options: [
        { label: "Commercial Gym", value: "gym" },
        { label: "Home / No Equipment", value: "home" }
      ]
    }
  ];

  const handleOptionSelect = (val) => {
    const key = steps[step].key;
    const newAnswers = { ...answers, [key]: val };
    setAnswers(newAnswers);

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      generatePlan(newAnswers);
    }
  };

  const generatePlan = (finalAnswers) => {
    let planKey = "strength";
    
    if (finalAnswers.equipment === "home") {
      planKey = "home";
    } else if (finalAnswers.goal === "weight") {
      planKey = "fatloss";
    } else if (finalAnswers.goal === "power") {
      planKey = "hybrid";
    }

    setResult(PLANS[planKey]);
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers({ goal: "", level: "", equipment: "" });
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-20">
      <div className="glass-card-strong overflow-hidden min-h-[450px] flex flex-col">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="quiz-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-10 flex-1 flex flex-col"
            >
              {/* Progress Bar */}
              <div className="w-full h-1 bg-white/5 mb-10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-red-500" 
                  initial={{ width: 0 }}
                  animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                {steps[step].title}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                {steps[step].options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleOptionSelect(opt.value)}
                    className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-white/10 transition-all text-left flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      {opt.icon && <opt.icon className="text-red-500 group-hover:scale-110 transition-transform" size={24} />}
                      <span className="font-bold text-white">{opt.label}</span>
                    </div>
                    <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-red-500 transition-colors">
                        <Check size={14} className="text-red-500 opacity-0 group-hover:opacity-100" />
                    </div>
                  </button>
                ))}
              </div>

              {step > 0 && (
                <button 
                  onClick={() => setStep(step - 1)}
                  className="mt-8 flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                >
                  <ArrowLeft size={14} /> Back
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-10 text-center flex-1 flex flex-col items-center justify-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20">
                <Trophy className="text-emerald-500" size={40} />
              </div>
              
              <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mb-2">We found your match</h2>
              <h3 className={`text-4xl font-black bg-gradient-to-r ${result.color} bg-clip-text text-transparent mb-6`}>
                {result.title}
              </h3>
              
              <p className="text-gray-400 max-w-lg mb-8 leading-relaxed">
                {result.desc}
              </p>

              <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-10">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[9px] font-bold text-gray-500 uppercase mb-1">Frequency</p>
                  <p className="text-white font-bold">{result.schedule}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[9px] font-bold text-gray-500 uppercase mb-1">Main Focus</p>
                  <p className="text-white font-bold">{result.focus}</p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {result.exercises.map(ex => (
                  <span key={ex} className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold rounded-full uppercase">
                    {ex}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <button className="btn-gradient !py-4 !px-10 !rounded-xl text-sm font-bold shadow-lg shadow-red-500/20 flex items-center gap-2">
                  Enroll Now <ArrowRight size={16} />
                </button>
                <button onClick={resetQuiz} className="px-10 py-4 rounded-xl border border-white/10 text-gray-500 hover:text-white hover:bg-white/5 transition-all text-sm font-bold">
                  Retake Quiz
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default WorkoutQuiz;
