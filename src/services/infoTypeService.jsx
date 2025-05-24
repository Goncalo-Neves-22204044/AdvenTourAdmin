import axios from 'axios';

export async function getAllInfoTypes() {
  const response = await axios.get(import.meta.env.VITE_API_URL + '/Attraction/infoTypes');
  return response.data.data;
}
