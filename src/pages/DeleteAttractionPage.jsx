import { useEffect, useState } from 'react';
import { deleteAttraction } from '../services/deleteAttractionService';
import CountryDropdown from '../components/CountryDropdown';

function DeleteAttractionPage() {
  const [selectedCountry, setSelectedCountry] = useState('');
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
        setAttractions(json.data);
      })
      .catch(err => {
        console.error(err);
        setError('Erro ao carregar atrações.');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Tens a certeza que queres apagar esta atração?");
    if (!confirm) return;

    try {
      await deleteAttraction(id);
      setAttractions(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      console.error(err);
      alert('Erro ao apagar a atração.');
    }
  };

  const filteredAttractions = selectedCountry
    ? attractions.filter((a) => a.country === selectedCountry)
    : attractions;

  if (loading) return <p>A carregar...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-center">Apagar Atrações</h3>

      {/* Componente reutilizável de dropdown de países */}
      <CountryDropdown
        value={selectedCountry}
        onChange={setSelectedCountry}
      />

      {/* Lista de atrações filtrada */}
      {filteredAttractions.length === 0 ? (
        <p className="text-center">Nenhuma atração disponível neste país.</p>
      ) : (
        <ul className="space-y-2">
          {filteredAttractions.map((a) => (
            <li key={a.id} className="flex justify-between items-center bg-gray-100 p-3 rounded shadow-sm">
              <span>{a.name}</span>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => handleDelete(a.id)}
              >
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
