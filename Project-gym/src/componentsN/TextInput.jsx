function TextInput({ name, label, placeholder, onChange, required, value }) {
    return (
      <div className="flex flex-col p-2 gap-y-2">
        <label
          htmlFor={name}
          className="block text-lg font-bold text-gray-800"
        >
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
          className="block border-2 focus:outline-none focus:border-sky-500 focus:shadow-lg border-gray-300 rounded-lg p-3 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
        />
      </div>
    );
  }
  
  export default TextInput;
  