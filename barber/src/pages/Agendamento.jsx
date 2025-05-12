import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Agendamento.css';

const AgendamentoCliente = () => {
  const [barbeiros, setBarbeiros] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState('');
  const [servicoSelecionado, setServicoSelecionado] = useState('');
  const [dataHora, setDataHora] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/barbeiros')
      .then(res => res.json())
      .then(setBarbeiros);

    fetch('http://localhost:3001/servicos')
      .then(res => res.json())
      .then(setServicos);
  }, []);

  const handleAgendamento = async () => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (!usuario || !barbeiroSelecionado || !servicoSelecionado || !dataHora) {
      alert('Preencha todos os campos.');
      return;
    }

    const agendamento = {
      idCliente: usuario.id,
      nomeCliente: usuario.nome,
      barbeiroId: barbeiroSelecionado,
      servicoId: servicoSelecionado,
      dataHora
    };

    const res = await fetch('http://localhost:3001/agendamentos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(agendamento)
    });

    if (res.ok) {
      alert('Agendamento realizado!');
      navigate('/dash');
    } else {
      alert('Erro ao agendar.');
    }
  };

  return (
    <div className="main-container">
      <div className="nav-bar">
        <Link to="/">Login</Link>
        <Link to="/home">Home</Link>
        <Link to="/agendamento">Fazer agendamento</Link>
        <Link to="/dash">Dashboard</Link>
      </div>

      <h1>Agende seu horário</h1>

      <div className="form-agendamento">
        <label>Barbeiro:</label>
        <select value={barbeiroSelecionado} onChange={(e) => setBarbeiroSelecionado(e.target.value)}>
          <option value="">Selecione</option>
          {barbeiros.map(b => (
            <option key={b.id} value={b.id}>{b.nome}</option>
          ))}
        </select>

        <label>Serviço:</label>
        <select value={servicoSelecionado} onChange={(e) => setServicoSelecionado(e.target.value)}>
          <option value="">Selecione</option>
          {servicos.map(s => (
            <option key={s.id} value={s.id}>{s.nome} - R${s.preco}</option>
          ))}
        </select>

        <label>Data e hora:</label>
        <input
          type="datetime-local"
          value={dataHora}
          onChange={(e) => setDataHora(e.target.value)}
        />

        <button onClick={handleAgendamento}>Confirmar</button>
      </div>
    </div>
  );
};

export default AgendamentoCliente;
