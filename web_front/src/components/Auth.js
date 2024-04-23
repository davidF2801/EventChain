import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { buyTicket } from "./buyTicket.js";

const Auth = () => {
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const location = useLocation();
  console.log("Location:", location);
  const contractAddress = location.state || "";
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Clave pública:", publicKey);
    console.log("Clave privada:", privateKey);
    buyTicket(privateKey, publicKey, contractAddress);
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
