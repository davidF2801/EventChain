import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  async function loginUser(credentials) {
    return fetch('http://localhost:8888/login', {  // make sure the port matches your backend server
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Login failed');
      }
      return response.json();
    })
    .then(data => {
      console.log('Login successful:', data);  // You can handle redirect or local storage updates here
      navigate('/');  // Navigate to the dashboard or home page
    })
    .catch(error => {
      console.error('Login error:', error);
      setLoginError(true);
    });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginUser({
      username,
      password
    });
  };

  return (
    <div className="container">
      {!loginError && <h2 className="heading">Iniciar Sesión</h2>}
      {loginError && <h2 className="failed">Fallo inicio de sesión</h2>}
      <form className="form" onSubmit={handleLogin}>
        <input className="input" type="text" placeholder="Usuario" value={username}
          onChange={(e) => setUsername(e.target.value)} /><br />
        <input className="input" type="password" placeholder="Contraseña" value={password}
          onChange={(e) => setPassword(e.target.value)} /><br />
        <button className="button" type="submit">Iniciar Sesión</button>
      </form>

      {loginError && <p className="text"><Link to="/recover" className="link">Deseas restaurar la contraseña?</Link></p>}
      <p className="text">¿No tienes una cuenta? <Link to="/registro" className="link">Crear cuenta</Link></p>

      <footer>
        <p>© 2024 Eventchain. Todos los derechos reservados.</p>
      </footer>
      
    </div>
  );
}

export default Login;
