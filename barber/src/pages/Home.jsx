import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="main-container">
      <div className="nav-bar">
        <Link to="/">Login</Link>
        <Link to="/home">Home</Link>
        <Link to="/agendamento">Fazer agendamento</Link>
        <Link to="/dash">Dashboard</Link>
      </div>

      <div className="main-content">
        <h1>Bem-vindo ao Barbers Club!</h1>
        <p>O app perfeito para você fazer seus agendamentos.</p>
        <p className="mark">Utilize a navbar para navegar pelo nosso app!</p>
      </div>
    </div>
  );
};

export default Home;
