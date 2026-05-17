function Tab({ category, onClick, isActive }) {
  return (
      <button
          onClick={() => onClick(category._id)}
          className={`py-2.5 px-5 rounded-full text-sm font-semibold transition-all duration-300 ${
            isActive
              ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/25"
              : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
          }`}
      >
          {category.name}
      </button>
  );
}

export default Tab;