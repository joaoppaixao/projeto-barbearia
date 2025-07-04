import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DashBarbeiro.css';

const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

const API_URL = process.env.REACT_APP_API_URL;

const DashBarbeiro = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [servicos, setServicos] = useState([]);
  const barbeiroId = localStorage.getItem('usuarioId');

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [agRes, cliRes, servRes] = await Promise.all([
          fetch(`${API_URL}/agendamentos`).then(res => res.json()),
          fetch(`${API_URL}/usuarios`).then(res => res.json()),
          fetch(`${API_URL}/servicos`).then(res => res.json()),
        ]);

        const agDoBarbeiro = agRes.filter(ag => ag.barbeiroId === barbeiroId);
        setAgendamentos(agDoBarbeiro);
        setClientes(cliRes);
        setServicos(servRes);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
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
      await fetch(`${API_URL}/agendamentos/${id}`, {
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
      await fetch(`${API_URL}/agendamentos/${id}`, {
        method: 'DELETE',
      });
      setAgendamentos(prev => prev.filter(ag => ag.id !== id));
    } catch (err) {
      console.error('Erro ao cancelar:', err);
      alert('Erro ao cancelar agendamento.');
    }
  };

  // Inicializa o objeto com arrays para cada dia da semana
  const agendamentosPorDia = diasSemana.reduce((acc, dia) => {
    acc[dia] = [];
    return acc;
  }, {});

  agendamentos.forEach((ag) => {
    const date = new Date(ag.dataHora);
    const diaSemanaIndex = date.getDay(); // 0=Domingo, 1=Segunda ...
    // Ajusta para nosso array que começa na segunda-feira (índice 0)
    // Ignora domingo (0) pois não está listado
    if (diaSemanaIndex >= 1 && diaSemanaIndex <= 6) {
      const diaSemana = diasSemana[diaSemanaIndex - 1];
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
