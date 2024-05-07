import "./Registro.css"; // Importar los estilos CSS
import React, { useState } from "react";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import logo from "./images/logo1.png";
import { SERVER_ADDRESS } from "../constants";
function Registro() {
  const [username, setUsername] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [mail, setMail] = useState("");
  const [registro, setRegistro] = useState(false); // Declarar loginError y setLoginError
  const [errorregistro, setErrorRegistro] = useState(false); // Declarar loginError y setLoginError
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [passwordShortError, setTooShortPassword] = useState(false);

  const navigate = useNavigate();

  const soloNumeros = (e) => {
    const inputValue = e.target.value;
    const regex = /^[0-9]*$/;
    if (!regex.test(inputValue)) {
      setPhone("");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMismatchError(true);
      return;
    }

    if (!username || !surname || !password || !phone || !mail) {
      setErrorRegistro(true);
      return;
    }

    if (password.length < 8) {
      setTooShortPassword(true);
      return;
    }

    // Object to be sent to the backend
    const userData = {
      username,
      email: mail,
      password,
      roles: [], // assuming roles or other necessary fields
      profilePictureUrl: "", // assuming a URL or handling files separately
    };

    fetch(`${SERVER_ADDRESS}/users/`, {
      // Adjust URL if needed
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setRegistro(true);
        setErrorRegistro(false);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorRegistro(true);
      });
  };

  return (
    <div className="container gradient-custom">
      {!registro && <h2 className="heading">Sign Up</h2>}
      {registro && <h2 className="registro">Sign Up successful</h2>}
      {errorregistro && <h3 className="failed">Complete all the fields</h3>}
      {passwordMismatchError && (
        <h3 className="failed">Passwords do not match</h3>
      )}
      {passwordShortError && (
        <h3 className="failed">
          Password has to be at least 8 characters long
        </h3>
      )}
      {!registro && (
        <form className="form">
          <div className="form-group">
            <input
              className="input"
              type="text"
              placeholder="Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="input"
              type="text"
              placeholder="Surnames"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="input"
              type="text"
              placeholder="Email Address"
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
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={soloNumeros}
            />
          </div>
          <div className="form-group">
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="input"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button className="button" type="submit" onClick={handleRegister}>
            Register
          </button>
        </form>
      )}
    </div>
  );
}

export default Registro;
