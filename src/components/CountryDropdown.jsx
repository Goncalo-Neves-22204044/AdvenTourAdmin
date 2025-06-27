import { useCountries } from '../hooks/useCountries';

function CountryDropdown({ value, onChange, includeAllOption = true }) {
  const { countries } = useCountries();

  return (
    <div className="w-full">
      <label className="block font-medium mb-1">Seleciona um país:</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {includeAllOption && <option value="">-- Todos os países --</option>}
        {countries.map((country) => (
          <option key={country.code} value={country.id}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CountryDropdown;
