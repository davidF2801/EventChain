import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import useRequireAuth from "../authenticate_utils.js";
import Cookies from "js-cookie";

import logo from "./images/logo1.png";

const Navbar = () => {
  const isAuthenticated = useRequireAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [iconColor, setIconColor] = useState("#888"); // Color inicial del ícono
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1150); // Estado para verificar si la pantalla es pequeña
  const [showMenu, setShowMenu] = useState(false); // Estado para controlar si se muestra el menú desplegable
  const navigate = useNavigate();

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSearch = () => {
    navigate(`/search?q=${searchQuery}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Función para alternar la visibilidad del menú desplegable
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 1150;
      setIsSmallScreen(isSmall);
      if (!isSmall) {
        setShowMenu(false); // Ocultar el menú desplegable cuando la pantalla deja de ser pequeña
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      className="w-full flex md:justify-center justify-between items-center p-4"
      style={{ fontFamily: "Orbitron" }}
    >
      <header className="Header">
        {!isSmallScreen && (
          <>
            <div className="Header-left">
              <Link to="/" className="Header-title">
                <img src={logo} className="Header-logo" alt="Logo" />
                EventChain
              </Link>
              <nav className="Navbar">
                <ul className="Navbar-links">
                  <li>
                    <Link
                      to="/events"
                      className="login-link"
                      style={{ fontFamily: "Orbitron" }}
                    >
                      All Events
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/resale"
                      className="login-link"
                      style={{ fontFamily: "Orbitron" }}
                    >
                      Resale Marketplace
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="login-link"
                      style={{ fontFamily: "Orbitron" }}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="login-link"
                      style={{ fontFamily: "Orbitron" }}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div
              className="Header-right"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                className="searchbox-container"
                style={{ position: "relative", fontFamily: "Orbitron" }}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  className="searchbox"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onKeyPress={handleKeyPress}
                  style={{ paddingRight: "40px" }}
                />
                <IoSearch
                  className="search-icon"
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    color: iconColor,
                    cursor: "pointer",
                  }}
                  onClick={handleSearch}
                  onMouseEnter={() => setIconColor("#007bff")}
                  onMouseLeave={() => setIconColor("#888")}
                />
              </div>
              <div style={{ marginLeft: "20px" }}>
                {isAuthenticated ? (
                  <Link
                    to="/myprofile"
                    className="login-link"
                    style={{ fontFamily: "Orbitron" }}
                  >
                    My Profile
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="login-link"
                    style={{ fontFamily: "Orbitron" }}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </>
        )}
        {isSmallScreen && (
          <div className="Header-left">
            <Link to="/" className="Header-title">
              <img src={logo} className="Header-logo" alt="Logo" />
              EventChain
            </Link>
            <div className="Header-right">
              <button
                className="toggle-menu-btn"
                onClick={toggleMenu}
                style={{
                  background: "linear-gradient(to left, #330cc0, #9547d4)",
                  color: "#fff",
                  position: "fixed",
                  top: "5px", // Margen superior
                  right: "20px", // Margen derecho
                  zIndex: "990", // Asegura que el botón esté por encima de otros elementos
                  padding: "10px", // Espacio alrededor del texto dentro del botón
                  borderRadius: "50%", // Botón redondeado
                  border: "none", // Sin borde
                }}
              >
                ☰
              </button>
              {showMenu && (
                <nav className="menu-sidebar">
                  <ul>
                    <li>
                      <Link
                        to="/events"
                        className="login-link"
                        style={{ fontFamily: "Orbitron" }}
                      >
                        All Events
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/resale"
                        className="login-link"
                        style={{ fontFamily: "Orbitron" }}
                      >
                        Resale Marketplace
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about"
                        className="login-link"
                        style={{ fontFamily: "Orbitron" }}
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/contact"
                        className="login-link"
                        style={{ fontFamily: "Orbitron" }}
                      >
                        Contact
                      </Link>
                    </li>
                    <li>
                      {isAuthenticated ? (
                        <Link
                          to="/myprofile"
                          className="login-link"
                          style={{ fontFamily: "Orbitron" }}
                        >
                          My Profile
                        </Link>
                      ) : (
                        <Link
                          to="/login"
                          className="login-link"
                          style={{ fontFamily: "Orbitron" }}
                        >
                          Login
                        </Link>
                      )}
                    </li>
                  </ul>
                </nav>
              )}
            </div>
          </div>
        )}
      </header>
    </nav>
  );
};

export default Navbar;
