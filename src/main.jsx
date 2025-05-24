import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import CreateAttractionForm from './pages/CreateAttractionForm.jsx';
import LoginForm from './pages/LoginForm.jsx'; // create this
import PrivateRoute from './services/PrivateRoute.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/create" element={
            <PrivateRoute>
              <CreateAttractionForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
