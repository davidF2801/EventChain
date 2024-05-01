// MyProfile.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import user from "./images/user.png";
import "./MyProfile.css";
import useRequireAuth from "../authenticate_utils.js";
import { useNavigate } from "react-router-dom";

function MyProfile() {
  const isAuthenticated = useRequireAuth();
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login";
    }
  }, [isAuthenticated]);

  if (isAuthenticated == null) {
    return null;
  }
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="loggedIn-container">
      <header className="Header2">
        <div className="Header-left">
          <Link to="/" className="Header-title">
            <img src={user} className="Header-logo" alt="User" />
            User
          </Link>
        </div>
        <div className="Header-right">
          <nav className="Navbar">
            <ul className="Navbar-links">
              <li>
                <Link to="/NotFound">Edit Profile</Link>
              </li>
              <li>
                <Link to="/NotFound">Logout</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="button-cool2">
        <div className="button-cool2">
          <h2>
            <Link to="/MyTickets" className="action-button">
              My Tickets
            </Link>
          </h2>
        </div>
        <div className="button-cool2">
          <h3>
            <Link to="/newevent" className="action-button">
              Create Event
            </Link>
          </h3>
        </div>
        <div className="button-cool2">
          <h3>
            <Link to="/oldevents" className="action-button">
              View Past Events
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
