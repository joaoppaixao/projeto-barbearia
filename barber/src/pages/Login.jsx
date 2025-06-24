import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; 

const Login = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('cliente'); 
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/usuarios')
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch((err) => console.error('Erro ao buscar usuários:', err));
  }, []);

  const handleLogin = () => {
    const usuarioEncontrado = usuarios.find(
      (usuario) =>
        usuario.email === email &&
        usuario.senha === senha &&
        usuario.tipo === tipo
    );

    if (usuarioEncontrado) {
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
      localStorage.setItem('usuarioId', usuarioEncontrado.id);
      localStorage.setItem('tipoUsuario', tipo); // opcional, pode usar em outras telas

      alert('Login bem-sucedido!');
      navigate('/home');
    } else {
      setErro('Email, senha ou tipo de usuário inválidos.');
      alert('Email, senha ou tipo de usuário inválidos.');
    }
  };

  return (
    <div className="Login">
      <h2>Login</h2>
      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="cliente">Cliente</option>
        <option value="barbeiro">Barbeiro</option>
      </select>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
      <a id="registro" href="/Registro">Não tem uma conta? Cadastre-se</a>
    </div>
  );
};

export default Login;
