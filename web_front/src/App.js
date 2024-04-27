import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import About from "./components/About.js";
import Login from "./components/Login";
import Register from "./components/Register.js";
import Recover from "./components/Recover.js";
import Image from "./components/images/mcloving.jpg";
import Deportes from "./components/Deportes.js";
import Teatro from "./components/Theater.js";
import Musica from "./components/Musica.js";
import Festivales from "./components/Festivales.js";
import EventGeneric from "./components/Events/EventGeneric.js";
import TicketResale from "./components/TicketResale.js";
import Auth from "./components/Auth.js";
import buyTicket from "./components/buyTicket.js";
import LoggedIn from "./components/LoggedIn"; // Importa el componente LoggedIn
import NewEvent from "./components/Events/NewEvent.js";
import OldEvents from "./components/Events/OldEvents.js";
import NavBar from "./components/NavBar.js";
import Footer from "./components/Footer.js";
import Contact from "./components/Contact.js";
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
      <NavBar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recover" element={<Recover />} />
          <Route path="/deportes" element={<Deportes />} />
          <Route path="/musica" element={<Musica />} />
          <Route path="/teatro" element={<Teatro />} />
          <Route path="/festivales" element={<Festivales />} />
          <Route path="/events" element={<EventGeneric />} />
          <Route path="/resale" element={<TicketResale />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/buyTicket" element={<buyTicket />} />
          {/* Agrega la ruta para la página de perfil */}
          <Route path="/loggedIn" element={<LoggedIn />} />
          <Route path="/newevent" element={<NewEvent />} />
          <Route path="/oldevents" element={<OldEvents />} />
          <Route path="/Footer" element={<Footer />} />
          <Route path="/NavBar" element={<NavBar />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
