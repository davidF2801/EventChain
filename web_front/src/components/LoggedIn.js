// LoggedIn.js
import React from "react";
import { Link } from "react-router-dom";
import user from "./images/user.png";
import "./LoggedIn.css";

function LoggedIn() {
  return (
    <div className="loggedIn-container">
      <header className="Header">
        <div className="Header-left">
          <Link to="/" className="Header-title">
            <img src={user} className="Header-logo" alt="User" />
            EventChain
          </Link>
        </div>
        <div className="Header-right">
          <nav className="Navbar">
            <ul className="Navbar-links">
              <li>
                <Link to="/NotFound">Edit Profile</Link>
              </li>
              <li>
                <Link to="/MyTickets">My Tickets</Link>
              </li>
              <li>
                <Link to="/NotFound">Logout</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="main-content">
        <div className="user-info">
          <h2>My Information</h2>
          {/* Place your user information here */}
        </div>
        <div className="center-links">
          <Link to="/newevent">Create Event</Link>
          <Link to="/oldevents">Past Events</Link>
        </div>
      </div>
    </div>
  );
}

export default LoggedIn;
