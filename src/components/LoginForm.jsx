import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const validEmail = import.meta.env.VITE_ADMIN_USER;
    const validPassword = import.meta.env.VITE_ADMIN_PASS;

    if (email === validEmail && password === validPassword) {
      localStorage.setItem('adminAuthenticated', 'true');
      navigate('/create');
    } else {
      alert('Email ou palavra-passe incorretos.');
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
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
          className="bg-blue-500 text-black px-4 py-2 rounded w-full hover:bg-blue-600 transition"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
