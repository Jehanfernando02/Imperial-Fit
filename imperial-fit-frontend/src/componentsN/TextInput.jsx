function TextInput({ name, label, placeholder, onChange, required, value }) {
  return (
      <div className="flex flex-col w-full px-2 py-1">
          <label htmlFor={name} className="text-lg font-bold text-gray-800 mb-1">
              {label}
          </label>
          <input
              type="text"
              required={required}
              id={name}
              value={value}
              name={name}
              onChange={onChange}
              placeholder={placeholder}
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all duration-300 hover:shadow-md"
          />
      </div>
  );
}

export default TextInput;