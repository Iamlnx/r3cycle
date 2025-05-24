import { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/logo-r3cycle.svg'
import motorista from '../assets/motorista-foto.jpg'

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);
    try {
      await api.post('/login', { email, senha }, { withCredentials: true });
      const status = await api.get('/status');
      login(status.data.usuario);
      navigate('/');
    } catch (err) {
      setErro(err.response?.data?.erro || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex w-screen h-screen'>
      <div className='hidden md:block w-1/2 h-full bg-[#386641]'>
        <img src={motorista} className='w-full h-full opacity-30'/>
      </div>
      <div className='flex flex-col gap-12 items-center justify-center w-full md:w-1/2 h-full'>
        <img src={logo} className='w-1/3 md:w-1/5 align-middle' />
        <h2>Faça Login</h2>
        <form onSubmit={handleLogin} className='flex flex-col w-8/10 md:w-5/10 gap-5'>
          <section className='flex flex-col gap-3'>
            <label for="email">E-mail</label>
            <input
              type="email"
              placeholder="Insira seu e-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
                className='border-2 border-[#E1E1E1] focus:outline-none rounded-md h-10 pl-2 w-full text-sm'
            />
          </section>
          <section className='flex flex-col gap-3'>
            <label for="password">Senha</label>
            <input
              type="password"
              placeholder="Insira sua senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
              className='border-2 border-[#E1E1E1] focus:outline-none rounded-md h-10 pl-2 w-full text-sm'
            />
          </section>
          <button className='mt-16 w-full h-10 bg-[#386641] text-[#fff] rounded-md cursor-pointer' type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        <p>Não possui uma conta? <Link to="/register" className='text-[#386641]'>Registre-se</Link></p>
      </div>
    </div>
  );
}

export default Login;
