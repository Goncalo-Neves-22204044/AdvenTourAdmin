import api from './api';

export async function getAllCountries() {
  const response = await api.get('/Country/countries/all');
  return response.data.data;
}

