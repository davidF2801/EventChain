import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./EventGeneric.css";
import Error from "../images/404.png";

const EventGeneric = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [redirectToError, setRedirectToError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // const response = await fetch("http://localhost:8888/events",{ headers: {
        //   'Authorization': 'Bearer ' + token,
        // }});
        const response = await fetch("http://localhost:8888/events");
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
  }, []);

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
                <Link to={`/auth`} state={event}>
                  <button className="event-button"> 💸 Buy tickets</button>
                </Link>
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
