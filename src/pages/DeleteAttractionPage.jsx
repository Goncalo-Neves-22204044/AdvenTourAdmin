import { useEffect, useState, useCallback } from 'react';
import { deleteAttraction } from '../services/deleteAttractionService';
import { getAllAttractions } from '../services/getAllAttractionsService';
import CountryDropdown from '../components/CountryDropdown'; // <- novo componente unificado

function DeleteAttractionPage() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchAttractions() {
      try {
        const data = await getAllAttractions();
        setAttractions(data);
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar atrações.');
      } finally {
        setLoading(false);
      }
    }

    fetchAttractions();
  }, []);

  const confirmAndDelete = useCallback(async (id) => {
    if (!window.confirm("Tens a certeza que queres apagar esta atração?")) return;

    try {
      await deleteAttraction(id);
      setAttractions(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      console.error(err);
      alert('Erro ao apagar a atração.');
    }
  }, []);

  const filteredAttractions = selectedCountry
    ? attractions.filter(a => a.country === selectedCountry)
    : attractions;

  if (loading) return <p>A carregar...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-center">Apagar Atrações</h3>

      <CountryDropdown
        value={selectedCountry}
        onChange={setSelectedCountry}
        valueKey="name"
        placeholder="-- Todos os países --"
      />

      {filteredAttractions.length === 0 ? (
        <p className="text-center">Nenhuma atração disponível neste país.</p>
      ) : (
        <ul className="space-y-2">
          {filteredAttractions.map(({ id, name }) => (
            <li key={id} className="flex justify-between items-center bg-gray-100 p-3 rounded shadow-sm">
              <span>{name}</span>
              <button
                className="bg-red-500 text-black px-3 py-1 rounded hover:bg-red-600"
                onClick={() => confirmAndDelete(id)}
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
