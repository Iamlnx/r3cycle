import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AcessoNegado from './AcessoNegado';

function AdminRoute({ children }) {
  const { usuario, carregando } = useAuth();

  if (carregando) return <div>Carregando...</div>;
  if (!usuario) return <Navigate to="/login" replace />;
  if (usuario.tipo_usuario !== 'admin') return <AcessoNegado />;
  return children;
}

export default AdminRoute;
