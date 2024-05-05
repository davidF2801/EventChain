import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import user from "./images/user.png";
import "./MyProfile.css";
import useRequireAuth from "../authenticate_utils.js";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function MyProfile() {
  const isAuthenticated = useRequireAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [redirectToError, setRedirectToError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      // Simular la obtención de datos del usuario desde la base de datos
      // Aquí puedes hacer una llamada a tu backend para obtener la información del usuario
      // Este es solo un ejemplo simulado
      const fetchUserData = async () => {
        try {
          setLoading(true);
          console.log("isAuthenticated:", isAuthenticated);
          const response = await fetch("http://localhost:8888/users/userInfo", {
            method: "POST",
            headers: {
              Authorization: "Bearer " + isAuthenticated,
            },
          });
          console.log("Response:", response);
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const jsonData = await response.json();
          const userData = {
            name: jsonData[0].username,
            // Otros datos del usuario aquí...
          };
          setUserData(userData);
          console.log("User info:", jsonData.username);
          setData(jsonData[0]);
        } catch (error) {
          setError(error);
          setRedirectToError(true); // Establecer redirectToError a true en caso de error
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [isAuthenticated, navigate]);

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
          <Link to="/MyProfile" className="Header-title">
            <img src={user} className="Header-logo" alt="User" />
            {userData ? userData.name : "User"}
          </Link>
        </div>
        <div className="Header-right">
          <nav className="Navbar">
            <ul className="Navbar-links">
              <li>
                <Link to="/EditProfile" className="white-link">
                  Edit Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  onClick={() => Cookies.remove("token")}
                  className="white-link"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="button-cool2">
        <div className="button-cool2">
          <h3>
            <Link to="/MyTickets" className="action-button white-link">
              My Tickets
            </Link>
          </h3>
        </div>
        <div className="button-cool2">
          <h3>
            <Link to="/newevent" className="action-button white-link">
              Create Event
            </Link>
          </h3>
        </div>
        <div className="button-cool2">
          <h3>
            <Link to="/myevents" className="action-button white-link">
              View My Events
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
