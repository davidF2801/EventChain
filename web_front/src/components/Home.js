import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo1 from "./images/logo1.png";
import { Link } from "react-router-dom";

const Home = () => {
  const sliderRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8888/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const eventData = await response.json();
        // Obtener solo los primeros tres eventos
        const firstThreeEvents = eventData.slice(0, 5);
        setEvents(firstThreeEvents);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    }, 10000); // Modificar la velocidad de paso

    return () => clearInterval(interval);
  }, []);

  const settings = {
    dots: false, // Ocultar los puntos de navegación
    arrows: false, // Ocultar las flechas de navegación
    infinite: true,
    speed: 1000, // Ajustar la velocidad de transición
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Ajustar la velocidad de reproducción automática
    pauseOnHover: true,
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div style={{ textAlign: "left" }}>
        <Slider ref={sliderRef} {...settings}>
          {events.map((event, index) => (
            <div
              key={index}
              className="banner-container"
              style={{ display: "flex", alignItems: "left" }}
            >
              <Link to={`/eventdetailed/${event.title}`} style={{ flex: 1 }}>
                <img
                  src={event.image}
                  alt={event.title}
                  className="banner-image"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </Link>
              <div
                className="banner-content"
                style={{
                  flex: 0.5,
                  textAlign: "center",
                }}
              >
                <h2
                  className="banner-title"
                  style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}
                >
                  {event.title}
                </h2>
                <p
                  className="banner-text"
                  style={{
                    marginBottom: "0.2rem",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  Date: {formatDate(event.startDate)} -{" "}
                  {formatDate(event.endDate)}
                </p>
                <p
                  className="banner-text"
                  style={{
                    marginBottom: "0.3rem",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  Location: {event.location}
                </p>
                <Link to="/auth">
                  <button className="button-cool" style={{ marginLeft: 0 }}>
                    Buy Tickets
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div>
        <img
          src={logo1}
          alt="logo"
          className="logo"
          style={{ maxWidth: "300px", maxHeight: "300px" }}
        />
      </div>
      <div>
        <div
          className="button-cool3"
          style={{
            textAlign: "center",
            fontSize: "1.2rem",
            fontStyle: "italic",
            padding: "60px",
            borderRadius: "40px",
          }}
        >
          <h4>
            Welcome to Event Chain – where the future of event management meets
            the security of blockchain technology. At Event Chain, we
            revolutionize the way events are organized, tickets are bought and
            sold, and promotions are conducted. By harnessing the power of
            blockchain, we ensure that every transaction is transparent, secure,
            and tamper-proof.
          </h4>
          <h4>
            Our platform provides a seamless experience for event organizers,
            attendees, and advertisers alike. Whether you're hosting a concert,
            conference, or community gathering, Event Chain offers a trusted
            environment where you can easily manage ticket sales, promote your
            event, and engage with your audience.
          </h4>
          <h4>
            Join us in shaping the future of events – where innovation,
            security, and convenience converge. Explore our platform today and
            discover the endless possibilities with Event Chain.
          </h4>
        </div>
      </div>
      <div
        style={{
          fontSize: "1.2rem",
          fontStyle: "italic",
        }}
      >
        <h3>Sounds interesting?</h3>
        <p>
          Join our community, sign up to create events, buy, sell, and safely
          resale your tickets with blockchain technologies.
        </p>
        <Link to="/register">
          <button className="button-cool">Join Event Chain</button>
        </Link>
        <p>
          If you are already a member,{" "}
          <Link to="/login" style={{ color: "#32C57C", fontSize: "17px" }}>
            Sign in
          </Link>
          .
        </p>
      </div>
      <div
        style={{
          textAlign: "center",
          fontSize: "1.2rem",
          fontStyle: "italic",
        }}
      >
        <h3>Do you have any inquiries or need any help?</h3>
        <Link to="/contact">
          <button className="button-cool">Contact Us</button>
        </Link>
      </div>
    </div>
  );
};

// Función para formatear la fecha
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

export default Home;
