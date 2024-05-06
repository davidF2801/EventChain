import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { listTicketForResale } from "./listTicketForResale";
import "./Auth.css"; // Import the CSS file
const AuthListTicket = () => {
  const [ticketPrice, setTicketPrice] = useState("");
  const location = useLocation();
  console.log("Location:", location);
  const ticketInfo = location.state || "";
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await listTicketForResale(
        ticketPrice,
        ticketInfo.contractAddress,
        ticketInfo.ticketId
      );
      console.log(response);
      if (response == null) {
        throw new Error("Operation rejected");
      }
      console.log(ticketInfo);
      console.log(ticketPrice);
      const updateResponse = await fetch(
        "http://51.21.149.50:80/tickets/listTicket",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contractAddress: ticketInfo.contractAddress,
            ticketId: ticketInfo.ticketId,
            forSale: true,
            price: ticketPrice,
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
      //TODO: Falta cambiar la info en la database
    } catch (error) {
      console.error("Error listing ticket:", error.message || error);
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
      <h1>Introduce your TRON wallet</h1>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="newTicketPrice">New ticket price:</label>
          <input
            type="text"
            id="newTicketPrice"
            value={ticketPrice}
            onChange={(e) => setTicketPrice(e.target.value)}
          />
          {ticketInfo.forSale ? (
            <button className="button-cool">Change Resale Price</button>
          ) : (
            <button className="button-cool">List Ticket for Resale</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthListTicket;
