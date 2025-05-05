import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="Login">
      <h2>Login</h2>
      <input type="text" name="Username" placeholder="Usuário" required />
      <input type="password" name="Password" placeholder="Senha" required />
      <button className="button" onClick={() => navigate('/home')}>
        Entrar
      </button>
    </div>
  );
};
export default Login;