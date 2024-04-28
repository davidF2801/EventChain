import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Error from "./images/404.png";

const MyTickets = () => {
  const [data, setData] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8888/tickets/myTickets");
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

    fetchData();

    return () => {};
  }, []);

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
              <button>List ticket for resale</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTickets;
