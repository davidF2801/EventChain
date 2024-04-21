// NewEvent.js
import React, { useState } from 'react';
import './NewEvent.css';

function NewEvent() {
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventSaved, setEventSaved] = useState(false);
  const [error, setError] = useState(false);

  const handleSaveEvent = (e) => {
    e.preventDefault();

    // Validation of fields
    if (!eventName || !location || !date || !eventType) {
      setError(true);
      return;
    }

    // Object with event data
    const eventData = {
      eventName,
      location,
      date,
      eventType,
    };

    // Here you can send the data to the backend to save it

    // Logic to simulate the event being saved
    setEventSaved(true);
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
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
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
              placeholder="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <select
              className="input"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            >
              <option value="">Event Type</option>
              <option value="Concert">Concert</option>
              <option value="Sports">Sports</option>
              <option value="Theatre">Theatre</option>
              <option value="Festival">Festival</option>
              {/* Add more options as needed */}
            </select>
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
