import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { buyTicket } from "./buyTicket.js";
import { resellTicket } from "./resellTicket.js";
import { Link } from "react-router-dom";
import "./Auth.css"; // Importa el archivo CSS

const Auth = () => {
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const eventInfo = location.state || "";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!publicKey || !privateKey) {
        throw new Error("Error: Keys are missing.");
      }

      console.log("Public Key:", publicKey);
      console.log("Private Key:", privateKey);

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
          forSale: false,
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
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container mx-auto p-">
      <h1>Introduce your TRON wallet</h1>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="publicKey">Public key:</label>
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
          <button className="button-cool">Buy Ticket</button>
        </div>
      </form>
      {errorMessage && <h3 className="failed">{errorMessage}</h3>}
    </div>
  );
};

export default Auth;
