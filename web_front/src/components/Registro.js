import './Registro.css'; // Importar los estilos CSS
import React, { useState } from 'react';
import Login from './Login';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const [username, setUsername] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [mail, setMail] = useState('');
  const [registro, setRegistro] = useState(false); // Declarar loginError y setLoginError
  const [errorregistro, setErrorRegistro] = useState(false); // Declarar loginError y setLoginError

  const navigate = useNavigate();

  const soloNumeros = (e) => {
    const inputValue = e.target.value;
    const regex = /^[0-9]*$/;
    if (!regex.test(inputValue)) {
      setPhone('');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault(); // Evitar el envío del formulario por defecto

    // Validar que todos los campos estén llenos
    if (!username || !surname || !password || !phone || !mail) {
      setErrorRegistro(true);
      return;
    }
    localStorage.setItem('username', username);
    localStorage.setItem('surName', surname);
    localStorage.setItem('password', password);
    localStorage.setItem('phone', phone);
    localStorage.setItem('mail', mail);

    setRegistro(true);
    setErrorRegistro(false);
    setUsername('');
    setSurname('');
    setPassword('');
    setPhone('');
    setMail('');

    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="container">
      {!registro && <h2 className="heading">Registro</h2>}
      {errorregistro && <h3 className="failed">Complete todos los campos.</h3>}
      {registro && <h2 className="registro">Registro con éxito</h2>}
      {!registro && (
        <form className="form">
          <div className="form-group">
            <input
              className="input"
              type="text"
              placeholder="Nombre"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="input"
              type="text"
              placeholder="Apellidos"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="input"
              type="text"
              placeholder="Correo"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="input"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={soloNumeros}
            />
          </div>
          <div className="form-group">
            <input
              className="input"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="button" type="submit" onClick={handleRegister}>
            Registro
          </button>
        </form>
      )}
    </div>
  );
}

export default Registro;