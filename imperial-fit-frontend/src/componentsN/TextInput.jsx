function TextInput({ name, label, placeholder, onChange, required, value }) {
  return (
      <div className="flex flex-col w-full">
          <label htmlFor={name} className="text-sm font-semibold text-gray-300 mb-2 tracking-wide">
              {label}
              {required && <span className="text-red-400 ml-1">*</span>}
          </label>
          <input
              type="text"
              required={required}
              id={name}
              value={value}
              name={name}
              onChange={onChange}
              placeholder={placeholder}
              className="glass-input w-full rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
          />
      </div>
  );
}

export default TextInput;