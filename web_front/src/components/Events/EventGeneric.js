import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./EventGeneric.css";
import Error from "../images/404.png";
import { buyTicket } from "../buyTicket.js";
import useRequireAuth from "../../authenticate_utils.js";
import handleBuy from "../components_utils.js";
const EventGeneric = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingBuy, setLoadingBuy] = useState(false);
  const [error, setError] = useState(null);
  const [redirectToError, setRedirectToError] = useState(false);

  const isAuthenticated = useRequireAuth();

  const buyLoading = async (event, isAuthenticated) => {
    try {
      setLoadingBuy(true);
      await handleBuy(event, isAuthenticated); // Wait for the buying process to complete
    } catch (error) {
      console.error("Error buying tickets:", error);
      // Optionally handle errors, such as updating the UI to show an error message
    } finally {
      setLoadingBuy(false); // Ensure loading is turned off after the process completes or fails
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // const response = await fetch("http://51.21.149.50:80/events",{ headers: {
        //   'Authorization': 'Bearer ' + token,
        // }});
        const response = await fetch("https://51.21.149.50:443/events");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        console.log("Events:", jsonData);
        setData(jsonData);
      } catch (error) {
        setError(error);
        setRedirectToError(true); // Establecer redirectToError a true en caso de error
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, [isAuthenticated]);

  if (redirectToError) {
    return <img className="w-4 h-4 mr-auto" src={Error} alt="logo" />;
  }

  return (
    <div className="full-screen-container">
      <h1 className=" container mx-auto p-8 heading text-3xl font-bold mb-2 mt-4">
        All Events
      </h1>
      {loading && <div>Loading...</div>}
      {error && (
        <div>
          <h1>Error: {error.message}</h1>
        </div>
      )}
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
                {/* Enlace al detalle del evento con el ID */}
                <Link to={`/eventdetailed/${event.title}`} state={event}>
                  <h2
                    className="event-title"
                    style={{ textDecoration: "none !important" }}
                  >
                    {event.title}
                  </h2>
                </Link>
                <p>
                  <span role="img" aria-label="Calendar">
                    🗓
                  </span>{" "}
                  Date: {formatDate(event.startDate)} -{" "}
                  {formatDate(event.endDate)}
                </p>
                <p>
                  <span role="img" aria-label="Location">
                    📍
                  </span>{" "}
                  Location: {event.location}
                </p>
                {isAuthenticated ? (
                  <button
                    className="event-button"
                    onClick={() => buyLoading(event, isAuthenticated)}
                  >
                    {" "}
                    {loadingBuy && <div>Buying Ticket...</div>}
                    {!loadingBuy && <div>💸 Buy tickets</div>}
                  </button>
                ) : (
                  <Link to={"/login"}>
                    <button className="event-button"> 💸 Buy tickets</button>
                  </Link>
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
