import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import NotFound from './components/NotFound';
import About from './components/About.js';
import Registro from './components/Registro.js';
import Recover from './components/Recover.js';
import Image from  './components/images/mcloving.jpg';
import './App.css';

function App() {
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
                <li><Link to="/musica">Música</Link></li>
                <li><Link to="/teatro">Teatro</Link></li>
                <li><Link to="/festivales">Festivales</Link></li>
                <li><Link to="/deportes">Deportes</Link></li>
              </ul>
            </nav>
          </div>
          <div className="Header-right">
            <input type="text" placeholder="Buscar..." className="searchbox" />
            <Link to="/login" className="login-link">Login</Link>
            <Link to="/about" className="about">About</Link>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
