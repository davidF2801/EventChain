import React from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt4 } from "react-icons/hi";
import Image from "./images/mcloving.jpg";
import logo from "./images/logo1.png";

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

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
                  All events
                </Link>
              </li>
              <li>
                <Link to="/resale" className="login-link">
                  Resale markeplace
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
          <input type="text" placeholder="Buscar..." className="searchbox" />
          <Link to="/login" className="login-link">
            Login
          </Link>
          <Link to="/loggedIn" className="login-link">
            My Profile
          </Link>
          <select className="language-selector">
            <option value="es">Español</option>
            <option value="en">English</option>
            <option value="de">Deutsch</option>
            <option value="zh">中文</option>
          </select>
        </div>
      </header>
    </nav>
  );
};

export default Navbar;
