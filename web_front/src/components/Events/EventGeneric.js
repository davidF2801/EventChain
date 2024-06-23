import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./EventGeneric.css";
import errorImage from "../images/404.png";
import useRequireAuth from "../../authenticate_utils.js";
import handleBuy from "../components_utils.js";
import { SERVER_ADDRESS } from "../../constants.js";

const EventGeneric = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [redirectToError, setRedirectToError] = useState(false);
  const [loadingBuy, setLoadingBuy] = useState({});
  const [purchaseSuccess, setPurchaseSuccess] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const isAuthenticated = useRequireAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${SERVER_ADDRESS}/events`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        console.log("Events:", jsonData);
        setData(jsonData);

        // Initializing states based on fetched data
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
        setRedirectToError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  const buyLoading = async (event, index) => {
    try {
      setLoadingBuy((prev) => ({ ...prev, [index]: true }));
      setPurchaseSuccess((prev) => ({ ...prev, [index]: false }));
      setErrorMessage((prev) => ({ ...prev, [index]: "" }));

      const result = await handleBuy(event, isAuthenticated);
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

  if (redirectToError) {
    return <img className="w-4 h-4 mr-auto" src={errorImage} alt="Error" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <h1>Error: {error.message}</h1>
      </div>
    );
  }

  return (
    <div className="full-screen-container">
      <h1 className="container mx-auto p-8 heading text-3xl font-bold mb-2 mt-4">
        All Events
      </h1>
      {data && (
        <div className="grid grid-cols-3 gap-4">
          {data.map((event, index) => (
            <div key={index} className="event-container">
              <div className="event">
                <img
                  src={event.image}
                  alt={event.title}
                  className="event-image"
                />
                <Link to={`/eventdetailed/${event.title}`} state={event}>
                  <h2 className="event-title">{event.title}</h2>
                </Link>
                <p>
                  🗓 Date: {formatDate(event.startDate)} -{" "}
                  {formatDate(event.endDate)}
                </p>
                <p>📍 Location: {event.location}</p>
                {isAuthenticated && (
                  <div>
                    <button
                      className="event-button"
                      onClick={() => buyLoading(event, index)}
                    >
                      {loadingBuy[index]
                        ? "Buying Ticket... Please wait."
                        : "💸 Buy tickets"}
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
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

export default EventGeneric;
