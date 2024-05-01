// EventDetailed.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorImage from "../images/404.png";

const EventDetailed = () => {
  const { title } = useParams();
  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(title);
    // In your EventDetailed component (frontend)
    // In your EventDetailed component (frontend)
    const fetchEventDetails = async () => {
      try {
        const response = await fetch("http://localhost:8888/events/details", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: title }), // Send title in the request body
        });
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const eventData = await response.json();
        setEventData(eventData);
      } catch (error) {
        setError(error.message); // Ensure the error message is passed, not the error object
      }
    };

    console.log(title);
    fetchEventDetails();

    return () => {};
  }, [title]);

  if (error) {
    return <img className="w-4 h-4 mr-auto" src={ErrorImage} alt="Error" />;
  }

  if (!eventData) {
    return <div>Loading event details...</div>;
  }

  return (
    <div>
      <h1>{eventData.title}</h1>
      <p>Date: {eventData.date}</p>
      <p>Location: {eventData.location}</p>
      <p>Description: {eventData.description}</p>
      <p>Start Date: {eventData.startDate}</p>
      <p>End Date: {eventData.endDate}</p>
      <p>Type: {eventData.type}</p>
      <p>Address: {eventData.address}</p>
      <p>Price: {eventData.price}</p>
      <p>Number of Tickets: {eventData.nTickets}</p>
      {eventData.allowResale && (
        <>
          <p>Resale Fee: {eventData.resaleFee}</p>
          <p>Maximum Price Allowed: {eventData.maxPrice}</p>
        </>
      )}
    </div>
  );
};

export default EventDetailed;
