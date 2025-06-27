import { useCountries } from '../hooks/useCountries';

function CountryDropdown({
  value,
  onChange,
  valueKey = 'id', // pode ser 'id' ou 'name'
  includeAllOption = true,
  label = 'Seleciona um país:',
  placeholder = '-- Seleciona um país --',
}) {
  const { countries } = useCountries();

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    onChange(valueKey === 'id' ? Number(selectedValue) : selectedValue);
  };

  return (
    <div className="w-full">
      <label className="block font-medium mb-1">{label}</label>
      <select
        value={value}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {includeAllOption && <option value="">{placeholder}</option>}
        {countries.map((country) => (
          <option key={country.id} value={country[valueKey]}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CountryDropdown;
