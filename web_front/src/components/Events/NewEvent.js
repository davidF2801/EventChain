// NewEvent.js
import React, { useState, useEffect } from "react";
import "./NewEvent.css";
import { useNavigate } from "react-router-dom";
import { MdOutlineFileUpload } from "react-icons/md";
import { v4 as uuidv4 } from "uuid"; // Importar uuid
import useRequireAuth from "../../authenticate_utils.js";
import Cookies from "js-cookie";
import { SERVER_ADDRESS } from "../../constants.js";
function NewEvent() {
  const isAuthenticated = useRequireAuth();
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login";
    }
  }, [isAuthenticated]);

  if (isAuthenticated == null) {
    return null;
  }
  if (!isAuthenticated) {
    return null;
  }

  const [title, setEventName] = useState("");
  const [description, setEventDesc] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setEventType] = useState("");
  const [address, setAddress] = useState("");
  const [eventSaved, setEventSaved] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Nuevo estado para el mensaje de error
  const [price, setPrice] = useState("");
  const [nTickets, setNtickets] = useState("");
  const [allowResale, setAllowResale] = useState(false);
  const [resaleFee, setResaleFee] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Assuming you're handling a base64 string
        setImagePreviewUrl(reader.result); // Set image preview URL
      };
      reader.readAsDataURL(file);
    }
  };

  async function createEvent(eventData) {
    try {
      const response = await fetch(`${SERVER_ADDRESS}/events/createEvent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + isAuthenticated,
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
      setErrorMessage("Error creating event. Please try again."); // Establecer un mensaje de error genérico
    }
  }

  const handleSaveEvent = (e) => {
    e.preventDefault();

    // Reset error state
    setError(false);
    setErrorMessage("");

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
      setErrorMessage("Please fill in all required fields.");
      return;
    } else if (!allowResale) {
      setAllowResale(false);
    }

    // Check for the resale fields only if resale is allowed
    if (allowResale == true && !resaleFee) {
      setError(true);
      setErrorMessage("Please fill in all required resale fields.");
      return;
    }

    // Convert startDate and endDate to Date objects for comparison
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // Get the current date
    const currentDate = new Date();

    // Get the current year
    const currentYear = currentDate.getFullYear();

    // Check if the start date is in the past
    if (startDateObj < currentDate) {
      setError(true);
      setErrorMessage("Start Date must be current date or later.");
      return;
    }

    // Check if the end date is before the start date
    if (endDateObj < startDateObj) {
      setError(true);
      setErrorMessage("End Date must be after Start Date.");
      return;
    }

    // Check if the year of start date is earlier than the current year
    if (startDateObj.getFullYear() < currentYear) {
      setError(true);
      setErrorMessage("Start Date cannot be in the past.");
      return;
    }

    // Check if the year of end date is more than 5 years from the current year
    if (endDateObj.getFullYear() - currentYear > 5) {
      setError(true);
      setErrorMessage(
        "Events cannot be scheduled more than 5 years in advance."
      );
      return;
    }

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
      image,
      allowResale,
      resaleFee: allowResale ? resaleFee : 0,
    };

    // Here you can send the data to the backend to save it
    createEvent(eventData);
  };

  return (
    <div className="container">
      {!eventSaved && <h2 className="heading">New Event</h2>}
      {eventSaved && <h2 className="saved">Event Saved Successfully</h2>}
      {error && <h3 className="failed">{errorMessage}</h3>}{" "}
      {/* Mostrar el mensaje de error */}
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
            <label htmlFor="start-date">Start Date:</label>
            <input
              id="start-date"
              className="input"
              type="date"
              placeholder="Start Date"
              value={startDate}
              min={new Date().toISOString().split("T")[0]}
              max={new Date().getFullYear() + 5 + "-12-31"} // Limitar a 5 años en el futuro
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="end-date">End Date:</label>
            <input
              id="end-date"
              className="input"
              type="date"
              placeholder="End Date"
              value={endDate}
              min={startDate} // Minimum end date should be the start date
              max={new Date().getFullYear() + 5 + "-12-31"} // Limitar a 5 años en el futuro
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
              placeholder="Ticket Price (in TRX)"
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
            <input
              id="eventImage"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              style={{
                display: "none",
                opacity: 0,
                position: "absolute",
                left: "-9999px",
              }}
            />
            <label
              htmlFor="eventImage"
              className="btn btn-primary flex items-center gap-2"
            >
              <MdOutlineFileUpload />
              Upload Event Image
            </label>
            {imagePreviewUrl && (
              <div className="image-preview">
                <img
                  src={imagePreviewUrl}
                  alt="Event"
                  style={{ width: "100%", marginTop: "10px" }}
                />
              </div>
            )}
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
