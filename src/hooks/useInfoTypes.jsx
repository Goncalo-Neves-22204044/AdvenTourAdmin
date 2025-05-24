import { useEffect, useState } from 'react';
import { getAllInfoTypes } from '../services/infoTypeService';

export const useInfoTypes = () => {
  const [infoTypes, setInfoTypes] = useState([]);

  useEffect(() => {
    async function fetchInfoTypes() {
      try {
        const data = await getAllInfoTypes();
        setInfoTypes(data);
      } catch (error) {
        console.error('Erro ao carregar tipos de informação:', error);
      }
    }

    fetchInfoTypes();
  }, []);

  return { infoTypes };
};
