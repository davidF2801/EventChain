import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Error from "./images/404.png";
import "./ticketResale.css";
import handleBuy from "./components_utils";
import useRequireAuth from "../authenticate_utils.js";
import { SERVER_ADDRESS } from "../constants.js";

const TicketResale = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingBuy, setLoadingBuy] = useState({});
  const [purchaseSuccess, setPurchaseSuccess] = useState({});
  const [errorMessage, setErrorMessage] = useState({});

  const isAuthenticated = useRequireAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${SERVER_ADDRESS}/tickets/resale`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        console.log("Tickets:", jsonData);
        setData(jsonData);

        // Initialize states based on fetched data
        const initialLoadingBuy = {};
        const initialPurchaseSuccess = {};
        const initialErrorMessage = {};
        jsonData.forEach((_, index) => {
          initialLoadingBuy[index] = false;
          initialPurchaseSuccess[index] = false;
          initialErrorMessage[index] = "";
        });
        setLoadingBuy(initialLoadingBuy);
        setPurchaseSuccess(initialPurchaseSuccess);
        setErrorMessage(initialErrorMessage);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const buyLoading = async (ticket, index) => {
    try {
      setLoadingBuy((prev) => ({ ...prev, [index]: true }));
      setPurchaseSuccess((prev) => ({ ...prev, [index]: false }));
      setErrorMessage((prev) => ({ ...prev, [index]: "" }));

      const result = await handleBuy(ticket, isAuthenticated);
      if (result && !result.success) {
        setErrorMessage((prev) => ({
          ...prev,
          [index]: "Error buying tickets. Please try again.",
        }));
      } else {
        setPurchaseSuccess((prev) => ({ ...prev, [index]: true }));
      }
    } catch (error) {
      console.error("Error buying tickets:", error);
      setErrorMessage((prev) => ({
        ...prev,
        [index]: "Error buying tickets. Please try again.",
      }));
    } finally {
      setLoadingBuy((prev) => ({ ...prev, [index]: false }));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <img className="w-4 h-4 mr-2" src={Error} alt="Error" />;
  }

  return (
    <div className="container">
      <h1 className="header">Tickets for resale</h1>
      <div className="cards-container">
        {data.map((ticket, index) => (
          <div key={index} className="card">
            <h2 className="title">{ticket.title}</h2>
            <p className="event-name">Event: {ticket.eventName}</p>
            <p className="price">Price: {ticket.price} TRX</p>
            {isAuthenticated ? (
              <div>
                <button
                  className="button-cool"
                  onClick={() => buyLoading(ticket, index)}
                >
                  {loadingBuy[index]
                    ? "Buying Ticket... Please wait."
                    : "💸 Buy tickets with Tron Link"}
                </button>
                {purchaseSuccess[index] && (
                  <div className="success-message">
                    Purchase finished successfully
                  </div>
                )}
                {errorMessage[index] && (
                  <div className="error-message">{errorMessage[index]}</div>
                )}
              </div>
            ) : (
              <Link to={"/login"}>
                <button className="button-cool">
                  {" "}
                  💸 Buy tickets with Tron Link
                </button>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketResale;
