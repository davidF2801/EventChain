import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  async function loginUser(credentials) {
    try {
      const response = await fetch("http://localhost:8888/login/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      console.log("Login response:", credentials);
      if (!response.ok) {
        throw new Error("Login failed");
      }
      console.log("Login successful:", credentials);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setLoginError(true);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginUser({
      username,
      password,
    });
  };

  return (
    <div className="container gradient-custom">
      {!loginError && (
        <h2 className="text-white font-bold text-md">Iniciar Sesión</h2>
      )}
      {loginError && (
        <h2 className="text-white font-bold text-md">Fallo inicio de sesión</h2>
      )}
      <form className="form" onSubmit={handleLogin}>
        <input
          className="input"
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          className="input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button className="button" type="submit">
          Iniciar Sesión
        </button>
      </form>

      {loginError && (
        <p className="text-white text-md">
          <Link to="/recover" className="link">
            ¿Deseas restaurar la contraseña?
          </Link>
        </p>
      )}
      <p className="text-white text-md">
        ¿No tienes una cuenta?{" "}
        <Link to="/registro" className="link">
          Crear cuenta
        </Link>
      </p>
    </div>
  );
}

export default Login;
