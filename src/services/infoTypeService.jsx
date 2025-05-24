import axios from 'axios';

export async function getAllInfoTypes() {
  const response = await axios.get('http://localhost:8080/deisi2056/api/Attraction/infoTypes');
  return response.data.data;
}
