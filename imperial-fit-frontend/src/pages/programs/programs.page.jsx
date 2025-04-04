import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function ProgramsPage() {
  const [filter, setFilter] = useState("All");
  const [expandedProgram, setExpandedProgram] = useState(null);

  // Enhanced color palettes for programs
  const categoryColors = {
    Strength: "bg-gradient-to-br from-purple-600 to-purple-800",
    Cardio: "bg-gradient-to-br from-blue-500 to-indigo-700",
    Flexibility: "bg-gradient-to-br from-teal-500 to-green-700",
    Personalized: "bg-gradient-to-br from-rose-500 to-pink-700",
    default: "bg-gradient-to-br from-gray-600 to-gray-800",
  };

  // Hardcoded programs data with full descriptions
  const programs = [
    {
      _id: "1",
      title: "Weight Training",
      category: "Strength",
      description:
        "Transform your physique with our expertly designed weight training program.",
      fullDescription:
        "Dive into a comprehensive strength-building experience with our Weight Training program. This 8-week journey is crafted for all levels, from beginners to advanced lifters. You’ll master foundational lifts like squats, deadlifts, and bench presses, using progressive resistance to sculpt lean muscle and boost power. Guided by trainer John Doe, expect personalized tips to perfect your form and maximize gains—your ticket to a stronger, more confident you.",
      duration: "8 weeks",
      difficulty: "Beginner to Advanced",
      trainer: "John Doe",
    },
    {
      _id: "2",
      title: "Cardio Training",
      category: "Cardio",
      description:
        "Ignite your stamina with dynamic cardio workouts crafted to elevate your heart rate.",
      fullDescription:
        "Get ready to push your limits with our Cardio Training program. Over 6 weeks, you’ll engage in heart-pumping sessions—think treadmill sprints, cycling circuits, and jump rope drills—designed to torch calories and enhance endurance. Intermediate fitness enthusiasts will thrive under Jane Smith’s expert guidance, with workouts that blend intensity and fun to keep you energized and ready to tackle anything life throws your way.",
      duration: "6 weeks",
      difficulty: "Intermediate",
      trainer: "Jane Smith",
    },
    {
      _id: "3",
      title: "Yoga & Flexibility",
      category: "Flexibility",
      description:
        "Find your zen and enhance mobility with our Yoga & Flexibility program.",
      fullDescription:
        "Unwind and stretch your way to better health with our 4-week Yoga & Flexibility program. Suitable for all levels, this calming yet challenging series, led by Emily Yoga, guides you through poses like downward dog, warrior flows, and deep stretches. Improve your posture, release tension, and find balance—both physically and mentally. It’s more than a workout; it’s a lifestyle reset for body and soul.",
      duration: "4 weeks",
      difficulty: "All Levels",
      trainer: "Emily Yoga",
    },
    {
      _id: "4",
      title: "HIIT",
      category: "Cardio",
      description:
        "Unleash your inner athlete with High-Intensity Interval Training (HIIT).",
      fullDescription:
        "Step up to the ultimate fat-burning challenge with our 5-week HIIT program. Perfect for advanced fitness buffs, this fast-paced regimen, led by Mike Intensity, alternates explosive moves—burpees, sprints, and kettlebell swings—with short recovery periods. Expect to skyrocket your metabolism, build explosive power, and see results fast. It’s intense, it’s efficient, and it’s your shortcut to peak performance.",
      duration: "5 weeks",
      difficulty: "Advanced",
      trainer: "Mike Intensity",
    },
    {
      _id: "5",
      title: "Personal Training",
      category: "Personalized",
      description:
        "Experience fitness tailored just for you with our Personal Training program.",
      fullDescription:
        "Your fitness journey gets personal with our custom Personal Training program. Alex Fit, your dedicated coach, designs a plan that fits your unique goals—whether it’s strength, endurance, or recovery. With a flexible duration and adaptive difficulty, this program evolves with you, offering one-on-one guidance, custom workouts, and insider tips to smash through plateaus and achieve results that stick.",
      duration: "Custom",
      difficulty: "All Levels",
      trainer: "Alex Fit",
    },
  ];

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

  return (
    <main className="relative min-h-screen bg-gray-900 py-16 px-4 sm:px-8 lg:px-16 overflow-hidden">
      {/* Blurred Background */}
      <img
        src="/assets/Hero/bg4.jpg"
        alt="Programs Background"
        className="absolute inset-0 w-full h-full object-cover opacity-15 blur-xl scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center text-yellow-400 mb-8 sm:mb-12 pt-12 tracking-tight animate-softFadeIn">
          Explore Our Fitness Programs
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-200 text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
          Discover expertly crafted programs to ignite your fitness passion.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterClick(cat)}
              className={`px-5 py-2 sm:px-6 sm:py-2.5 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ease-in-out shadow-md ${
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((program) => (
              <div
                key={program._id}
                className={`${getColorForProgram(program)} rounded-lg p-4 sm:p-5 shadow-md hover:shadow-xl transition-all duration-400 ease-in-out transform hover:-translate-y-1 bg-opacity-90 backdrop-blur-sm border border-gray-200/20 group relative overflow-hidden`}
              >
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

                <h2 className="relative z-10 text-lg sm:text-xl font-semibold text-white mb-2 tracking-tight line-clamp-2">
                  {program.title}
                </h2>
                <p className="relative z-10 text-gray-100 text-xs sm:text-sm mb-3 line-clamp-2">
                  {program.description}
                </p>

                {/* Collapsible Details */}
                <button
                  onClick={() => toggleExpand(program._id)}
                  className="relative z-10 flex items-center text-yellow-300 hover:text-yellow-400 transition-colors duration-300 font-medium text-xs sm:text-sm"
                >
                  {expandedProgram === program._id ? "Hide Details" : "Show Details"}
                  {expandedProgram === program._id ? (
                    <ChevronUp className="ml-1 w-4 h-4" />
                  ) : (
                    <ChevronDown className="ml-1 w-4 h-4" />
                  )}
                </button>
                {expandedProgram === program._id && (
                  <div className="relative z-10 mt-3 text-gray-100 animate-softFadeIn text-xs sm:text-sm">
                    <p className="mb-2">{program.fullDescription}</p>
                    <p><strong>Duration:</strong> {program.duration}</p>
                    <p><strong>Difficulty:</strong> {program.difficulty}</p>
                    <p><strong>Trainer:</strong> {program.trainer}</p>
                  </div>
                )}

                {/* Hover Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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