// src/pages/Servico.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Servico.css'; // ajuste o caminho se necessário

const Servico = () => {
  return (
    <div className="main-container">
      <div className="nav-bar">
        <Link to="/">Login</Link>
        <Link to="/home">Home</Link>
        <Link to="/agendamento">Fazer agendamento</Link>
      </div>

      <h1>Selecione o Serviço</h1>

      <div className="serv-container">
        <div className="serv">
          <Link to="/horario" className="servico">Corte</Link>
          <Link to="/horario" className="servico">Corte + Barba</Link>
          <Link to="/horario" className="servico">Barba</Link>
        </div>
      </div>
    </div>
  );
};

export default Servico;
