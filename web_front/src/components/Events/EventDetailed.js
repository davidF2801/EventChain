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
  const handleBuy = async (eventInfo) => {
    try {
      if (!eventInfo.startDate) {
        const ticketInfo = await resellTicket(
          privateKey,
          publicKey,
          eventInfo.contractAddress,
          eventInfo.ticketId
        );
        const updateResponse = await fetch(
          "http://localhost:8888/tickets/rebuyTicket",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + isAuthenticated,
            },
            body: JSON.stringify({
              contractAddress: ticketInfo.contractAddress,
              ticketId: ticketInfo.ticketId,
              forSale: false,
              price: ticketInfo.ticketPrice._hex,
            }),
          }
        );
        const updateResult = await updateResponse.json();
        if (updateResponse.ok) {
          console.log("Ticket updated successfully in database:", updateResult);
        } else {
          throw new Error(
            updateResult.error || "Failed to update ticket in the database"
          );
        }
      } else {
        const ticketInfo = await buyTicket(eventInfo.contractAddress);
        console.log("Ticket Info:", ticketInfo);
        const ticketData = {
          eventName: eventInfo.title,
          forSale: false,
          ticketId: ticketInfo.ticketId,
          price: ticketInfo.ticketPrice._hex,
          contractAddress: eventInfo.contractAddress,
        };
        console.log(isAuthenticated);
        fetch("http://localhost:8888/tickets/createTicket", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + isAuthenticated,
          },
          body: JSON.stringify(ticketData),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              console.log("Ticket created successfully:", data);
            } else {
              throw new Error(data.error || "Failed to create ticket");
            }
          })
          .catch((error) => {
            console.error(
              "Error when creating ticket:",
              error.message || error
            );
          });
      }
    } catch (error) {
      console.error("Error buying ticket:", error.message || error);
    }
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
          Start Date: {eventData.startDate}
        </p>
        <p
          style={{ marginBottom: "10px", fontWeight: "bold", color: "#ffcc00" }}
        >
          Finish Date: {eventData.endDate}
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
            <p
              style={{
                marginBottom: "10px",
                fontWeight: "bold",
                color: "#cc66ff",
              }}
            >
              Maximum Price Allowed: {eventData.maxPrice}
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
