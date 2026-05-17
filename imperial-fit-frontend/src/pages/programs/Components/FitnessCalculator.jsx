import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Activity, Scale, Info, ChevronRight, RefreshCw } from "lucide-react";

function FitnessCalculator() {
  const [activeTab, setActiveTab] = useState("bmi");
  const [result, setResult] = useState(null);
  const [inputs, setInputs] = useState({
    weight: "", height: "", age: "", gender: "male", activity: "1.2", goal: "maintain"
  });

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const calculateBMI = () => {
    const w = parseFloat(inputs.weight);
    const h = parseFloat(inputs.height) / 100;
    if (!w || !h) return;
    
    const bmi = w / (h * h);
    let category = "";
    let color = "";

    if (bmi < 18.5) { category = "Underweight"; color = "text-blue-400"; }
    else if (bmi < 25) { category = "Healthy Weight"; color = "text-green-400"; }
    else if (bmi < 30) { category = "Overweight"; color = "text-yellow-400"; }
    else { category = "Obese"; color = "text-red-400"; }

    setResult({ type: "bmi", value: bmi.toFixed(1), category, color });
  };

  const calculateMacros = () => {
    const w = parseFloat(inputs.weight);
    const h = parseFloat(inputs.height);
    const a = parseInt(inputs.age);
    if (!w || !h || !a) return;

    // BMR (Mifflin-St Jeor)
    let bmr = 10 * w + 6.25 * h - 5 * a;
    bmr = inputs.gender === "male" ? bmr + 5 : bmr - 161;

    // TDEE
    let tdee = bmr * parseFloat(inputs.activity);

    // Goal Adjust
    if (inputs.goal === "lose") tdee -= 500;
    if (inputs.goal === "gain") tdee += 500;

    // Macros
    const protein = w * 2.2; // 2.2g per kg (approx 1g per lb)
    const fat = (tdee * 0.25) / 9; // 25% cals from fat
    const carbs = (tdee - (protein * 4) - (fat * 9)) / 4;

    setResult({
      type: "macros",
      calories: Math.round(tdee),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fat: Math.round(fat)
    });
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    if (activeTab === "bmi") calculateBMI();
    else calculateMacros();
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card-strong overflow-hidden border-yellow-400/20"
      >
        <div className="flex flex-col md:flex-row">
          {/* Form Side */}
          <div className="w-full md:w-1/2 p-8 border-b md:border-b-0 md:border-r border-white/5">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center">
                <Calculator className="text-yellow-400" size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">Fitness Calculator</h2>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-8 p-1 bg-white/5 rounded-xl border border-white/5">
              <button
                onClick={() => { setActiveTab("bmi"); setResult(null); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === "bmi" ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/20" : "text-gray-400 hover:text-white"}`}
              >
                BMI
              </button>
              <button
                onClick={() => { setActiveTab("macros"); setResult(null); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === "macros" ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/20" : "text-gray-400 hover:text-white"}`}
              >
                MACROS
              </button>
            </div>

            <form onSubmit={handleCalculate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Weight (kg)</label>
                  <input type="number" name="weight" value={inputs.weight} onChange={handleInputChange} placeholder="70" className="glass-input w-full rounded-xl px-4 py-3 text-sm" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Height (cm)</label>
                  <input type="number" name="height" value={inputs.height} onChange={handleInputChange} placeholder="175" className="glass-input w-full rounded-xl px-4 py-3 text-sm" required />
                </div>
              </div>

              {activeTab === "macros" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-4 overflow-hidden">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Age</label>
                      <input type="number" name="age" value={inputs.age} onChange={handleInputChange} placeholder="25" className="glass-input w-full rounded-xl px-4 py-3 text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Gender</label>
                      <select name="gender" value={inputs.gender} onChange={handleInputChange} className="glass-input w-full rounded-xl px-4 py-3 text-sm appearance-none">
                        <option value="male" className="bg-neutral-900">Male</option>
                        <option value="female" className="bg-neutral-900">Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Activity Level</label>
                    <select name="activity" value={inputs.activity} onChange={handleInputChange} className="glass-input w-full rounded-xl px-4 py-3 text-sm appearance-none">
                      <option value="1.2" className="bg-neutral-900">Sedentary (Office job)</option>
                      <option value="1.375" className="bg-neutral-900">Lightly Active (1-3 days/week)</option>
                      <option value="1.55" className="bg-neutral-900">Moderately Active (3-5 days/week)</option>
                      <option value="1.725" className="bg-neutral-900">Very Active (6-7 days/week)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Your Goal</label>
                    <select name="goal" value={inputs.goal} onChange={handleInputChange} className="glass-input w-full rounded-xl px-4 py-3 text-sm appearance-none">
                      <option value="lose" className="bg-neutral-900">Fat Loss (Cut)</option>
                      <option value="maintain" className="bg-neutral-900">Maintenance</option>
                      <option value="gain" className="bg-neutral-900">Muscle Gain (Bulk)</option>
                    </select>
                  </div>
                </motion.div>
              )}

              <button type="submit" className="btn-gradient w-full !py-4 !rounded-xl text-sm flex items-center justify-center gap-2 mt-4 group">
                Calculate Results
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Result Side */}
          <div className="w-full md:w-1/2 p-8 bg-white/[0.02] flex flex-col items-center justify-center min-h-[400px]">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="w-full text-center"
                >
                  {result.type === "bmi" ? (
                    <>
                      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Your BMI Score</div>
                      <div className={`text-7xl font-black mb-4 ${result.color}`}>{result.value}</div>
                      <div className={`text-xl font-bold mb-8 ${result.color}`}>{result.category}</div>
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-xs text-gray-400 leading-relaxed">
                        BMI is a useful measurement for most people over 18. However, it is only an estimate and doesn't account for muscle mass or body composition.
                      </div>
                    </>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">Daily Calorie Needs</div>
                        <div className="text-5xl font-black text-yellow-400">{result.calories} <span className="text-xl">kcal</span></div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                          <div className="text-[10px] font-bold text-red-400 mb-1">PROTEIN</div>
                          <div className="text-xl font-bold text-white">{result.protein}g</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                          <div className="text-[10px] font-bold text-blue-400 mb-1">CARBS</div>
                          <div className="text-xl font-bold text-white">{result.carbs}g</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                          <div className="text-[10px] font-bold text-yellow-400 mb-1">FAT</div>
                          <div className="text-xl font-bold text-white">{result.fat}g</div>
                        </div>
                      </div>

                      <div className="pt-4">
                        <button onClick={() => setResult(null)} className="text-xs font-bold text-gray-600 hover:text-white flex items-center gap-2 mx-auto transition-colors">
                          <RefreshCw size={12} /> Recalculate
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-white/5 border border-white/5 flex items-center justify-center mx-auto mb-6">
                    <Activity size={32} className="text-gray-700 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-300 mb-2">Awaiting Data</h3>
                  <p className="text-gray-500 text-sm max-w-[240px] mx-auto">
                    Fill in your details to see your personalized health metrics.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
      
      {/* Disclaimer */}
      <div className="mt-6 flex items-center justify-center gap-2 text-gray-600 text-[10px] font-medium">
        <Info size={12} /> These results are estimates for educational purposes. Consult a professional for a precise plan.
      </div>
    </div>
  );
}

export default FitnessCalculator;
