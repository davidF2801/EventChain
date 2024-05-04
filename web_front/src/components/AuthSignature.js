import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { buyTicket } from "./buyTicket.js";
import { resellTicket } from "./resellTicket.js";
import "./Auth.css"; // Importa el archivo CSS
import useRequireAuth from "../authenticate_utils.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AuthSignature = () => {
  const [privateKey, setPrivateKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const ticketInfo = location.state || "";
  const isAuthenticated = useRequireAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login";
    }
  }, [isAuthenticated]);

  if (isAuthenticated == null) {
    return null;
  }
  if (!isAuthenticated) {
    return null;
  }
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!privateKey) {
        throw new Error("Error: Key is missing.");
      }
      console.log("Private Key:", privateKey);
      const tronWebInst = window.tronWeb;
      tronWebInst.setPrivateKey(privateKey);
      const message = tronWebInst.toHex(ticketInfo.contractAddress.toString());
      const signature = await tronWebInst.trx.sign(message, privateKey);
      console.log(signature);
      ticketInfo.signature = signature;
      navigate("/TicketDetailed", { state: { ticketInfo } });
    } catch (error) {
      console.error("Error buying ticket:", error.message || error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container mx-auto p-">
      <h1>Introduce your TRON private key to generate a digital signature</h1>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="privateKey">Private key:</label>
          <input
            type="text"
            id="privateKey"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
          />
          <button className="button-cool">Sign</button>
        </div>
      </form>
      {errorMessage && <h3 className="failed">{errorMessage}</h3>}
    </div>
  );
};

export default AuthSignature;
