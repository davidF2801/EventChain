import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { listTicketForResale } from "./listTicketForResale";
import "./Auth.css"; // Ensure the path is correct
import { SERVER_ADDRESS } from "../constants";

const AuthListTicket = () => {
  const [ticketPrice, setTicketPrice] = useState("");
  const location = useLocation();
  const ticketInfo = location.state || {};
  const [errorMessage, setErrorMessage] = useState(""); // To store error messages
  const [loading, setLoading] = useState(false); // To handle loading state
  const [successMessage, setSuccessMessage] = useState(""); // To display success messages

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await listTicketForResale(
        ticketPrice,
        ticketInfo.contractAddress,
        ticketInfo.ticketId
      );

      if (response.error) {
        throw new Error(response.error);
      }

      // Update ticket in the database
      const updateResponse = await fetch(
        `${SERVER_ADDRESS}/tickets/listTicket`,
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
      if (!updateResponse.ok) {
        throw new Error(
          updateResult.message || "Failed to update ticket in the database"
        );
      }

      setSuccessMessage("Ticket listed for resale successfully.");
    } catch (error) {
      console.error("Error listing ticket:", error);
      setErrorMessage("Error listing ticket.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1>Introduce your TRON wallet</h1>
      <form onSubmit={handleLogin} className="container mx-auto p-4">
        <div className="input-group">
          <label htmlFor="newTicketPrice">New ticket price:</label>
          <input
            type="text"
            id="newTicketPrice"
            value={ticketPrice}
            onChange={(e) => setTicketPrice(e.target.value)}
          />
          <button className="button-cool" type="submit">
            {ticketInfo.forSale
              ? "Change Resale Price"
              : "List Ticket for Resale"}
          </button>
        </div>
      </form>
      {loading && (
        <p className="warning-message">
          Listing your ticket for resale, please wait...
        </p>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default AuthListTicket;
