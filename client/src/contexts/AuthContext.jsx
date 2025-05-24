import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Verifica se está logado ao abrir a página
  useEffect(() => {
    async function checarLogin() {
      try {
        const resp = await api.get('/status'); 
        setUsuario(resp.data.usuario);
      } catch {
        setUsuario(null);
      } finally {
        setCarregando(false);
      }
    }
    checarLogin();
  }, []);

  function login(usuario) {
    setUsuario(usuario);
  }

  function logout() {
    setUsuario(null);
    api.post('/logout'); // faça um endpoint de logout no Flask se quiser
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout, carregando }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
