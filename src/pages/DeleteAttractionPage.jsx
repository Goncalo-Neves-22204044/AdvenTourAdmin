import { useEffect, useState } from 'react';

function DeleteAttractionPage() {
  const [attractions, setAttractions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/attraction/admin/all`, {
      headers: {
        'X-ADMIN-KEY': import.meta.env.VITE_ADMIN_API_KEY,
      }
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Erro ao buscar atrações.');
        const json = await res.json();
        setAttractions(json.data); // assuming BaseApiResponse<T>
      })
      .catch(err => {
        console.error(err);
        setError('Erro ao carregar atrações.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>A carregar...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-center">Apagar Atrações</h3>
      {attractions.length === 0 ? (
        <p className="text-center">Nenhuma atração disponível.</p>
      ) : (
        <ul className="space-y-2">
          {attractions.map((a) => (
            <li key={a.id} className="flex justify-between items-center bg-gray-100 p-3 rounded shadow-sm">
              <span>{a.name}</span>
              <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                Apagar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DeleteAttractionPage;
