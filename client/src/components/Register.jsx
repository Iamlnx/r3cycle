import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [tipo_usuario, setTipoUsuario] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      await api.post('/register', { nome, email, senha, tipo_usuario });
      alert('Registro realizado com sucesso! Faça login.');
      navigate('/login');
    } catch (err) {
      setErro(err.response?.data?.erro || 'Erro ao registrar');
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tipo de usuário (opcional)"
          value={tipo_usuario}
          onChange={e => setTipoUsuario(e.target.value)}
        />
        <button type="submit">Registrar</button>
      </form>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <p>Já tem conta? <a href="/login">Faça login</a></p>
    </div>
  );
}

export default Register;
