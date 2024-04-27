import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TicketResale = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8888/ticketresale");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        console.log("Events:", jsonData);
        setData(jsonData);
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
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <h1>All tickets for resale</h1>
      <div className="ticket-resale-container">
        {data.map((ticket, index) => (
          <div key={index} className="ticket">
            <img src={ticket.image} alt={ticket.eventName} />
            <h2>{ticket.eventName}</h2>
            <p>Price: {ticket.price}</p>
            <Link to={`/auth`} state={ticket.event.contractAddress}>
              <button>Buy ticket</button>
            </Link>
          </div>
        ))}
      </div>
      <footer>
        <p>© 2024 EventChain. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TicketResale;
