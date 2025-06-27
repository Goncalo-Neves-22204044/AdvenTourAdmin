export async function deleteAttraction(id) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/Attraction/attraction/${id}`, {
    method: 'DELETE',
    headers: {
      'X-ADMIN-KEY': import.meta.env.VITE_ADMIN_API_KEY,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Erro ao apagar a atração: ${error}`);
  }

  return res;
}
