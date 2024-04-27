import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./images/logo1.png";

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
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img class="w-8 h-8 mr-2" src={logo} alt="logo" />{" "}
      </a>

      {!loginError && <h1 className="text-white font-bold text-md">Sign In</h1>}
      {loginError && <h2 className="text-white font-bold text-md">Error</h2>}
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
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button className="button" type="submit">
          Sign in
        </button>
      </form>

      {loginError && (
        <p className="text-white text-md">
          <Link to="/recover" className="link">
            Forget password?
          </Link>
        </p>
      )}
      <p className="text-white text-md">
        Not Member?{" "}
        <Link to="/register" className="link">
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;
