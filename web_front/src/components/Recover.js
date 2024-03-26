import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Importar los estilos CSS
import { useNavigate } from 'react-router-dom';

function Recover() {

  const [username, setUsername] = useState('');
  const [loginError, setLoginError] = useState(false); // Declarar loginError y setLoginError
  const [login, setLogin] = useState(false); // Declarar loginError y setLoginError

  const navigate = useNavigate();


  const handleLogin = () => {
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');

    if (username === savedUsername) {
      setLogin(true); // Cambia el estado para mostrar el mensaje de error
      setLoginError(false); // Cambia el estado para mostrar el mensaje de error

      setTimeout(() => {
        navigate('/');
      }, 1500);

    } else {
      setLoginError(true); // Cambia el estado para mostrar el mensaje de error
      setUsername('');

    }
  };
  return (
    <div className="container">
      {!loginError && !login && <h2 className="heading">Recuperar contraseña</h2>} { }
      {loginError && <h2 className="failed">Usuario no dado de alta</h2>} { }
      {login && <h2 className="loginn">Correo enviado con exito</h2>} { }
      {!login &&
        <form className="form">
          <input className="input" type="text" placeholder="Correo" value={username}
            onChange={(e) => setUsername(e.target.value)} /><br />
          <button className="button" type="button" onClick={handleLogin}>Recuperar contraseña</button>
        </form>
      } { }




    </div>
  );
}

export default Recover;