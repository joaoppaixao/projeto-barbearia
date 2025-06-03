import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Agendamento.css';

const AgendamentoCliente = () => {
  const [barbeiros, setBarbeiros] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState('');
  const [servicoSelecionado, setServicoSelecionado] = useState('');
  const [dataSelecionada, setDataSelecionada] = useState('');
  const [horaSelecionada, setHoraSelecionada] = useState('');
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/barbeiros')
      .then(res => res.json())
      .then(data => setBarbeiros(data));

    fetch('http://localhost:3001/servicos')
      .then(res => res.json())
      .then(data => setServicos(data));
  }, []);

  useEffect(() => {
    if (barbeiroSelecionado && dataSelecionada) {
      fetch('http://localhost:3001/horarios')
        .then(res => res.json())
        .then(data => {
          const disponiveis = data.filter(h => h.disponivel).map(h => h.id);
          setHorariosDisponiveis(disponiveis);
        });
    } else {
      setHorariosDisponiveis([]);
    }
  }, [barbeiroSelecionado, dataSelecionada]);

  const handleAgendar = () => {
    if (!barbeiroSelecionado || !servicoSelecionado || !dataSelecionada || !horaSelecionada) {
      alert('Preencha todos os campos!');
      return;
    }

    const novoAgendamento = {
      idCliente: localStorage.getItem('usuarioId'),
      barbeiroId: barbeiroSelecionado,
      servicoId: servicoSelecionado,
      dataHora: `${dataSelecionada}T${horaSelecionada}`
    };

    fetch('http://localhost:3001/agendamentos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoAgendamento)
    })
      .then(() => {
        return fetch(`http://localhost:3001/horarios/${horaSelecionada}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ disponivel: false })
        });
      })
      .then(() => {
        alert('Agendamento realizado com sucesso!');
        navigate('/home');
      })
      .catch(err => console.error('Erro ao agendar:', err));
  };

  return (
    <div className="main-container">
      <div className="nav-bar">
        <Link to="/">Login</Link>
        <Link to="/home">Home</Link>
        <Link to="/agendamento">Fazer agendamento</Link>

      </div>

      <h1>Fazer Agendamento</h1>

      <label>Barbeiro:</label>
      <select value={barbeiroSelecionado} onChange={(e) => setBarbeiroSelecionado(e.target.value)}>
        <option value="">Selecione</option>
        {barbeiros.map((b) => (
          <option key={b.id} value={b.id}>{b.nome}</option>
        ))}
      </select>

      <label>Serviço:</label>
      <select value={servicoSelecionado} onChange={(e) => setServicoSelecionado(e.target.value)}>
        <option value="">Selecione</option>
        {servicos.map((s) => (
          <option key={s.id} value={s.id}>{s.nome}</option>
        ))}
      </select>

      <label>Data:</label>
      <input type="date" value={dataSelecionada} onChange={(e) => setDataSelecionada(e.target.value)} />

      <label>Horário:</label>
      <select value={horaSelecionada} onChange={(e) => setHoraSelecionada(e.target.value)}>
        <option value="">Selecione</option>
        {horariosDisponiveis.length > 0 ? (
          horariosDisponiveis.map((h, i) => (
            <option key={i} value={h}>{h}</option>
          ))
        ) : (
          <option disabled>Nenhum horário disponível</option>
        )}
      </select>

      <button onClick={handleAgendar}>Agendar</button>
    </div>
  );
};

export default AgendamentoCliente;
