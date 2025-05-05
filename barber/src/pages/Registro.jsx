// src/pages/Registro.jsx
import React, { useState } from 'react';
import api from '../services/api';
import '../styles/Registro.css';


const Registro = () => {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nome || !form.email || !form.senha) {
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
      await api.post('/usuarios', form);
      alert("Usuário cadastrado com sucesso!");
      setForm({ nome: '', email: '', senha: '' }); 
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
          type="password"
          name="senha"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Registro;
