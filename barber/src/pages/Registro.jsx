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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/usuarios', form); 
      alert('Usuário cadastrado com sucesso!');
      setForm({ nome: '', email: '', senha: '' });
    } catch (error) {
      alert('Erro ao cadastrar usuário.');
      console.error(error);
    }
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
