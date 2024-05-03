import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import useRequireAuth from "../authenticate_utils.js";
import Cookies from "js-cookie";

import logo from "./images/logo1.png";

const Navbar = () => {
  const isAuthenticated = useRequireAuth();
  if (isAuthenticated == null) {
    return null;
  }
  const [searchQuery, setSearchQuery] = useState("");
  const [iconColor, setIconColor] = useState("#888"); // Color inicial del ícono
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

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <header className="Header">
        <div className="Header-left">
          <Link to="/" className="Header-title">
            <img src={logo} className="Header-logo" alt="Logo" />
            EventChain
          </Link>
          <nav className="Navbar">
            <ul className="Navbar-links">
              <li>
                <Link to="/events" className="login-link">
                  All Events
                </Link>
              </li>
              <li>
                <Link to="/resale" className="login-link">
                  Resale Marketplace
                </Link>
              </li>
              <li>
                <Link to="/about" className="login-link">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="login-link">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="Header-right">
          <div className="searchbox-container" style={{ position: "relative" }}>
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
                color: iconColor, // Color dinámico
                cursor: "pointer",
              }}
              onClick={handleSearch}
              onMouseEnter={() => setIconColor("#007bff")} // Cambiar a azul cuando pasa el cursor
              onMouseLeave={() => setIconColor("#888")} // Cambiar al color original cuando sale el cursor
            />
            {isAuthenticated ? (
              <>
                <Link to="/myprofile" className="login-link">
                  My Profile
                </Link>
              </>
            ) : (
              <Link to="/login" className="login-link">
                Login
              </Link>
            )}
            <select className="language-selector">
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="de">Deutsch</option>
              <option value="zh">中文</option>
            </select>
          </div>
        </div>
      </header>
    </nav>
  );
};

export default Navbar;
