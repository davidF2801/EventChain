import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import QRCode from "react-qr-code";
import "./TicketDetailed.css";
import Cookies from "js-cookie";
import { SERVER_ADDRESS } from "../constants";
const TicketDetailed = () => {
  const numbers = [123, 456, 789, 101, 112]; // Example array of numbers
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current index of the array
  const [currentNumber, setCurrentNumber] = useState(null);
  const location = useLocation();
  const ticketInfo = location.state;
  const [showQRCode, setShowQRCode] = useState(false);

  const generateQRCode = async (ticketInfo) => {
    const fetchData = async (ticketInfo) => {
      try {
        console.log(
          "Requesting random number for ticket:",
          ticketInfo.ticketId
        );
        const response = await fetch(
          `${SERVER_ADDRESS}/validation/requestNumber`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ticketId: ticketInfo.ticketId }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        console.log("Random number:", jsonData);
        return jsonData;
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    setShowQRCode(false);

    const number = await fetchData(ticketInfo);
    setCurrentNumber(number.number);
    setShowQRCode(true);
  };
  if (!ticketInfo) {
    return <div>Loading ticket details...</div>; // Display loading or not found message if no ticket info
  }
  // useEffect(() => {
  //   // const interval = setInterval(() => {
  //   //   // Update the index to cycle through the numbers
  //   //   setCurrentIndex((prevIndex) => {
  //   //     const nextIndex = (prevIndex + 1) % numbers.length; // Cycle back to start
  //   //     setCurrentNumber(numbers[nextIndex]); // Update the current number based on the new index
  //   //     return nextIndex;
  //   //   });
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, []);

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
          {showQRCode ? (
            <QRCode
              value={`${ticketInfo.ticketId}|${Cookies.get(
                "signature" + ticketInfo.contractAddress + ticketInfo.ticketId
              )}|${currentNumber}`}
              size={256}
              level="H"
              includeMargin={true}
            />
          ) : null}
          <button onClick={() => generateQRCode(ticketInfo)}>
            Generate QR Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailed;
