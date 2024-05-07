import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./images/logo1.png";
import Cookies from "js-cookie";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function loginUser(credentials) {
    try {
      if (!credentials.username && !credentials.password) {
        throw new Error("Error: Credentials missing.");
      }
      const response = await fetch("https://51.21.149.50:443/login/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      const token = data.token;
      Cookies.set("token", token, { expires: 1 });
      console.log("Login response:", credentials);
      if (!response.ok) {
        throw new Error("Login failed");
      }
      console.log("Login successful:", credentials);
      navigate("/MyProfile");
    } catch (error) {
      setErrorMessage(error.message);
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
      <h1 className="text-white font-bold text-md">Log In</h1>
      <form className="form" onSubmit={handleLogin}>
        <input
          className="input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button className="button" type="submit">
          Sign in
        </button>
      </form>
      {loginError && <h3 className="failed">{errorMessage}</h3>}

      {loginError && (
        <p className="text-white text-md">
          <Link
            to="/recover"
            className="link"
            style={{ color: "deepskyblue", textDecoration: "none" }}
          >
            Did you forget your credentials?
          </Link>
        </p>
      )}
      <p className="text-white text-md">
        Not Member?{"    "}
        <Link
          to="/register"
          className="link"
          style={{ color: "deepskyblue", textDecoration: "none" }}
        >
          Register.
        </Link>
      </p>
    </div>
  );
}

export default Login;
