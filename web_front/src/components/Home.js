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
        const firstThreeEvents = eventData.slice(0, 3);
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
    }, 3000); // Modificar la velocidad de paso

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
      <img
        src={logo1}
        alt="logo"
        className="logo"
        style={{ maxWidth: "300px", maxHeight: "200px" }}
      />
      <div
        className="introduction-container"
        style={{
          textAlign: "center",
          fontSize: "1.2rem",
          fontStyle: "italic",
          padding: "50px",
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
          Join us in shaping the future of events – where innovation, security,
          and convenience converge. Explore our platform today and discover the
          endless possibilities with Event Chain.
        </h4>
      </div>
      <div className="event-content2">
        <h2 className="heading text-3xt mb-0 mt-1">The Main Events</h2>
        <Slider ref={sliderRef} {...settings} className="slider">
          {events.map((event, index) => (
            <Link to="/events" key={index} className="event-link">
              <div className="event-container">
                <div className="event">
                  <h2 className="event-title">{event.title}</h2>
                  <p>Date: {event.date}</p>
                  <p>Location: {event.location}</p>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
        <Link to="/events">
          <button className="button-cool">See more</button>
        </Link>
        <div
          style={{
            textAlign: "center",
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
    </div>
  );
};

export default Home;
