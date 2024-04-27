import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { buyTicket } from "./buyTicket.js";
import { resellTicket } from "./resellTicket.js";
import { Link } from "react-router-dom";

const Auth = () => {
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const location = useLocation();
  console.log("Location:", location);
  const eventInfo = location.state || "";
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Public Key:", publicKey);
    console.log("Private Key:", privateKey);

    try {
      if (!eventInfo.startDate) {
        const ticketInfo = await resellTicket(
          privateKey,
          publicKey,
          eventInfo.contractAddress,
          eventInfo.ticketId
        );
      } else {
        const ticketInfo = await buyTicket(
          privateKey,
          publicKey,
          eventInfo.contractAddress
        );
        console.log("Ticket Info:", ticketInfo);
        const ticketData = {
          eventName: eventInfo.title,
          user: "gorketas",
          forSale: true,
          ticketId: ticketInfo.ticketId,
          price: ticketInfo.ticketPrice._hex,
          contractAddress: eventInfo.contractAddress,
        };

        fetch("http://localhost:8888/tickets/createTicket", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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

  return (
    <div className="container mx-auto p-">
      <style>
        {`
          .input-group {
            margin-bottom: 20px; /* Agrega un margen inferior entre los grupos de entrada */
          }

          /* Estilo personalizado para hacer que las checkbox sean más grandes */
          input[type="checkbox"] {
            transform: scale(1.5); /* Ajusta el tamaño de las checkbox */
          }
        `}
      </style>
      <h1>Autentication</h1>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="publicKey">Account:</label>
          <input
            type="text"
            id="publicKey"
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="privateKey">Private key:</label>
          <input
            type="text"
            id="privateKey"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
          />
        </div>
        <button>Ingresar</button>
      </form>
      <Link to="/">
        <button className="button">All Events</button>
      </Link>
    </div>
  );
};

export default Auth;
