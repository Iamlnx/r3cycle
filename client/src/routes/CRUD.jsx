import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import api from '../services/api';

const TABS = [
  { key: 'estados', label: 'Estados' },
  { key: 'cidades', label: 'Cidades' },
  { key: 'usuarios', label: 'Usuários' },
  { key: 'pontos', label: 'Pontos de Coleta' },
  { key: 'conexoes', label: 'Conexões' },
];

const VERDE = '#386641';

export default function CRUD() {
  const [activeTab, setActiveTab] = useState('estados');
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [pontos, setPontos] = useState([]);
  const [conexoes, setConexoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({});
  const [refresh, setRefresh] = useState(false);

  // Busca todos os dados necessários
  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      try {
        const [
          resEstados,
          resCidades,
          resUsuarios,
          resPontos,
          resConexoes,
        ] = await Promise.all([
          api.get('/estados'),
          api.get('/cidades'),
          api.get('/usuarios'),
          api.get('/pontos'),
          api.get('/conexoes'),
        ]);
        setEstados(resEstados.data);
        setCidades(resCidades.data);
        setUsuarios(resUsuarios.data);
        setPontos(resPontos.data);
        setConexoes(resConexoes.data);
      } catch (e) {
        setEstados([]);
        setCidades([]);
        setUsuarios([]);
        setPontos([]);
        setConexoes([]);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, [refresh]);

  // Manipula formulário de cadastro
  function handleFormChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  async function handleCadastro(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (activeTab === 'estados') {
        await api.post('/estados', { nome: form.nome });
      } else if (activeTab === 'cidades') {
        await api.post('/cidades', { nome: form.nome, id_estado: form.id_estado });
      } else if (activeTab === 'usuarios') {
        await api.post('/usuarios', {
          nome: form.nome,
          email: form.email,
          senha: form.senha,
          id_cidade: form.id_cidade || null,
          tipo_usuario: form.tipo_usuario || null
        });
      } else if (activeTab === 'pontos') {
        await api.post('/pontos', {
          nome: form.nome,
          endereco: form.endereco,
          tipo_residuo: form.tipo_residuo,
          cidade_id: form.cidade_id,
          x: form.x,
          y: form.y
        });
      } else if (activeTab === 'conexoes') {
        await api.post('/conexoes', {
          ponto_origem_id: form.ponto_origem_id,
          ponto_destino_id: form.ponto_destino_id,
          peso: form.peso
        });
      }
      setForm({});
      setRefresh(r => !r);
    } catch (e) {
      alert('Erro ao cadastrar!');
    } finally {
      setLoading(false);
    }
  }

  // Função para excluir por id e endpoint
  async function handleDelete(endpoint, id) {
    if (!window.confirm('Tem certeza que deseja excluir este registro?')) return;
    setLoading(true);
    try {
      await api.delete(`/${endpoint}/${id}`);
      setRefresh(r => !r);
    } catch (e) {
      alert('Erro ao excluir!');
    } finally {
      setLoading(false);
    }
  }

  // Renderiza tabela e formulário conforme aba ativa
  function renderTableAndForm() {
    if (activeTab === 'estados') {
      return (
        <>
          <h2 className="font-bold mb-2">Cadastro de Estado</h2>
          <form className="mb-4 flex gap-2" onSubmit={handleCadastro}>
            <input
              className="border rounded px-2 py-1"
              name="nome"
              placeholder="Nome do Estado"
              value={form.nome || ''}
              onChange={handleFormChange}
              required
            />
            <button style={{ background: VERDE }} className="text-white rounded px-3" type="submit" disabled={loading}>Salvar</button>
          </form>
          <h3 className="font-semibold mb-1">Lista de Estados</h3>
          <table className="w-full bg-white rounded shadow mb-6">
            <thead>
              <tr className='text-left'>
                <th className="px-2 py-1">ID</th>
                <th className="px-2 py-1">Nome</th>
                <th className="px-2 py-1">Ações</th>
              </tr>
            </thead>
            <tbody>
              {estados.map(e => (
                <tr key={e.id_estado}>
                  <td className="px-2 py-1">{e.id_estado}</td>
                  <td className="px-2 py-1">{e.nome}</td>
                  <td className="px-2 py-1">
                    <button
                      style={{ color: VERDE }}
                      className="px-2 py-1 rounded hover:bg-green-50"
                      onClick={() => handleDelete('estados', e.id_estado)}
                      disabled={loading}
                    >Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }

    if (activeTab === 'cidades') {
      return (
        <>
          <h2 className="font-bold mb-2">Cadastro de Cidade</h2>
          <form className="mb-4 flex gap-2 flex-wrap items-end" onSubmit={handleCadastro}>
            <input
              className="border rounded px-2 py-1"
              name="nome"
              placeholder="Nome da Cidade"
              value={form.nome || ''}
              onChange={handleFormChange}
              required
            />
            <select
              className="border rounded px-2 py-1"
              name="id_estado"
              value={form.id_estado || ''}
              onChange={handleFormChange}
              required
            >
              <option value="">Estado</option>
              {estados.map(e => (
                <option key={e.id_estado} value={e.id_estado}>{e.nome}</option>
              ))}
            </select>
            <button style={{ background: VERDE }} className="text-white rounded px-3" type="submit" disabled={loading}>Salvar</button>
          </form>
          <h3 className="font-semibold mb-1">Lista de Cidades</h3>
          <table className="w-full bg-white rounded shadow mb-6">
            <thead>
              <tr className='text-left'>
                <th className="px-2 py-1">ID</th>
                <th className="px-2 py-1">Nome</th>
                <th className="px-2 py-1">Estado</th>
                <th className="px-2 py-1">Ações</th>
              </tr>
            </thead>
            <tbody>
              {cidades.map(c => (
                <tr key={c.id_cidade} className='text-left'>
                  <td className="px-2 py-1">{c.id_cidade}</td>
                  <td className="px-2 py-1">{c.nome}</td>
                  <td className="px-2 py-1">{estados.find(e => e.id_estado === c.id_estado)?.nome || ""}</td>
                  <td className="px-2 py-1">
                    <button
                      style={{ color: VERDE }}
                      className="px-2 py-1 rounded hover:bg-green-50"
                      onClick={() => handleDelete('cidades', c.id_cidade)}
                      disabled={loading}
                    >Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }

    if (activeTab === 'usuarios') {
      return (
        <>
          <h2 className="font-bold mb-2">Cadastro de Usuário</h2>
          <form className="mb-4 flex gap-2 flex-wrap items-end" onSubmit={handleCadastro}>
            <input
              className="border rounded px-2 py-1"
              name="nome"
              placeholder="Nome"
              value={form.nome || ''}
              onChange={handleFormChange}
              required
            />
            <input
              className="border rounded px-2 py-1"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email || ''}
              onChange={handleFormChange}
              required
            />
            <input
              className="border rounded px-2 py-1"
              name="senha"
              type="password"
              placeholder="Senha"
              value={form.senha || ''}
              onChange={handleFormChange}
              required
            />
            <input
              className="border rounded px-2 py-1"
              name="tipo_usuario"
              placeholder="Tipo de Usuário (opcional)"
              value={form.tipo_usuario || ''}
              onChange={handleFormChange}
            />
            <button style={{ background: VERDE }} className="text-white rounded px-3" type="submit" disabled={loading}>Salvar</button>
          </form>
          <h3 className="font-semibold mb-1">Lista de Usuários</h3>
          <table className="w-full bg-white rounded shadow mb-6">
            <thead>
              <tr className='text-left'>
                <th className="px-2 py-1">ID</th>
                <th className="px-2 py-1">Nome</th>
                <th className="px-2 py-1">Email</th>
                <th className="px-2 py-1">Tipo</th>
                <th className="px-2 py-1">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(u => (
                <tr key={u.id_usuario}>
                  <td className="px-2 py-1">{u.id_usuario}</td>
                  <td className="px-2 py-1">{u.nome}</td>
                  <td className="px-2 py-1">{u.email}</td>
                  <td className="px-2 py-1">{u.tipo_usuario}</td>
                  <td className="px-2 py-1">
                    <button
                      style={{ color: VERDE }}
                      className="px-2 py-1 rounded hover:bg-green-50"
                      onClick={() => handleDelete('usuarios', u.id_usuario)}
                      disabled={loading}
                    >Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }

    if (activeTab === 'pontos') {
      return (
        <>
          <h2 className="font-bold mb-2">Cadastro de Ponto de Coleta</h2>
          <form className="mb-4 flex gap-2 flex-wrap items-end" onSubmit={handleCadastro}>
            <input
              className="border rounded px-2 py-1"
              name="nome"
              placeholder="Nome do Ponto"
              value={form.nome || ''}
              onChange={handleFormChange}
              required
            />
            <select
              className="border rounded px-2 py-1"
              name="cidade_id"
              value={form.cidade_id || ''}
              onChange={handleFormChange}
              required
            >
              <option value="">Cidade</option>
              {cidades.map(c => (
                <option key={c.id_cidade} value={c.id_cidade}>{c.nome}</option>
              ))}
            </select>
            <input
              className="border rounded px-2 py-1"
              name="endereco"
              placeholder="Endereço"
              value={form.endereco || ''}
              onChange={handleFormChange}
            />
            <input
              className="border rounded px-2 py-1"
              name="tipo_residuo"
              placeholder="Tipo de Resíduo"
              value={form.tipo_residuo || ''}
              onChange={handleFormChange}
            />
            <input
              className="border rounded px-2 py-1"
              name="x"
              type="number"
              placeholder="X"
              value={form.x || ''}
              onChange={handleFormChange}
            />
            <input
              className="border rounded px-2 py-1"
              name="y"
              type="number"
              placeholder="Y"
              value={form.y || ''}
              onChange={handleFormChange}
            />
            <button style={{ background: VERDE }} className="text-white rounded px-3" type="submit" disabled={loading}>Salvar</button>
          </form>
          <h3 className="font-semibold mb-1">Lista de Pontos de Coleta</h3>
          <table className="w-full bg-white rounded shadow mb-6">
            <thead>
              <tr className='text-left'>
                <th className="px-2 py-1">ID</th>
                <th className="px-2 py-1">Nome</th>
                <th className="px-2 py-1">Endereço</th>
                <th className="px-2 py-1">Tipo de Resíduo</th>
                <th className="px-2 py-1">Cidade</th>
                <th className="px-2 py-1">X</th>
                <th className="px-2 py-1">Y</th>
                <th className="px-2 py-1">Ações</th>
              </tr>
            </thead>
            <tbody>
              {pontos.map(p => (
                <tr key={p.id_ponto}>
                  <td className="px-2 py-1">{p.id_ponto}</td>
                  <td className="px-2 py-1">{p.nome}</td>
                  <td className="px-2 py-1">{p.endereco}</td>
                  <td className="px-2 py-1">{p.tipo_residuo}</td>
                  <td className="px-2 py-1">{cidades.find(c => c.id_cidade === p.cidade_id)?.nome || ""}</td>
                  <td className="px-2 py-1">{p.x}</td>
                  <td className="px-2 py-1">{p.y}</td>
                  <td className="px-2 py-1">
                    <button
                      style={{ color: VERDE }}
                      className="px-2 py-1 rounded hover:bg-green-50"
                      onClick={() => handleDelete('pontos', p.id_ponto)}
                      disabled={loading}
                    >Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }

    if (activeTab === 'conexoes') {
      return (
        <>
          <h2 className="font-bold mb-2">Cadastro de Conexão</h2>
          <form className="mb-4 flex gap-2 flex-wrap items-end" onSubmit={handleCadastro}>
            <select
              className="border rounded px-2 py-1"
              name="ponto_origem_id"
              value={form.ponto_origem_id || ''}
              onChange={handleFormChange}
              required
            >
              <option value="">Origem</option>
              {pontos.map(p => (
                <option key={p.id_ponto} value={p.id_ponto}>{p.nome}</option>
              ))}
            </select>
            <select
              className="border rounded px-2 py-1"
              name="ponto_destino_id"
              value={form.ponto_destino_id || ''}
              onChange={handleFormChange}
              required
            >
              <option value="">Destino</option>
              {pontos.map(p => (
                <option key={p.id_ponto} value={p.id_ponto}>{p.nome}</option>
              ))}
            </select>
            <input
              className="border rounded px-2 py-1"
              name="peso"
              type="number"
              placeholder="Peso"
              value={form.peso || ''}
              onChange={handleFormChange}
              required
            />
            <button style={{ background: VERDE }} className="text-white rounded px-3" type="submit" disabled={loading}>Salvar</button>
          </form>
          <h3 className="font-semibold mb-1">Lista de Conexões</h3>
          <table className="w-full bg-white rounded shadow mb-6">
            <thead>
              <tr className='text-left'>
                <th className="px-2 py-1">ID</th>
                <th className="px-2 py-1">Origem</th>
                <th className="px-2 py-1">Destino</th>
                <th className="px-2 py-1">Peso</th>
                <th className="px-2 py-1">Ações</th>
              </tr>
            </thead>
            <tbody>
              {conexoes.map(conn => (
                <tr key={conn.id_conexao}>
                  <td className="px-2 py-1">{conn.id_conexao}</td>
                  <td className="px-2 py-1">{pontos.find(p => p.id_ponto === conn.ponto_origem_id)?.nome || conn.ponto_origem_id}</td>
                  <td className="px-2 py-1">{pontos.find(p => p.id_ponto === conn.ponto_destino_id)?.nome || conn.ponto_destino_id}</td>
                  <td className="px-2 py-1">{conn.peso}</td>
                  <td className="px-2 py-1">
                    <button
                      style={{ color: VERDE }}
                      className="px-2 py-1 rounded hover:bg-green-50"
                      onClick={() => handleDelete('conexoes', conn.id_conexao)}
                      disabled={loading}
                    >Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }

    return null;
  }

  return (
    <main className="bg-[#E8EEF2] h-full min-h-screen w-full">
      <NavBar />
      <div className='mx-20 mt-5'>
        <h1 className='font-bold text-xl mb-4'>CRUD do Sistema</h1>
        <div className="flex gap-3 mb-6">
          {TABS.map(tab => (
            <button
              key={tab.key}
              style={activeTab === tab.key
                ? { background: VERDE, color: "white" }
                : { background: "white", color: VERDE, border: `1px solid ${VERDE}` }}
              className={`px-4 py-2 font-semibold rounded`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-4 bg-gray-100 rounded shadow">
          {loading ? <div>Carregando...</div> : renderTableAndForm()}
        </div>
      </div>
    </main>
  );
}
