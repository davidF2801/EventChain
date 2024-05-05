import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Error from "./images/404.png";
import "./ticketResale.css";
const TicketResale = () => {
  const [data, setData] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8888/tickets/resale");
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
    <div className="container">
      <h1 className="header">Tickets for resale</h1>
      <div className="cards-container">
        {data.map((ticket, index) => (
          <div key={index} className="card">
            <h2 className="title">{ticket.title}</h2>
            <p className="event-name">Event: {ticket.eventName}</p>
            <p className="price">Price: {ticket.price} TRX</p>
            <Link to={`/auth`} state={ticket}>
              <button className="button-cool">Buy ticket</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketResale;
