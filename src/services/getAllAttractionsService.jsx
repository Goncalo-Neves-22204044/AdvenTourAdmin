export async function getAllAttractions() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/Attraction/admin/attractions`, {
    headers: {
      'X-ADMIN-KEY': import.meta.env.VITE_BACKEND_API_KEY,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro ao buscar atrações: ${errorText}`);
  }

  const data = await response.json();
  return data.data;
}
