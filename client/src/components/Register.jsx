import { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo-r3cycle.svg';
import motorista from '../assets/motorista-foto.jpg';

function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErro('');
    if (senha !== confirmarSenha) {
      setErro('As senhas não são iguais.');
      return;
    }
    setLoading(true);
    try {
      await api.post('/register', { nome, email, senha, tipo_usuario: 'motorista' });
      navigate('/login');
    } catch (err) {
      setErro(err.response?.data?.erro || 'Erro ao registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex w-screen h-screen'>
      <div className='hidden md:block w-1/2 h-full bg-[#386641]'>
        <img src={motorista} className='w-full h-full opacity-30' alt="Motorista" />
      </div>
      <div className='flex flex-col gap-8 items-center justify-center w-full md:w-1/2 h-full'>
        <img src={logo} className='w-1/3 md:w-1/6 align-middle' alt="Logo" />
        <h2>Cadastre-se</h2>
        <form onSubmit={handleRegister} className='flex flex-col w-8/10 md:w-5/10 gap-5'>
          <section className='flex flex-col gap-3'>
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              placeholder="Seu nome completo"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
              className='border-2 border-[#E1E1E1] focus:outline-none rounded-md h-10 pl-2 w-full text-sm'
            />
          </section>
          <section className='flex flex-col gap-3'>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Insira seu e-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className='border-2 border-[#E1E1E1] focus:outline-none rounded-md h-10 pl-2 w-full text-sm'
            />
          </section>
          <section className='flex flex-col gap-3'>
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              placeholder="Insira sua senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
              className='border-2 border-[#E1E1E1] focus:outline-none rounded-md h-10 pl-2 w-full text-sm'
            />
          </section>
          <section className='flex flex-col gap-3'>
            <label htmlFor="confirmarSenha">Confirmar senha</label>
            <input
              type="password"
              id="confirmarSenha"
              placeholder="Confirme sua senha"
              value={confirmarSenha}
              onChange={e => setConfirmarSenha(e.target.value)}
              required
              className='border-2 border-[#E1E1E1] focus:outline-none rounded-md h-10 pl-2 w-full text-sm'
            />
          </section>
          <button className='mt-16 w-full h-10 bg-[#386641] text-[#fff] rounded-md cursor-pointer' type="submit" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrar'}
          </button>
        </form>
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        <p>Já possui uma conta? <Link to="/login" className='text-[#386641]'>Entrar</Link></p>
      </div>
    </div>
  );
}

export default Register;
