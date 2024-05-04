import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import QRCode from "react-qr-code";
import "./TicketDetailed.css";
const TicketDetailed = () => {
  const numbers = [123, 456, 789, 101, 112]; // Example array of numbers
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current index of the array
  const [currentNumber, setCurrentNumber] = useState(numbers[currentIndex]);
  const location = useLocation();
  const ticketInfo = location.state;
  if (!ticketInfo) {
    return <div>Loading ticket details...</div>; // Display loading or not found message if no ticket info
  }
  useEffect(() => {
    if (ticketInfo) {
      console.log(ticketInfo);
      console.log(ticketInfo.ticketInfo.signature);
      console.log(ticketInfo.ticketInfo.ticketId);
    }

    const interval = setInterval(() => {
      // Update the index to cycle through the numbers
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % numbers.length; // Cycle back to start
        setCurrentNumber(numbers[nextIndex]); // Update the current number based on the new index
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-">
      <h1>Ticket Details</h1>
      <div className="ticket-details">
        <div>
          <h2>Event Name: {ticketInfo.eventName}</h2>
          <p>
            <strong>Price:</strong> {ticketInfo.ticketInfo.price / 1000000} TRX
          </p>
          <p>
            <strong>For Sale:</strong>{" "}
            {ticketInfo.ticketInfo.forSale ? "Yes" : "No"}
          </p>
          <p>
            <strong>Ticket ID:</strong> {ticketInfo.ticketInfo.ticketId}
          </p>
          <p>
            <strong>User:</strong> {ticketInfo.ticketInfo.user}
          </p>
        </div>
        <div>
          <h3>QR Code for Ticket</h3>
          <QRCode
            value={`${ticketInfo.ticketInfo.ticketId}|${ticketInfo.ticketInfo.signature}|${currentNumber}`}
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
