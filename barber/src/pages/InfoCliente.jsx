import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/InfoCliente.css';

const InfoCliente = () => {
  return (
    <div className="main-container">
      <div className="nav-bar">
        <Link to="/">Login</Link>
        <Link to="/home">Home</Link>
        <Link to="/agendamento">Fazer agendamento</Link>

      </div>

      <div className="info-container">
        <div className="info">
          <h1>Informações do agendamento</h1>
          <p><span>Nome:</span> Matheus Consolim</p>
          <p><span>Serviço:</span> Corte e Barba</p>
          <p><span>Horário:</span> 10:30</p>

          <Link to="/dashboard">
            <button>Voltar</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InfoCliente;
