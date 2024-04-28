import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { listTicketForResale } from "./listTicketForResale";

const AuthListTicket = () => {
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const location = useLocation();
  console.log("Location:", location);
  const ticketInfo = location.state || "";
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Public Key:", publicKey);
    console.log("Private Key:", privateKey);

    try {
      listTicketForResale(
        privateKey,
        ticketPrice,
        ticketInfo.contractAddress,
        ticketInfo.ticketId,
        publicKey
      );
      //TODO: Falta cambiar la info en la database
    } catch (error) {
      console.error("Error listing ticket:", error.message || error);
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
        <div className="input-group">
          <label htmlFor="newTicketPrice">New ticket price:</label>
          <input
            type="text"
            id="newTicketPrice"
            value={ticketPrice}
            onChange={(e) => setTicketPrice(e.target.value)}
          />
        </div>
        <button>Ingresar</button>
      </form>
    </div>
  );
};

export default AuthListTicket;
