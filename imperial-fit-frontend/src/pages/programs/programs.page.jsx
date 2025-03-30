import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getPrograms, enrollInProgram } from "../../services/api/programs";

function ProgramsPage() {
  const { isSignedIn, user } = useUser();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");
  const [expandedProgram, setExpandedProgram] = useState(null);

  // Enhanced color palettes for programs
  const categoryColors = {
    Strength: "bg-gradient-to-br from-purple-600 to-purple-800",
    Cardio: "bg-gradient-to-br from-blue-500 to-indigo-700",
    Flexibility: "bg-gradient-to-br from-teal-500 to-green-700",
    Personalized: "bg-gradient-to-br from-rose-500 to-pink-700",
    default: "bg-gradient-to-br from-gray-600 to-gray-800"
  };

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const fetchedPrograms = await getPrograms();
        setPrograms(fetchedPrograms || []);
      } catch (err) {
        setError("Failed to load programs: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    loadPrograms();
  }, []);

  const handleEnroll = async (programId) => {
    if (!isSignedIn) {
      toast.error("Please sign in to enroll!", {
        duration: 2000,
        className: "bg-red-500 text-white",
      });
      return;
    }
    try {
      await enrollInProgram(user.id, programId);
      toast.success("Enrolled successfully! Start your journey now.", {
        duration: 2000,
        className: "bg-green-500 text-white",
      });
    } catch (err) {
      toast.error("Enrollment failed. Try again.", {
        duration: 2000,
        className: "bg-red-500 text-white",
      });
    }
  };

  const toggleExpand = (id) => {
    setExpandedProgram(expandedProgram === id ? null : id);
  };

  const handleFilterClick = (category) => {
    setFilter(category);
  };

  const categories = ["All", "Strength", "Cardio", "Flexibility", "Personalized"];
  const filteredPrograms = filter === "All"
    ? programs
    : programs.filter((p) => p.category.toLowerCase() === filter.toLowerCase());

  const getColorForProgram = (program) => {
    return categoryColors[program.category] || categoryColors.default;
  };

  if (loading) {
    return (
      <main className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
        <img
          src="/assets/Hero/bg4.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm"
        />
        <div className="relative z-10 text-center animate-softFadeIn">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Loading Programs...
          </h2>
          <p className="text-lg md:text-xl text-gray-200">
            Preparing your fitness adventure—hold tight!
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
        <img
          src="/assets/Hero/bg4.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm"
        />
        <p className="relative z-10 text-xl md:text-2xl text-red-400">{error}</p>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-gray-900 py-16 px-4 sm:px-8 lg:px-16 overflow-hidden">
      {/* Blurred Background */}
      <img
        src="/assets/Hero/bg4.jpg"
        alt="Programs Background"
        className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center text-yellow-400 mb-12 tracking-tight animate-softFadeIn">
          Explore Our Fitness Programs
        </h1>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterClick(cat)}
              className={`px-5 py-2 sm:px-6 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ease-in-out shadow-md ${
                filter === cat
                  ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg"
                  : "bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((program) => (
              <div
                key={program._id}
                className={`${getColorForProgram(program)} rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 bg-opacity-90 backdrop-blur-sm border border-gray-200/20 group`}
              >
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">
                  {program.title}
                </h2>
                <p className="text-gray-100 text-sm sm:text-base mb-4 line-clamp-3">
                  {program.description}
                </p>

                {/* Collapsible Details */}
                <button
                  onClick={() => toggleExpand(program._id)}
                  className="flex items-center text-yellow-300 hover:text-yellow-400 transition-colors duration-300 font-medium"
                >
                  {expandedProgram === program._id ? "Hide Details" : "Show Details"}
                  {expandedProgram === program._id ? (
                    <ChevronUp className="ml-2 w-5 h-5" />
                  ) : (
                    <ChevronDown className="ml-2 w-5 h-5" />
                  )}
                </button>
                {expandedProgram === program._id && (
                  <div className="mt-4 text-gray-100 animate-softFadeIn text-sm sm:text-base">
                    <p><strong>Duration:</strong> {program.duration}</p>
                    <p><strong>Difficulty:</strong> {program.difficulty}</p>
                    <p><strong>Trainer:</strong> {program.trainer}</p>
                  </div>
                )}

                {/* Enroll Button */}
                <button
                  onClick={() => handleEnroll(program._id)}
                  className="mt-6 w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base shadow-md hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Enroll Now
                </button>

                {/* Hover Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))
          ) : (
            <p className="text-white text-center col-span-full text-lg sm:text-xl">
              No programs found for this category.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

export default ProgramsPage;