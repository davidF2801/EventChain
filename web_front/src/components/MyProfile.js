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
          // Aquí puedes hacer una llamada a tu backend para obtener la información del usuario
          // Ejemplo de cómo podría ser:
          // const response = await fetch("URL_DEL_BACKEND_PARA_OBTENER_DATOS_DEL_USUARIO", {
          //   method: "GET",
          //   headers: {
          //     Authorization: `Bearer ${Cookies.get("token")}`,
          //   },
          // });
          // const userData = await response.json();
          // setUserData(userData);

          // En este ejemplo simulado, usamos un objeto estático
          const userData = {
            name: "Nombre del Usuario",
            // Otros datos del usuario aquí...
          };
          setUserData(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
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
          <Link to="/" className="Header-title">
            <img src={user} className="Header-logo" alt="User" />
            {userData ? userData.name : "User"}
          </Link>
        </div>
        <div className="Header-right">
          <nav className="Navbar">
            <ul className="Navbar-links">
              <li>
                <Link to="/EditProfile">Edit Profile</Link>
              </li>
              <li>
                <Link to="/" onClick={() => Cookies.remove("token")}>
                  Logout
                </Link>
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
