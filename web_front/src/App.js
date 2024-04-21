import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import About from "./components/About.js";
import Login from "./components/Login";
import Registro from "./components/Registro.js";
import Recover from "./components/Recover.js";
import Image from "./components/images/mcloving.jpg";
import Deportes from "./components/Deportes.js";
import Teatro from "./components/Teatro.js";
import Musica from "./components/Musica.js";
import Festivales from "./components/Festivales.js";
import Auth from "./components/Auth.js";
import buyTicket from "./components/buyTicket.js";
import LoggedIn from "./components/LoggedIn"; // Importa el componente LoggedIn
import NewEvent from "./components/Events/NewEvent.js";
import OldEvents from "./components/Events/OldEvents.js";
import "./App.css";

import TronWeb from "tronweb";

const mainOptions = {
  fullNode: "http://127.0.0.1:9090/",
  solidityNode: "http://127.0.0.1:9090/",
  eventServer: "http://127.0.0.1:9090/",
};

const privateKey = "";

function App() {
  useEffect(() => {
    window.tronWeb = new TronWeb(
      mainOptions.fullNode,
      mainOptions.solidityNode,
      mainOptions.eventServer,
      privateKey
    );
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="Header">
          <div className="Header-left">
            <Link to="/" className="Header-title">
              <img src={Image} className="Header-logo" alt="Logo" />
              EventChain
            </Link>
            <nav className="Navbar">
              <ul className="Navbar-links">
                <li>
                  <Link to="/musica">Música</Link>
                </li>
                <li>
                  <Link to="/teatro">Teatro</Link>
                </li>
                <li>
                  <Link to="/festivales">Festivales</Link>
                </li>
                <li>
                  <Link to="/deportes">Deportes</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="Header-right">
            <input type="text" placeholder="Buscar..." className="searchbox" />
            <Link to="/login" className="login-link">
              Login
            </Link>
            <Link to="/loggedIn" className="login-link">
              My Profile
            </Link>
            <Link to="/about" className="login-link">
              About
            </Link>
            <select className="language-selector">
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="de">Deutsch</option>
              <option value="zh">中文</option>
            </select>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/recover" element={<Recover />} />
          <Route path="/deportes" element={<Deportes />} />
          <Route path="/musica" element={<Musica />} />
          <Route path="/teatro" element={<Teatro />} />
          <Route path="/festivales" element={<Festivales />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/buyTicket" element={<buyTicket />} />
          {/* Agrega la ruta para la página de perfil */}
          <Route path="/loggedIn" element={<LoggedIn />} />
          <Route path="/newevent" element={<NewEvent />} />
          <Route path="/oldevents" element={<OldEvents />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
