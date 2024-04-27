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
  const [address, setAddress] = useState("");
  const [eventSaved, setEventSaved] = useState(false);
  const [error, setError] = useState(false);
  const [price, setPrice] = useState("");
  const [nTickets, setNtickets] = useState("");
  const [allowResale, setAllowResale] = useState(false);
  const [resaleFee, setResaleFee] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
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
      !type ||
      !address ||
      !price ||
      !nTickets
    ) {
      setError(true);
      return;
    }

    // Check for the resale fields only if resale is allowed
    if (allowResale && (!resaleFee || !maxPrice)) {
      setError(true);
      return;
    }

    //TODO: Add real image + uid
    // Object with event data
    const eventData = {
      title,
      location,
      description,
      startDate,
      endDate,
      type,
      address,
      price,
      nTickets,
      allowResale,
      resaleFee: allowResale ? resaleFee : undefined,
      maxPrice: allowResale ? maxPrice : undefined,
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
            <textarea
              className="input"
              placeholder="Event Description"
              value={description}
              onChange={(e) => setEventDesc(e.target.value)}
              rows="4" // Adjust the number of rows as needed
              style={{ resize: "vertical" }} // Allows the user to resize the textarea vertically
            ></textarea>
          </div>
          <div className="form-group">
            <input
              className="input"
              type="text"
              placeholder="Location (Address, City, Zip code, Country)"
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
          <div className="form-group">
            <input
              className="input"
              type="text"
              placeholder="Public blockchain address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="input"
              type="text"
              placeholder="Ticket Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="input"
              type="text"
              placeholder="Number of tickets for sale"
              value={nTickets}
              onChange={(e) => setNtickets(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={allowResale}
                onChange={(e) => setAllowResale(e.target.checked)}
              />{" "}
              Allow Ticket Resale
            </label>
          </div>
          {allowResale && (
            <>
              <div className="form-group">
                <input
                  className="input"
                  type="text"
                  placeholder="Resale Fee (%)"
                  value={resaleFee}
                  onChange={(e) => setResaleFee(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="input"
                  type="text"
                  placeholder="Maximum Price Allowed"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </>
          )}
          <button className="button" type="submit" onClick={handleSaveEvent}>
            Save Event
          </button>
        </form>
      )}
    </div>
  );
}

export default NewEvent;
