// src/components/TextInput.jsx
function TextInput({ name, value, onChange, placeholder, type = 'text', required = false }) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full p-2 border rounded"
    />
  );
}

export default TextInput;
