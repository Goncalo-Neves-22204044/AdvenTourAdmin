import { useState, useEffect } from 'react';
import { getAllCountries } from '../services/countryService';

export function useCountries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCountries() {
      try {
        const data = await getAllCountries();
        setCountries(data);
      } catch (err) {
        console.error('Erro ao carregar países:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadCountries();
  }, []);

  return { countries, loading, error };
}
