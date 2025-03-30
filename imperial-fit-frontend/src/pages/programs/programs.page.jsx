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

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const fetchedPrograms = await getPrograms();
        console.log("Raw programs from backend:", fetchedPrograms); // Debug: See raw data
        setPrograms(fetchedPrograms);
      } catch (err) {
        setError("Failed to load programs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadPrograms();
  }, []);

  const handleEnroll = async (programId) => {
    if (!isSignedIn) {
      toast.error("Please sign in to enroll in a program!");
      return;
    }
    try {
      await enrollInProgram(user.id, programId);
      toast.success("Successfully enrolled! Check your email for details.");
    } catch (err) {
      toast.error("Enrollment failed. Try again later.");
    }
  };

  const toggleExpand = (id) => {
    setExpandedProgram(expandedProgram === id ? null : id);
  };

  const handleFilterClick = (category) => {
    console.log("Filter clicked:", category); // Debug: Confirm click
    setFilter(category);
  };

  const categories = ["All", "Strength", "Cardio", "Flexibility", "Personalized"];
  const filteredPrograms = filter === "All" 
    ? programs 
    : programs.filter(p => {
        const programCategory = p.category ? p.category.toLowerCase() : "";
        const filterCategory = filter.toLowerCase();
        console.log(`Comparing: ${programCategory} === ${filterCategory}`); // Debug: Check comparison
        return programCategory === filterCategory;
      });

  useEffect(() => {
    console.log("Current filter:", filter); // Debug: Track filter state
    console.log("Filtered programs:", filteredPrograms); // Debug: See filtered result
  }, [filter, programs]);

  if (loading) {
    return (
      <main className="bg-gray-900 min-h-screen px-8 py-24 flex items-center justify-center">
        <div className="text-center animate-softFadeIn">
          <h2 className="text-3xl font-bold text-white mb-4">Loading Programs...</h2>
          <p className="text-gray-300">Getting your fitness journey ready—just a sec!</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-gray-900 min-h-screen px-8 py-24 flex items-center justify-center">
        <p className="text-red-400 text-xl">{error}</p>
      </main>
    );
  }

  return (
    <main className="bg-gray-900 min-h-screen px-8 py-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-yellow-400 mb-12 animate-softFadeIn">
          Our Fitness Programs
        </h1>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterClick(cat)}
              className={`px-6 py-2 rounded-full text-white font-semibold transition-all duration-300 ease-in-out ${
                filter === cat
                  ? "bg-yellow-400 text-black shadow-lg"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Programs List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((program) => (
              <div
                key={program._id}
                className={`${program.color} rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                <h2 className="text-2xl font-semibold text-white mb-3">{program.title}</h2>
                <p className="text-gray-200 mb-4">{program.description}</p>
                
                {/* Collapsible Details */}
                <button
                  onClick={() => toggleExpand(program._id)}
                  className="flex items-center text-yellow-300 hover:text-yellow-400 transition duration-200"
                >
                  {expandedProgram === program._id ? "Hide Details" : "Show Details"}
                  {expandedProgram === program._id ? (
                    <ChevronUp className="ml-2 w-5 h-5" />
                  ) : (
                    <ChevronDown className="ml-2 w-5 h-5" />
                  )}
                </button>
                {expandedProgram === program._id && (
                  <div className="mt-4 text-gray-100 animate-softFadeIn">
                    <p><strong>Duration:</strong> {program.duration}</p>
                    <p><strong>Difficulty:</strong> {program.difficulty}</p>
                    <p><strong>Trainer:</strong> {program.trainer}</p>
                  </div>
                )}

                {/* Enroll Button */}
                <button
                  onClick={() => handleEnroll(program._id)}
                  className="mt-6 w-full bg-yellow-400 text-black py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-300 shadow-md"
                >
                  Enroll Now
                </button>
              </div>
            ))
          ) : (
            <p className="text-white text-center col-span-full">
              No programs found for this category.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

export default ProgramsPage;