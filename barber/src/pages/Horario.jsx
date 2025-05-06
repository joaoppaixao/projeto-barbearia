import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Horario.css';

const dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const horarios = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00'
];

const Horario = () => {
  return (
    <div className="main-container">
      <div className="nav-bar">
        <Link to="/">Login</Link>
        <Link to="/home">Home</Link>
        <Link to="/agendamento">Fazer agendamento</Link>
        <Link to="/dash">Dashboard</Link>
      </div>

      <h1>Selecione o Dia e Horário</h1>

      <div className="container">
        <div className="dia">
          {dias.map((dia, index) => (
            <div key={index} className="opcao">
              {dia}
              <div className="hora">
                {horarios.map((hora, i) => (
                  <div key={i} className="opcao">
                    {hora}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Horario;
