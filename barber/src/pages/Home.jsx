import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');

  useEffect(() => {
    const usuario = localStorage.getItem('usuarioLogado');
    if (usuario) {
      const usuarioObj = JSON.parse(usuario);
      setNomeUsuario(usuarioObj.nome);
      setTipoUsuario(usuarioObj.tipo);
    }
  }, []);

  return (
    <>
      <div className="nav-bar">
        <Link to="/">Login</Link>
        <Link to="/home">Home</Link>
        <Link to="/agendamento">Fazer agendamento</Link>
        {tipoUsuario === 'barbeiro' && <Link to="/dash">Agendamentos</Link>}
      </div>

      <div className="main-container">
        <div className="main-content">
          <h1>Bem-vindo, {nomeUsuario}!</h1>
          {tipoUsuario === 'cliente' && <p>O app perfeito para você realizar seus agendamentos.</p>}
          {tipoUsuario === 'barbeiro' && <p>O app perfeito para você administrar seus negócios.</p>}
          <p className="mark">Utilize a navbar para navegar pelo nosso app!</p>
        </div>
      </div>
    </>
  );
};

export default Home;
