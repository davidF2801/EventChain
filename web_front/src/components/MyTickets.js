import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorImage from "./images/404.png";
import "./Auth.css"; // Import CSS file
import useRequireAuth from "../authenticate_utils.js";

const MyTickets = () => {
  const [data, setData] = useState([]);
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
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <img className="w-4 h-4 mr-auto" src={ErrorImage} alt="Error" />;
  }

  return (
    <div className="container gradient-custom">
      <h1>Your Tickets</h1>
      <div className="my-tickets-container">
        {data.map((ticket, index) => (
          <div key={index} className="ticket">
            {/* Make the title a link to the detailed ticket page */}
            <Link
              to={`/TicketDetailed/${ticket.publicKey}/${ticket.contractAddress}`}
              state={ticket}
            >
              <h2>{ticket.title}</h2>
            </Link>
            <p>Event: {ticket.eventName}</p>
            <div className="ticket-actions">
              <Link
                to={`/TicketDetailed/${ticket.publicKey}/${ticket.contractAddress}`}
                state={ticket}
              >
                <button className="button-cool">View Details</button>
              </Link>
              <Link to={`/AuthListTicket`} state={ticket}>
                {ticket.forSale ? (
                  <button className="button-cool">Change Resale Price</button>
                ) : (
                  <button className="button-cool">
                    List Ticket for Resale
                  </button>
                )}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTickets;
