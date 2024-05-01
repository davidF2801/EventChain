import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "./images/404.png";
import "./Auth.css"; // Importa el archivo CSS
import useRequireAuth from "../authenticate_utils.js";

const MyTickets = () => {
  const [data, setData] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAuthenticated = useRequireAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login";
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const token = isAuthenticated;
        if (!token) {
          return;
        }
        const response = await fetch(
          "http://localhost:8888/tickets/myTickets",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        console.log("Tickets:", jsonData);
        setData(jsonData);
        setLoading(true);
        setEventData(event);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (isAuthenticated == null) {
      return null;
    }
    if (!isAuthenticated) {
      return null;
    }

    fetchData();

    return () => {};
  }, [isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <img class="w-4 h-4 mr-2" src={Error} alt="logo" />;
  }
  return (
    <div className="container gradient-custom">
      <h1>Your Tickets</h1>
      <div className="my-tickets-container">
        {data.map((ticket, index) => (
          <div key={index} className="ticket">
            <h2>{ticket.title}</h2>
            <p>Event: {ticket.eventName}</p>
            <Link to={`/AuthListTicket`} state={ticket}>
              {ticket.forSale ? (
                <button className="button-cool">Change Resale Price</button>
              ) : (
                <button className="button-cool">List Ticket for Resale</button>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTickets;
