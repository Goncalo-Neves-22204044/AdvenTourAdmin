import axios from 'axios';

export async function getAllCountries() {
  const response = await axios.get('http://localhost:8080/deisi2056/api/Country/countries/all');
  return response.data.data;
}
