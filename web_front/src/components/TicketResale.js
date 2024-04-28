import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Error from "./images/404.png";

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
    <div className="container mx-auto">
      <h1>Tickets for resale</h1>
      <div className="ticket-resale-container">
        {data.map((ticket, index) => (
          <div key={index} className="ticket">
            <h2>{ticket.title}</h2>
            <p>Event: {ticket.eventName}</p>
            <p>Price: {ticket.price}</p>
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
