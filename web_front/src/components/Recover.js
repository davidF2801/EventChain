import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "./images/logo1.png";

function Recover() {
  const [username, setUsername] = useState("");
  const [loginError, setLoginError] = useState(false); // Declarar loginError y setLoginError
  const [login, setLogin] = useState(false); // Declarar loginError y setLoginError

  const navigate = useNavigate();

  const handleLogin = () => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (username === savedUsername) {
      setLogin(true); // Cambia el estado para mostrar el mensaje de error
      setLoginError(false); // Cambia el estado para mostrar el mensaje de error

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      setLoginError(true); // Cambia el estado para mostrar el mensaje de error
      setUsername("");
    }
  };
  return (
    <div className="container mx-auto">
      {!loginError && !login && (
        <h2 className="heading">Recover your account</h2>
      )}{" "}
      {}
      {loginError && <h2 className="failed">Error</h2>} {}
      {login && <h2 className="loginn">Confirmation email sent</h2>} {}
      {!login && (
        <form className="form">
          <input
            className="input"
            type="text"
            placeholder="Put you email address"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <button className="button" type="button" onClick={handleLogin}>
            Send
          </button>
        </form>
      )}{" "}
      {}
    </div>
  );
}

export default Recover;
