import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import useRequireAuth from "../authenticate_utils.js";
import Cookies from "js-cookie";

import logo from "./images/logo1.png";

const Navbar = () => {
  const isAuthenticated = useRequireAuth();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1150); // Estado para verificar si la pantalla es pequeña
  const [showMenu, setShowMenu] = useState(false); // Estado para controlar si se muestra el menú desplegable
  const navigate = useNavigate();

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

  // Manejador de clic en enlace dentro del popout
  const handleLinkClick = () => {
    setShowMenu(false); // Ocultar el popout cuando se hace clic en un enlace
  };

  return (
    <nav
      className="w-full flex md:justify-center justify-between items-center p-4"
      style={{ fontFamily: "Orbitron" }}
    >
      <header className="Header">
        <div className="Header-left">
          <Link to="/" className="Header-title">
            <img src={logo} className="Header-logo" alt="Logo" />
            EventChain
          </Link>
        </div>
        <div
          className="Header-right"
          style={{ display: "flex", alignItems: "center" }}
        >
          {!isSmallScreen && (
            <>
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
            </>
          )}
          {isSmallScreen && (
            <div className="Header-right">
              <button
                className="toggle-menu-btn"
                onClick={toggleMenu}
                style={{
                  background: "linear-gradient(to left, #330cc0, #9547d4)",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "50%",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                ☰
              </button>
              {showMenu && (
                <div
                  className="menu-popout"
                  style={{
                    position: "fixed",
                    top: "60px", // Margen superior aumentado
                    bottom: "0",
                    right: "0",
                    backgroundColor: "rgba(255, 255, 255, 0.1)", // Fondo con baja opacidad
                    zIndex: "999",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                  onClick={handleLinkClick} // Manejador de clic en el popout
                >
                  <nav className="Navbar">
                    <ul
                      className="Navbar-links"
                      style={{ flexDirection: "column" }}
                    >
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
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    </nav>
  );
};

export default Navbar;
