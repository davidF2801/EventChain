import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import ErrorImage from "../images/404.png";
import "./EventGeneric.css"; // Importa el archivo CSS de EventGeneric
import { buyTicket } from "../buyTicket.js";
import useRequireAuth from "../../authenticate_utils.js";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import handleBuy from "../components_utils.js";
import { SERVER_ADDRESS } from "../../constants.js";
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
const EventDetailed = () => {
  const { title } = useParams();
  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const isAuthenticated = useRequireAuth();
  const [errorMessage, setErrorMessage] = useState(false); // Add this state variable
  const [loadingBuy, setLoadingBuy] = useState(false);
  const [purchaseSuccess, setpurchaseSuccess] = useState(false);
  const [contractAddress, setContractAddress] = useState("");
  const buyLoading = async (event, isAuthenticated) => {
    try {
      setLoadingBuy(true);
      setpurchaseSuccess(false);
      setErrorMessage(false); // Clear any previous error message

      const result = await handleBuy(event, isAuthenticated); // Wait for the buying process to complete

      // Check the result of handleBuy to ensure it was successful
      if (result && !result.success) {
        setErrorMessage(false);
        // Set success to true only if the purchase completes successfully
      } else {
        setpurchaseSuccess(true);
      }
    } catch (error) {
      console.error("Error buying tickets:", error);
      setErrorMessage("Error buying tickets. Please try again."); // Set the error message
    } finally {
      setLoadingBuy(false); // Ensure loading is turned off after the process completes or fails
    }
  };
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`${SERVER_ADDRESS}/events/details`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: title }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const eventData = await response.json();
        const tronWebInst = window.tronWeb;
        setContractAddress(
          tronWebInst.address.fromHex(eventData.contractAddress)
        );
        setEventData(eventData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEventDetails();

    return () => {};
  }, [title]);

  useEffect(() => {
    if (eventData && eventData.location && mapRef.current) {
      // Convert address to coordinates using Nominatim
      const address = encodeURIComponent(eventData.location);
      const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${address}`;

      fetch(nominatimUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            const lat = data[0].lat;
            const lon = data[0].lon;
            console.log(lat);
            console.log(lon);
            // Now initialize the map with these coordinates
            const map = L.map(mapRef.current).setView([lat, lon], 12);
            L.tileLayer(
              "https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=sUb7dqvLEI0JDY9r7PMY",
              {
                tileSize: 512,
                zoomOffset: -1,
                minZoom: 1,
                attribution: "© MapTiler © OpenStreetMap contributors",
                crossOrigin: true,
              }
            ).addTo(map);

            // Add a marker to the map at the geocoded location
            var myIcon = L.icon({
              iconUrl:
                "https://cdn.icon-icons.com/icons2/2444/PNG/512/location_map_pin_mark_icon_148684.png",
              iconSize: [40, 95], // size of the icon
              iconAnchor: [42, 94], // point of the icon which will correspond to marker's location
              popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
            });

            L.marker([lat, lon], { icon: myIcon })
              .addTo(map)
              .bindPopup("Your Location");

            // Cleanup function to remove map when component unmounts
            return () => {
              map.remove();
            };
          } else {
            console.log("No results found for the address.");
          }
        })
        .catch((error) => {
          console.error("Error fetching geocoding data:", error);
        });
    }
  }, [eventData]);

  const handleLocationClick = (location) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        location
      )}`,
      "_blank"
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  if (error) {
    return <img className="w-4 h-4 mr-auto" src={ErrorImage} alt="Error" />;
  }

  if (!eventData) {
    return <div>Loading event details...</div>;
  }

  return (
    <div className="w-full" style={{ width: "100%", margin: "0 auto" }}>
      <div className="w-full">
        <img
          src={eventData.image}
          alt={eventData.title}
          className="w-full h-96 object-cover"
        />
      </div>
      <div className="button-cool2">
        <h1 style={{ color: "white", fontWeight: "bold" }}>
          {eventData.title}
        </h1>
        <h3
          style={{ marginBottom: "10px", fontWeight: "bold", color: "#ff6666" }}
        >
          Description:{" "}
        </h3>
        <p>
          <span style={{ textAlign: "justify" }}>{eventData.description}</span>
        </p>
        <p
          style={{ marginBottom: "10px", fontWeight: "bold", color: "#99cc00" }}
        >
          Dates:{" "}
        </p>
        <p
          style={{ marginBottom: "10px", fontWeight: "bold", color: "#ffcc00" }}
        >
          Start Date: {formatDate(eventData.startDate)}
        </p>
        <p
          style={{ marginBottom: "10px", fontWeight: "bold", color: "#ffcc00" }}
        >
          Finish Date: {formatDate(eventData.endDate)}
        </p>
        <p
          style={{ marginBottom: "10px", fontWeight: "bold", color: "#66ff99" }}
        >
          Type: {eventData.type}
        </p>
        {/* <p style={{ marginBottom: "10px", fontWeight: "bold", color: "#66ccff" }}>Address: {eventData.address}</p> */}
        <p
          style={{ marginBottom: "10px", fontWeight: "bold", color: "#ff33cc" }}
        >
          Price: {eventData.price}
        </p>
        <p
          style={{ marginBottom: "10px", fontWeight: "bold", color: "#ff3399" }}
        >
          Number of Tickets: {eventData.nTickets}
        </p>
        <p
          style={{ marginBottom: "10px", fontWeight: "bold", color: "#FFFF00" }}
        >
          Blockchain address: {contractAddress}
        </p>
        {eventData.allowResale && (
          <>
            <p
              style={{
                marginBottom: "10px",
                fontWeight: "bold",
                color: "#33cccc",
              }}
            >
              Resale Fee: {eventData.resaleFee}
            </p>
          </>
        )}
        <h3 style={{ color: "white", fontWeight: "bold" }}>Location</h3>
        <div id="map" ref={mapRef} style={{ height: "300px" }}></div>
        <div>
          <span
            className="location-link"
            onClick={() => handleLocationClick(eventData.location)}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            {eventData.location}
          </span>
        </div>
        {isAuthenticated ? (
          <div>
            <button
              className="button"
              onClick={() => buyLoading(eventData, isAuthenticated)}
            >
              {loadingBuy && <div>Buying Ticket... Please wait.</div>}
              {!loadingBuy && <div>💸 Buy tickets</div>}
            </button>
            {purchaseSuccess && (
              <div className="success-message">
                Purchase finished successfully
              </div>
            )}
            {errorMessage && (
              <div className="error-message">
                Error buying tickets. Please try again.
              </div>
            )}{" "}
            {/* Display error message */}
          </div>
        ) : (
          <Link to={"/login"}>
            <button className="button">💸 Buy tickets</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default EventDetailed;
