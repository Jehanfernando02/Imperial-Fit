import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, Target, TrendingUp, Plus, Trash2, Calendar, LayoutDashboard, User } from "lucide-react";
import { toast } from "sonner";
import { getProgressByUser, createProgressEntry, deleteProgressEntry } from "../../services/api/progress";
import ProgressChart from "./Components/ProgressChart";

function DashboardPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [progressData, setProgressData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [weightInput, setWeightInput] = useState("");
  const [dateInput, setDateInput] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      fetchProgress();
    }
  }, [isLoaded, isSignedIn, user]);

  const fetchProgress = async () => {
    try {
      const data = await getProgressByUser(user.id);
      setProgressData(data);
    } catch (error) {
      toast.error("Failed to load progress data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogProgress = async (e) => {
    e.preventDefault();
    if (!weightInput) return;

    try {
      await createProgressEntry({
        userId: user.id,
        weight: parseFloat(weightInput),
        date: new Date(dateInput),
      });
      toast.success("Progress logged successfully!");
      setWeightInput("");
      fetchProgress();
    } catch (error) {
      toast.error("Failed to save progress");
    }
  };

  const handleDeleteEntry = async (id) => {
    try {
      await deleteProgressEntry(id);
      toast.success("Entry deleted");
      fetchProgress();
    } catch (error) {
      toast.error("Failed to delete entry");
    }
  };

  if (!isLoaded || (isSignedIn && isLoading)) {
    return <div className="flex items-center justify-center min-h-screen"><div className="w-10 h-10 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin" /></div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  const currentWeight = progressData.length > 0 ? progressData[progressData.length - 1].weight : "--";
  const startWeight = progressData.length > 0 ? progressData[0].weight : "--";
  const totalChange = (currentWeight !== "--" && startWeight !== "--") ? (currentWeight - startWeight).toFixed(1) : "0";

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-16">
      <div className="max-w-7xl mx-auto pt-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
              Welcome back, <span className="gradient-text">{user?.firstName}!</span>
            </h1>
            <p className="text-gray-500">Track your journey and crush your fitness goals.</p>
          </div>
          <div className="flex items-center gap-3 bg-white/5 p-2 rounded-2xl border border-white/5">
             <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10">
                <img src={user?.imageUrl} alt="Profile" className="w-full h-full object-cover" />
             </div>
             <div className="pr-4">
                <p className="text-sm font-bold text-white leading-tight">{user?.fullName}</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold">Elite Member</p>
             </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Section */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="glass-card p-6 border-b-2 border-b-red-500/50">
                <div className="flex items-center gap-3 text-gray-500 mb-2">
                  <Scale size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">Current Weight</span>
                </div>
                <div className="text-3xl font-black text-white">{currentWeight} <span className="text-xs text-gray-500 font-medium uppercase">kg</span></div>
              </div>
              <div className="glass-card p-6 border-b-2 border-b-yellow-500/50">
                <div className="flex items-center gap-3 text-gray-500 mb-2">
                  <Target size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">Start Weight</span>
                </div>
                <div className="text-3xl font-black text-white">{startWeight} <span className="text-xs text-gray-500 font-medium uppercase">kg</span></div>
              </div>
              <div className="glass-card p-6 border-b-2 border-b-emerald-500/50">
                <div className="flex items-center gap-3 text-gray-500 mb-2">
                  <TrendingUp size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">Total Change</span>
                </div>
                <div className="text-3xl font-black text-white">{totalChange > 0 ? `+${totalChange}` : totalChange} <span className="text-xs text-gray-500 font-medium uppercase">kg</span></div>
              </div>
            </div>

            {/* Chart */}
            <div className="glass-card-strong p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <LayoutDashboard size={20} className="text-red-500" /> Progress Visualization
                </h2>
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div> Weight (kg)
                </div>
              </div>
              <ProgressChart data={progressData} />
            </div>
          </motion.div>

          {/* Sidebar Section */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            {/* Log Entry Form */}
            <div className="glass-card p-8 border-yellow-400/10">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Plus size={18} className="text-yellow-400" /> Log Progress
              </h2>
              <form onSubmit={handleLogProgress} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Weight (kg)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={weightInput} 
                    onChange={(e) => setWeightInput(e.target.value)}
                    placeholder="75.5" 
                    className="glass-input w-full rounded-xl px-4 py-3 text-sm" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Date</label>
                  <input 
                    type="date" 
                    value={dateInput} 
                    onChange={(e) => setDateInput(e.target.value)}
                    className="glass-input w-full rounded-xl px-4 py-3 text-sm appearance-none" 
                    required 
                  />
                </div>
                <button type="submit" className="btn-gradient w-full !py-4 !rounded-xl text-sm font-bold">
                  Save Entry
                </button>
              </form>
            </div>

            {/* History List */}
            <div className="glass-card-strong p-8 max-h-[400px] flex flex-col overflow-hidden">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Calendar size={18} className="text-gray-400" /> Recent History
              </h2>
              <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence>
                  {[...progressData].reverse().map((entry) => (
                    <motion.div
                      key={entry._id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all group"
                    >
                      <div>
                        <p className="text-xs text-gray-500 font-bold mb-0.5">{new Date(entry.date).toLocaleDateString()}</p>
                        <p className="text-lg font-black text-white">{entry.weight} <span className="text-[10px] text-gray-600">kg</span></p>
                      </div>
                      <button 
                        onClick={() => handleDeleteEntry(entry._id)}
                        className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {progressData.length === 0 && (
                  <p className="text-center text-gray-600 text-xs py-8 italic">No data logged yet</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
