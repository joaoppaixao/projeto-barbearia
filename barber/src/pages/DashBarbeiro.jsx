import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DashBarbeiro.css';

const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

const DashBarbeiro = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [servicos, setServicos] = useState([]);
  const barbeiroId = localStorage.getItem('usuarioId');

  useEffect(() => {
    const carregarDados = async () => {
      const [agRes, cliRes, servRes] = await Promise.all([
        fetch('http://localhost:3001/agendamentos').then(res => res.json()),
        fetch('http://localhost:3001/usuarios').then(res => res.json()),
        fetch('http://localhost:3001/servicos').then(res => res.json()),
      ]);

      const agDoBarbeiro = agRes.filter(ag => ag.barbeiroId === barbeiroId);
      setAgendamentos(agDoBarbeiro);
      setClientes(cliRes);
      setServicos(servRes);
    };

    carregarDados();
  }, [barbeiroId]);

  const obterNomeCliente = (id) => {
    const cliente = clientes.find(c => c.id === id);
    return cliente ? cliente.nome : 'Desconhecido';
  };

  const obterNomeServico = (id) => {
    const servico = servicos.find(s => s.id === id);
    return servico ? servico.nome : 'Serviço desconhecido';
  };

  const concluirAgendamento = async (id) => {
    if (!window.confirm('Marcar como concluído? Isso removerá o agendamento.')) return;
    try {
      await fetch(`http://localhost:3001/agendamentos/${id}`, {
        method: 'DELETE',
      });
      setAgendamentos(prev => prev.filter(ag => ag.id !== id));
    } catch (err) {
      console.error('Erro ao concluir:', err);
      alert('Erro ao concluir agendamento.');
    }
  };

  const cancelarAgendamento = async (id) => {
    if (!window.confirm('Deseja cancelar este agendamento?')) return;
    try {
      await fetch(`http://localhost:3001/agendamentos/${id}`, {
        method: 'DELETE',
      });
      setAgendamentos(prev => prev.filter(ag => ag.id !== id));
    } catch (err) {
      console.error('Erro ao cancelar:', err);
      alert('Erro ao cancelar agendamento.');
    }
  };

  const agendamentosPorDia = diasSemana.reduce((acc, dia) => {
    acc[dia] = [];
    return acc;
  }, {});

  agendamentos.forEach((ag) => {
    const date = new Date(ag.dataHora);
    const diaSemana = diasSemana[date.getDay() - 1];
    if (diaSemana) {
      agendamentosPorDia[diaSemana].push(ag);
    }
  });

  return (
    <div className="main-container">
      <div className="nav-bar">
        <Link to="/">Login</Link>
        <Link to="/home">Home</Link>
        <Link to="/agendamento">Fazer agendamento</Link>
        <Link to="/dash">Agendamentos</Link>
      </div>

      <h1>Agendamentos da Semana</h1>

      <div className="semana-grid">
        {diasSemana.map((dia) => (
          <div key={dia} className="coluna-dia">
            <h2>{dia}</h2>
            {agendamentosPorDia[dia].length === 0 ? (
              <p className="sem-agendamentos">Nenhum</p>
            ) : (
              agendamentosPorDia[dia].map((ag) => (
                <div key={ag.id} className="agendamento-card">
                  <p><strong>Cliente:</strong> {obterNomeCliente(ag.idCliente)}</p>
                  <p><strong>Serviço:</strong> {obterNomeServico(ag.servicoId)}</p>
                  <p><strong>Hora:</strong> {ag.dataHora.split('T')[1]}</p>

                  <div className="botoes-status">
                    <button onClick={() => concluirAgendamento(ag.id)} title="Concluir" className="btn-concluir">✅</button>
                    <button onClick={() => cancelarAgendamento(ag.id)} title="Cancelar" className="btn-cancelar">🗑️</button>
                  </div>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashBarbeiro;
