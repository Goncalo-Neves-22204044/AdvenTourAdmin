import { useCountries } from '../hooks/useCountries';

function CountryDropdown({ value, onChange, includeAllOption = true }) {
  const { countries } = useCountries();

  return (
    <div className="text-center">
      <label className="block mb-1 font-medium">Seleciona um país:</label>
      <select
        className="border px-3 py-2 rounded"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {includeAllOption && <option value="">-- Todos os países --</option>}
        {countries.map((country) => (
          <option key={country.code} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CountryDropdown;
