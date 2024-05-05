import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import ErrorImage from "../images/404.png";
import "./EventGeneric.css"; // Importa el archivo CSS de EventGeneric
import { buyTicket } from "../buyTicket.js";
import useRequireAuth from "../../authenticate_utils.js";

const EventDetailed = () => {
  const { title } = useParams();
  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState(null);

  const isAuthenticated = useRequireAuth();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch("http://localhost:8888/events/details", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: title }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const eventData = await response.json();
        setEventData(eventData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEventDetails();

    return () => {};
  }, [title]);

  const handleLocationClick = (location) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        location
      )}`,
      "_blank"
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  if (error) {
    return <img className="w-4 h-4 mr-auto" src={ErrorImage} alt="Error" />;
  }

  if (!eventData) {
    return <div>Loading event details...</div>;
  }

  return (
    <div className="w-full" style={{ width: "100%", margin: "0 auto" }}>
      <div className="w-full">
        <img
          src={eventData.image}
          alt={eventData.title}
          className="w-full h-96 object-cover"
        />
      </div>
      <div className="button-cool2">
        <h1 style={{ color: "white", fontWeight: "bold" }}>
          {eventData.title}
        </h1>
        <h3
          style={{ marginBottom: "10px", fontWeight: "bold", color: "#ff6666" }}
        >
          Description:{" "}
        </h3>
        <p>
          <span style={{ textAlign: "justify" }}>{eventData.description}</span>
        </p>
        <p
          style={{ marginBottom: "10px", fontWeight: "bold", color: "#99cc00" }}
        >
          Dates:{" "}
        </p>
        <p
          style={{ marginBottom: "10px", fontWeight: "bold", color: "#ffcc00" }}
        >
          Start Date: {formatDate(eventData.startDate)}
        </p>
        <p
          style={{ marginBottom: "10px", fontWeight: "bold", color: "#ffcc00" }}
        >
          Finish Date: {formatDate(eventData.endDate)}
        </p>
        <p
          style={{ marginBottom: "10px", fontWeight: "bold", color: "#66ff99" }}
        >
          Type: {eventData.type}
        </p>
        {/* <p style={{ marginBottom: "10px", fontWeight: "bold", color: "#66ccff" }}>Address: {eventData.address}</p> */}
        <p
          style={{ marginBottom: "10px", fontWeight: "bold", color: "#ff33cc" }}
        >
          Price: {eventData.price}
        </p>
        <p
          style={{ marginBottom: "10px", fontWeight: "bold", color: "#ff3399" }}
        >
          Number of Tickets: {eventData.nTickets}
        </p>
        {eventData.allowResale && (
          <>
            <p
              style={{
                marginBottom: "10px",
                fontWeight: "bold",
                color: "#33cccc",
              }}
            >
              Resale Fee: {eventData.resaleFee}
            </p>
          </>
        )}
        <h3 style={{ color: "white", fontWeight: "bold" }}>Location</h3>
        <div>
          <span
            className="location-link"
            onClick={() => handleLocationClick(eventData.location)}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            {eventData.location}
          </span>
        </div>
        {isAuthenticated ? (
          <button className="button" onClick={() => handleBuy(eventData)}>
            {" "}
            💸 Buy tickets
          </button>
        ) : (
          <Link to={"/login"}>
            <button className="button"> 💸 Buy tickets</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default EventDetailed;
