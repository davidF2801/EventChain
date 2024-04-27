// OldEvents.js
import React from "react";

function OldEvents() {
  // Old event data (example)
  const oldEvents = [
    {
      eventName: "Rock Concert",
      location: "National Stadium",
      date: "2023-05-15",
      eventType: "Concert",
    },
    {
      eventName: "Football Match",
      location: "Camp Nou",
      date: "2023-06-20",
      eventType: "Sports",
    },
  ];

  return (
    <div className="container mx-auto p-8">
      <h2 className="heading">Old Events</h2>
      <div className="events-list">
        {oldEvents.map((event, index) => (
          <div key={index} className="event-card">
            <h3>{event.eventName}</h3>
            <p>
              <strong>Location:</strong> {event.location}
            </p>
            <p>
              <strong>Date:</strong> {event.date}
            </p>
            <p>
              <strong>Event Type:</strong> {event.eventType}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OldEvents;
