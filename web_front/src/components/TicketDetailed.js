import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QRCode } from "qrcode.react"; // Import the QRCode component

const TicketDetailed = () => {
  const { publicKey, contractAddress } = useParams(); // Assume these parameters are passed via URL or some state management
  const [ticketData, setTicketData] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const ticketInfo = location.state || "";
  console.log(ticketInfo);
  useEffect(() => {
    // const fetchTicketDetails = async () => {
    //   try {
    //     const response = await fetch("http://localhost:8888/tickets/details", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ publicKey, contractAddress }),
    //     });
    //     if (!response.ok) {
    //       throw new Error("Failed to fetch ticket details");
    //     }
    //     const data = await response.json();
    //     setTicketData(data);
    //   } catch (error) {
    //     setError(error.message);
    //   }
    // };

    //fetchTicketDetails();
    console.log(publicKey);
    return () => {};
  }, [publicKey, contractAddress]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!ticketData) {
    return <div>Loading ticket details...</div>;
  }

  return (
    <div>
      {/* Display QR Code */}
      <QRCode value={publicKey} size={256} level="H" includeMargin={true} />
      {/* Add more details as needed */}
    </div>
  );
};

export default TicketDetailed;
