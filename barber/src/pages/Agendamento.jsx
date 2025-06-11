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
    const gerarHorarios = () => {
      const horarios = [];
      for (let h = 8; h < 20; h++) {
        horarios.push(`${h.toString().padStart(2, '0')}:00`);
        horarios.push(`${h.toString().padStart(2, '0')}:30`);
      }
      horarios.push("20:00");
      return horarios;
    };

    const buscarHorariosDisponiveis = async () => {
      if (!barbeiroSelecionado || !dataSelecionada) {
        setHorariosDisponiveis([]);
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/agendamentos');
        const agendamentos = await response.json();

        const ocupados = agendamentos
          .filter(ag =>
            ag.barbeiroId === barbeiroSelecionado &&
            ag.dataHora.startsWith(dataSelecionada)
          )
          .map(ag => ag.dataHora.split('T')[1]);

        const todosHorarios = gerarHorarios();
        const disponiveis = todosHorarios.filter(h => !ocupados.includes(h));
        setHorariosDisponiveis(disponiveis);
      } catch (error) {
        console.error('Erro ao carregar horários:', error);
        setHorariosDisponiveis([]);
      }
    };

    buscarHorariosDisponiveis();
  }, [barbeiroSelecionado, dataSelecionada]);

  const handleAgendar = async () => {
    const usuarioId = localStorage.getItem('usuarioId');
    console.log('🔍 ID do cliente:', usuarioId);

    if (!barbeiroSelecionado || !servicoSelecionado || !dataSelecionada || !horaSelecionada) {
      alert('Preencha todos os campos!');
      return;
    }

    if (!usuarioId) {
      alert('Erro: ID do cliente não encontrado. Faça login novamente.');
      return;
    }

    const novoAgendamento = {
      idCliente: usuarioId,
      barbeiroId: barbeiroSelecionado,
      servicoId: servicoSelecionado,
      dataHora: `${dataSelecionada}T${horaSelecionada}`
    };

    console.log('📦 Enviando agendamento:', novoAgendamento);

    try {
      const res = await fetch('http://localhost:3001/agendamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoAgendamento)
      });

      if (!res.ok) throw new Error(`Erro ${res.status} ao salvar`);

      const data = await res.json();
      console.log('✅ Agendamento salvo:', data);

      alert('Agendamento realizado com sucesso!');
      navigate('/home');
    } catch (err) {
      console.error('❌ Erro ao agendar:', err);
      alert('Erro ao salvar agendamento. Veja o console.');
    }
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
      <input
        type="date"
        value={dataSelecionada}
        min={new Date().toISOString().split('T')[0]} // impede datas passadas
        onChange={(e) => setDataSelecionada(e.target.value)}
      />

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
