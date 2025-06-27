import { useState } from 'react';
import CreateAttractionForm from './pages/CreateAttractionForm';
import DeleteAttractionPage from './pages/DeleteAttractionPage';
import LogoutButton from './components/LogoutButton'; // <--- novo

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedPage, setSelectedPage] = useState('add');

  const handleLogin = () => {
    const validEmail = import.meta.env.VITE_ADMIN_USER;
    const validPassword = import.meta.env.VITE_ADMIN_PASS;

    if (email === validEmail && password === validPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Email ou palavra-passe incorretos.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 relative">
      {isAuthenticated && <LogoutButton />} {/* <-- Aqui está o botão visível em todas as páginas */}

      {!isAuthenticated ? (
        <div className="bg-white p-6 rounded shadow max-w-sm w-full">
          <h2 className="text-xl font-semibold mb-4 text-center">Admin Login</h2>
          <input
            type="email"
            className="border px-3 py-2 w-full rounded mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            className="border px-3 py-2 w-full rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Palavra-passe"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-500 px-4 py-2 rounded w-full hover:bg-blue-600 transition"
          >
            Entrar
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded shadow max-w-2xl w-full space-y-6">
          <h2 className="text-2xl font-bold text-center">Área de Administração</h2>

          <div className="flex justify-center space-x-4">
            <button
              className={`px-4 py-2 rounded ${selectedPage === 'add' ? 'bg-blue-600 text-black' : 'bg-gray-200'}`}
              onClick={() => setSelectedPage('add')}
            >
              Adicionar Atração
            </button>
            <button
              className={`px-4 py-2 rounded ${selectedPage === 'delete' ? 'bg-red-600 text-black' : 'bg-gray-200'}`}
              onClick={() => setSelectedPage('delete')}
            >
              Apagar Atração
            </button>
          </div>

          {selectedPage === 'add' && <CreateAttractionForm />}
          {selectedPage === 'delete' && <DeleteAttractionPage />}
        </div>
      )}
    </div>
  );
}

export default App;
