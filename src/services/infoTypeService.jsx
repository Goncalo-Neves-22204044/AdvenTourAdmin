import api from './api';

export async function getAllInfoTypes() {
  const response = await api.get('/Attraction/infoTypes');
  return response.data.data;
}