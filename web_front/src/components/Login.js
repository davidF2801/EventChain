
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Registro from './Registro.js';
import './Login.css'; // Importar los estilos CSS
import { useNavigate } from 'react-router-dom';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false); // Declarar loginError y setLoginError
  const [login, setLogin] = useState(false); // Declarar loginError y setLoginError

  const navigate = useNavigate();


  const handleLogin = () => {
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');

    if (username === savedUsername && password === savedPassword) {
      setLogin(true); // Cambia el estado para mostrar el mensaje de error
      setLoginError(false); // Cambia el estado para mostrar el mensaje de error

      setTimeout(() => {
        navigate('/');
      }, 200);

    } else {
      setLoginError(true); // Cambia el estado para mostrar el mensaje de error
      setUsername('');
      setPassword('');

    }
  };
  return (
    <div className="container">
      {!loginError && !login && <h2 className="heading">Iniciar Sesión</h2>} { }
      {loginError && <h2 className="failed">Fallo inicio de sesión</h2>} { }
      {login && <h2 className="loginn">Inicio de sesión con exito</h2>} { }
      {!login &&
        <form className="form">
          <input className="input" type="text" placeholder="Usuario" value={username}
            onChange={(e) => setUsername(e.target.value)} /><br />
          <input className="input" type="password" placeholder="Contraseña" value={password}
            onChange={(e) => setPassword(e.target.value)} /><br />
          <button className="button" type="button" onClick={handleLogin}>Iniciar Sesión</button>
        </form>
      } { }


      {loginError && <p className="text"><Link to="/recover" className="link">Deseas restaurar la contraseña?</Link></p>} { }

      {!login &&
        <p className="text">¿No tienes una cuenta? <Link to="/registro" className="link">Crear cuenta</Link></p>} { }



      <footer>
        <p>© 2024 Iyoudo. Todos los derechos reservados.</p>
      </footer>



    </div>
  );
}

export default Login;
