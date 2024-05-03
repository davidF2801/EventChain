import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import QRCode from "react-qr-code";
import "./TicketDetailed.css";
const TicketDetailed = () => {
  const location = useLocation();
  const ticketInfo = location.state;
  console.log(ticketInfo.publicKey);
  if (!ticketInfo) {
    return <div>Loading ticket details...</div>; // Display loading or not found message if no ticket info
  }

  return (
    <div className="container mx-auto p-">
      <h1>Ticket Details</h1>
      <div className="ticket-details">
        <div>
          <h2>Event Name: {ticketInfo.eventName}</h2>
          <p>
            <strong>Price:</strong> {ticketInfo.price / 1000000} TRX
          </p>
          <p>
            <strong>For Sale:</strong> {ticketInfo.forSale ? "Yes" : "No"}
          </p>
          <p>
            <strong>Ticket ID:</strong> {ticketInfo.ticketId}
          </p>
          <p>
            <strong>User:</strong> {ticketInfo.user}
          </p>
        </div>
        <div>
          <h3>QR Code for Ticket</h3>
          <QRCode
            value={ticketInfo.publicKey + ticketInfo.contractAddress}
            size={256}
            level="H"
            includeMargin={true}
          />
        </div>
      </div>
    </div>
  );
};

export default TicketDetailed;
