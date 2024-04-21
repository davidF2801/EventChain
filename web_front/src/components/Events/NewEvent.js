// NewEvent.js
import React, { useState } from "react";
import "./NewEvent.css";
import { useNavigate } from "react-router-dom";
function NewEvent() {
  const [title, setEventName] = useState("");
  const [description, setEventDesc] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setEventType] = useState("");
  const [eventSaved, setEventSaved] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  async function createEvent(eventData) {
    try {
      const response = await fetch("http://localhost:8888/events/createEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
      const data = await response.json();
      console.log("CreateEvent response:", data);
      if (!response.ok) {
        throw new Error("Create event failed");
      }
      console.log("Event created successfully:", eventData);
      setEventSaved(true);
      navigate("/");
    } catch (error) {
      console.error("Error creating event:", error);
      setError(true);
    }
  }

  const handleSaveEvent = (e) => {
    e.preventDefault();

    // Validation of fields
    if (
      !title ||
      !location ||
      !description ||
      !startDate ||
      !endDate ||
      !type
    ) {
      setError(true);
      return;
    }

    //TODO: Add real image + uid
    // Object with event data
    const eventData = {
      title,
      description,
      location,
      startDate,
      endDate,
      type,
      image: "",
      uid: "1",
    };

    // Here you can send the data to the backend to save it
    createEvent(eventData);
    // Logic to simulate the event being saved
  };

  return (
    <div className="container">
      {!eventSaved && <h2 className="heading">New Event</h2>}
      {eventSaved && <h2 className="saved">Event Saved Successfully</h2>}
      {error && <h3 className="failed">Please fill in all fields</h3>}
      {!eventSaved && (
        <form className="form">
          <div className="form-group">
            <input
              className="input"
              type="text"
              placeholder="Event Name"
              value={title}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="input"
              type="text"
              placeholder="Event Description"
              value={description}
              onChange={(e) => setEventDesc(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="input"
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="input"
              type="date"
              placeholder="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="input"
              type="date"
              placeholder="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="input"
              type="text"
              placeholder="Event type"
              value={type}
              onChange={(e) => setEventType(e.target.value)}
            />
          </div>
          <button className="button" type="submit" onClick={handleSaveEvent}>
            Save Event
          </button>
        </form>
      )}
    </div>
  );
}

export default NewEvent;
