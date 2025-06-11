import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; 


const Login = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
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
      (usuario) => usuario.email === email && usuario.senha === senha
    );
  
    if (usuarioEncontrado) {
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
      alert('Login bem-sucedido!');
      localStorage.setItem('usuarioId', usuarioEncontrado.id);
      navigate('/home');
    } else {
      setErro('Email ou senha inválidos.');
      alert('Email ou senha inválidos.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
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