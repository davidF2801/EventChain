import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ErrorImage from "./images/404.png";
import "./Auth.css"; // Import CSS file
import useRequireAuth from "../authenticate_utils.js";
import Cookies from "js-cookie";

const MyTickets = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
  //Easter egg
  // Function to determine if the signature cookie exists for a ticket
  const hasSignature = (ticketId, contractAddress) => {
    // Check for a cookie based on ticketId, adapt as necessary
    console.log(
      "Checking for signature cookie for ticketId",
      "signature" + contractAddress + ticketId
    );
    const signature = Cookies.get("signature" + contractAddress + ticketId);
    return signature ? true : false;
  };
  const handleInput = async (ticketInfo) => {
    try {
      const tronWebInst = window.tronWeb;
      console.log("TronWeb instance:", tronWebInst);
      const message = tronWebInst.toHex(ticketInfo.contractAddress.toString());
      console.log("Message:", message);
      const signature = await tronWebInst.trx.sign(
        message,
        tronWeb.defaultPrivateKey
      );
      console.log("Signature: ", signature);
      Cookies.set(
        "signature" + ticketInfo.contractAddress + ticketInfo.ticketId,
        signature,
        { expires: 0.25 }
      );
      navigate("/TicketDetailed", { state: ticketInfo });
    } catch (error) {
      console.error("Error buying ticket:", error.message || error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container gradient-custom">
      <h1>Your Tickets</h1>
      <div className="my-tickets-container">
        {data.map((ticket, index) => (
          <div key={index} className="ticket">
            <h2>{ticket.title}</h2>
            <p>Event: {ticket.eventName}</p>
            <div className="ticket-actions">
              {hasSignature(ticket.ticketId, ticket.contractAddress) ? (
                <Link to={"/TicketDetailed"} state={ticket}>
                  <button className="button-cool">View QR code</button>
                </Link>
              ) : (
                <button
                  className="button-cool"
                  onClick={() => handleInput(ticket)}
                >
                  Authenticate to View QR
                </button>
              )}
              <Link to={"/AuthListTicket"} state={ticket}>
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
