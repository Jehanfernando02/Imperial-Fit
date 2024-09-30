function Tab({ category, onClick, isActive }) {
  return (
    <button
      onClick={() => onClick(category._id)}
      className={`py-2 px-4 rounded-lg ${isActive ? "bg-yellow-400 text-black" : "bg-stone-400 text-black"}`}
    >
      {category.name}
    </button>
  );
}

export default Tab;
