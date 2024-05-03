import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useRequireAuth from "../authenticate_utils.js";

const MyEvents = () => {
  const isAuthenticated = useRequireAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [redirectToError, setRedirectToError] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8888/events/myevents", {
          method: "POST",
          headers: {
            Authorization: `Bearer ` + isAuthenticated,
          },
        });
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

    if (isAuthenticated == null) {
      return null;
    }
    if (!isAuthenticated) {
      return null;
    }

    fetchData();
  }, [isAuthenticated]);
  if (redirectToError) {
    return <img className="w-4 h-4 mr-auto" src={Error} alt="logo" />;
  }

  return (
    <div className="container mx-auto">
      <h1 className="heading text-3xl font-bold mb-2 mt-4">My events</h1>
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
                  <h2 className="event-title">{event.title}</h2>
                </Link>
                <p>Date: {event.date}</p>
                <p>Location: {event.location}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
