// src/pages/DashBarbeiro.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/DashBarbeiro.css';

const agendamentos = [
  {
    dia: 'Segunda',
    clientes: [
      { nome: 'Matheus Consolim', link: '/info-cliente' },
      { nome: 'Cliente 2', link: '#' },
      { nome: 'Cliente 3', link: '#' },
    ],
  },
  {
    dia: 'Terça',
    clientes: [
      { nome: 'Cliente 1', link: '#' },
      { nome: 'Cliente 2', link: '#' },
      { nome: 'Cliente 3', link: '#' },
      { nome: 'Cliente 4', link: '#' },
    ],
  },
  {
    dia: 'Quarta',
    clientes: [
      { nome: 'Cliente 1', link: '#' },
      { nome: 'Cliente 2', link: '#' },
    ],
  },
  {
    dia: 'Quinta',
    clientes: [
      { nome: 'Cliente 1', link: '#' },
      { nome: 'Cliente 2', link: '#' },
      { nome: 'Cliente 3', link: '#' },
    ],
  },
  {
    dia: 'Sexta',
    clientes: [
      { nome: 'Cliente 1', link: '#' },
      { nome: 'Cliente 2', link: '#' },
      { nome: 'Cliente 3', link: '#' },
      { nome: 'Cliente 4', link: '#' },
      { nome: 'Cliente 5', link: '#' },
    ],
  },
  {
    dia: 'Sábado',
    clientes: [
      { nome: 'Cliente 1', link: '#' },
      { nome: 'Cliente 2', link: '#' },
      { nome: 'Cliente 3', link: '#' },
      { nome: 'Cliente 4', link: '#' },
    ],
  },
];

const DashBarbeiro = () => {
  return (
    <div className="main-container">
      <div className="nav-bar">
        <Link to="/">Login</Link>
        <Link to="/home">Home</Link>
        <Link to="/agendamento">Fazer agendamento</Link>
        <Link to="/dash">Dashboard</Link>
      </div>

      <h1>Agendamentos da semana</h1>

      <div className="dash-container">
        {agendamentos.map(({ dia, clientes }, index) => (
          <div className="notes-container" key={index}>
            <h2>{dia}</h2>
            <div className="notes">
              {clientes.map((cliente, i) => (
                <Link key={i} to={cliente.link} className="dash">
                  {cliente.nome}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashBarbeiro;
