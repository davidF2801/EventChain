import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./EventGeneric.css";
import Error from "../images/404.png";
import useToken from "../../authenticate_utils";

const EventGeneric = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [redirectToError, setRedirectToError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = useToken(navigate);
        const response = await fetch("http://localhost:8888/events", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        console.log("Events:", jsonData);
        setData(jsonData);
      } catch (error) {
        setError(error);
        setRedirectToError(true); // Establecer redirectToError a true en caso de error
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, []);

  if (redirectToError) {
    return <img className="w-4 h-4 mr-auto" src={Error} alt="logo" />;
  }

  return (
    <div className="event-generic-container">
      <header className="Header bg-blue-500 text-white py-2 px-4 flex justify-between items-center">
        <nav className="Navbar">
          <ul className="Navbar-links flex space-x-4">
            <li>
              <Link to="/musica" className="hover:text-blue-700">
                Música
              </Link>
            </li>
            <li>
              <Link to="/teatro" className="hover:text-blue-700">
                Teatro
              </Link>
            </li>
            <li>
              <Link to="/festivales" className="hover:text-blue-700">
                Festivales
              </Link>
            </li>
            <li>
              <Link to="/deportes" className="hover:text-blue-700">
                Deportes
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <h1 className="heading text-3xl font-bold mb-2 mt-4">All events</h1>
      {loading && <div>Loading...</div>}
      {error && (
        <div>
          <h1>Error: {error.message}</h1>
        </div>
      )}
      {data && (
        <div className="grid grid-cols-3 gap-4">
          {data.map((event, index) => (
            <div key={index} className="event-container">
              <div className="event">
                <img
                  src={event.image}
                  alt={event.title}
                  className="event-image"
                />
                {/* Enlace al detalle del evento con el ID */}
                <Link to={`/eventdetailed/${event.title}`} state={event}>
                  <h2 className="event-title">{event.title}</h2>
                </Link>
                <p>Date: {event.date}</p>
                <p>Location: {event.location}</p>
                <Link to={`/auth`} state={event}>
                  <button className="event-button">Buy tickets</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventGeneric;
