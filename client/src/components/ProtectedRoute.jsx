import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { usuario, carregando } = useAuth();

  if (carregando) return <div>Carregando...</div>;
  if (!usuario) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;
