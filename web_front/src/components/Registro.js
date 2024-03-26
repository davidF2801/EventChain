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
  const [file, setFile] = useState(null); // Estado para almacenar el archivo seleccionado
  const [imagen, setImagen] = useState(null); // Estado para almacenar el archivo seleccionado
  const [role, setRole] = useState('Seleccionar'); // Estado para almacenar el rol seleccionado

  const [registro, setRegistro] = useState(false); // Declarar loginError y setLoginError
  const [errorregistro, setErrorRegistro] = useState(false); // Declarar loginError y setLoginError


  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  const handleImageChange = (e) => {

    const selectedFile = e.target.files[0];
    setImagen(selectedFile);

  };

  const soloNumeros = (e) => {
    const inputValue = e.target.value;
    const regex = /^[0-9]*$/;
    if (!regex.test(inputValue)) {
      setPhone('');
      // e.preventDefault();
    }
  };


  const handleRegister = (e) => {
    e.preventDefault(); // Evitar el envío del formulario por defecto

    // Validar que todos los campos estén llenos
    if (!username || !surname || !password || !phone || !mail || !file || !imagen || role === 'Seleccionar') {
      //  alert('Por favor, completa todos los campos y selecciona un rol.');
      setErrorRegistro(true);

      return;
    }
    localStorage.setItem('username', username);
    localStorage.setItem('surName', surname);
    localStorage.setItem('password', password);
    localStorage.setItem('phone', phone);
    localStorage.setItem('mail', mail);
    localStorage.setItem('role', role);

    //localStorage.setItem('file',file);
    setRegistro(true);
    setErrorRegistro(false);
    setUsername('');
    setSurname('');
    setPassword('');
    setPhone('');
    setMail('');
    setFile(null); // Limpiar el archivo seleccionado
    setImagen(null); // Limpiar el archivo seleccionado

    setTimeout(() => {
      navigate('/login');
    }, 1500);



  };

  return (
    <div className="container">
      {!registro && <h2 className="heading">Registro</h2>} { }
      {errorregistro && <h3 className="failed">Complete todos los campos y seleccione un rol.</h3>} { }

      {registro && <h2 className="registro">Registro con exito</h2>} { }
      {!registro &&
        <form className="form">
          <div className="form-group">
            <input className="input" type="text" placeholder="Nombre" value={username}
              onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="form-group">
            <input className="input" type="text" placeholder="Apellidos" value={surname}
              onChange={(e) => setSurname(e.target.value)} />
          </div>
          <div className="form-group">
            <input className="input" type="text" placeholder="Correo" value={mail}
              onChange={(e) => setMail(e.target.value)} />
          </div>
          <div className="form-group">
            <input className="input" type="text" inputMode="numeric" pattern="[0-9]*" placeholder="Teléfono" value={phone}
              onChange={(e) => setPhone(e.target.value)} onKeyDown={soloNumeros} />
          </div>
          <div className="form-group">
            <input className="input" type="password" placeholder="Contraseña" value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="form-group">
            <p>Selecciona tu rol:</p>
            <select id="role" className="input" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="Seleccionar">Seleccionar</option>
              <option value="Voluntario">Voluntario</option>
              <option value="Solicitante">Solicitante</option>
            </select>
          </div>

          <p>Inserta tu DNI y tu foto</p>
          <div className="form-group">
            <div className="upload-btn-wrapper">
              <button className="btn">Seleccionar Documento</button>
              <input
                className="input"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
              />
            </div>

            <div className="upload-btn-wrapper">
              <button className="btn">Seleccionar Imagen</button>
              <input
                className="input"
                type="file"
                accept=".jpg"
                onChange={handleImageChange}
              />
            </div>
          </div>



          <button className="button" type="submit" onClick={handleRegister} >Registro</button>
        </form>
      } { }

    </div>
  );
}

export default Registro;
