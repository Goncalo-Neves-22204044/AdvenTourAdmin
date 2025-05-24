import { useState, useEffect } from 'react';
import { getAllInfoTypes } from '../services/infoTypeService';

export function useInfoTypes() {
  const [infoTypes, setInfoTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadInfoTypes() {
      try {
        const response = await getAllInfoTypes();
        setInfoTypes(response.data.data);
      } catch (err) {
        console.error('Erro ao carregar tipos de informação:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadInfoTypes();
  }, []);

  return { infoTypes, loading, error };
}
