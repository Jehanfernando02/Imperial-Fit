function Tab({ category, onClick, isActive }) {
  return (
      <button
          onClick={() => onClick(category._id)}
          className={`py-2 px-4 rounded-lg text-sm sm:text-base ${isActive ? "bg-yellow-400 text-black" : "bg-stone-400 text-black"} hover:bg-yellow-500 transition-all duration-300`}
      >
          {category.name}
      </button>
  );
}

export default Tab;