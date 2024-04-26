import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { buyTicket } from "./buyTicket.js";

const Auth = () => {
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const location = useLocation();
  console.log("Location:", location);
  const contractAddress = location.state || "";
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Public Key:", publicKey);
    console.log("Private Key:", privateKey);

    try {
      // Simulate a buy ticket process (adjust as necessary)
      const response = await buyTicket(privateKey, publicKey, contractAddress);
      const ticketData = {
        eventName: "Cumple Joel 2024",
        user: "gorketas",
        forSale: false,
        ticketId: 0,
        price: 100,
      };
      // Check if response is properly structured and contains success
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
          console.error("Error when creating ticket:", error.message || error);
        });
    } catch (error) {
      console.error("Error buying ticket:", error.message || error);
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default Auth;
