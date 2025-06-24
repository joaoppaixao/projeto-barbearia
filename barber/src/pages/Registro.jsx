import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/Registro.css';

const Registro = () => {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    tipo: 'cliente', // novo campo
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.nome || !form.email || !form.senha || !form.tipo) {
    return alert("Preencha todos os campos.");
  }

  if (!form.email.includes('@')) {
    return alert("Email inválido.");
  }

  if (form.senha.length < 6) {
    return alert("A senha deve ter no mínimo 6 caracteres.");
  }

  setLoading(true);

  try {
    const { data: usuariosExistentes } = await api.get(`/usuarios?email=${form.email}`);
    
    if (usuariosExistentes.length > 0) {
      alert("Este e-mail já está em uso. Tente outro.");
      setLoading(false);
      return;
    }

    await api.post('/usuarios', form);
    alert("Usuário cadastrado com sucesso!");
    setForm({
      nome: '',
      email: '',
      senha: '',
      telefone: '',
      tipo: 'cliente'
    });
    navigate('/');
  } catch (error) {
    alert("Erro ao cadastrar. Tente novamente.");
    console.error(error);
  }

  setLoading(false);
};

  return (
    <div className="registro-container">
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={form.telefone}
          onChange={handleChange}
          maxLength="11"
          required
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
          required
        />
        <select name="tipo" value={form.tipo} onChange={handleChange} required>
          <option value="cliente">Cliente</option>
          <option value="barbeiro">Barbeiro</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
};

export default Registro;
