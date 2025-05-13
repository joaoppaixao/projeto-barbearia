import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const [nomeUsuario, setNomeUsuario] = useState('');

useEffect(() => {
  const usuario = localStorage.getItem('usuarioLogado');
  if (usuario) {
    const usuarioObj = JSON.parse(usuario);
    setNomeUsuario(usuarioObj.nome);
  }
}, []);

  return (
    <>
    <div className="nav-bar">
        <Link to="/">Login</Link>
        <Link to="/home">Home</Link>
        <Link to="/agendamento">Fazer agendamento</Link>
        <Link to="/dash">Dashboard</Link>
      </div>

    <div className="main-container">
      <div className="main-content">
        <h1>Bem-vindo, {nomeUsuario}!</h1>
        <p>O app perfeito para você fazer seus agendamentos.</p>
        <p className="mark">Utilize a navbar para navegar pelo nosso app!</p>
      </div>
    </div>
    </>
  );
};

export default Home;