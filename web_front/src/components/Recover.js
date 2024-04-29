import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./images/logo1.png";

function Recover() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRecover = () => {
    // Validación del campo de correo electrónico
    if (!email || !validateEmail(email)) {
      setError("Email not valid");
      return;
    }

    // Aquí iría la lógica para enviar el correo de recuperación
    // Puedes agregar la lógica necesaria para enviar el correo de recuperación

    // Simulación de éxito
    setSuccess(true);

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  // Función para validar el formato de correo electrónico
  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  return (
    <div className="container gradient-custom">
      <h2 className="text-white font-bold text-md">Recover your account</h2>
      {error && <h3 className="failed">{error}</h3>}
      {success && <h2 className="loginn">Confirmation email sent</h2>}
      {!success && (
        <form className="form">
          <input
            className="input"
            type="text"
            placeholder="Put your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <button className="button" type="button" onClick={handleRecover}>
            Send
          </button>
        </form>
      )}
    </div>
  );
}

export default Recover;
