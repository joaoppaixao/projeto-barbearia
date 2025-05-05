import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Agendamento.css';

const AgendamentoCliente = () => {
  return (
    <div className="main-container">
      <div className="nav-bar">
        <Link to="/">Login</Link>
        <Link to="/home">Home</Link>
        <Link to="/agendamento">Fazer agendamento</Link>
        <Link to="/dash">Dashboard</Link>
      </div>

      <h1>Selecione o Barbeiro</h1>
      <div className="barber-container">
        <div className="barber">
          <Link to="/servico" className="barbeiro">barbeiro 1</Link>
          <Link to="/servico" className="barbeiro">barbeiro 2</Link>
          <Link to="/servico" className="barbeiro">barbeiro 3</Link>
        </div>
      </div>
    </div>
  );
};

export default AgendamentoCliente;