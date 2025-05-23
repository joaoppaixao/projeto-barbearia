import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Agendamento from './pages/Agendamento';
import DashBarbeiro from './pages/DashBarbeiro';

import Horario from './pages/Horario';
import InfoCliente from './pages/InfoCliente';
import Servico from './pages/Servico';
import Registro from './pages/Registro';
import Home from './pages/Home';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dash" element={<DashBarbeiro />} />
        <Route path="/agendamento" element={<Agendamento />} />
        <Route path="/infoCliente" element={<InfoCliente />} />
        <Route path="/horario" element={<Horario />} />
        <Route path="/servico" element={<Servico />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;