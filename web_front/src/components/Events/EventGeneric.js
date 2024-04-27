import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EventGeneric = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8888/events");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        console.log("Events:", jsonData);
        setData(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, []);

  return (
    <div>
      <header className="Header bg-blue-500 text-white py-2 px-4 flex justify-between items-center">
        <nav className="Navbar">
          <ul className="Navbar-links flex space-x-4">
            {/* Subcategorías */}
            <li>
              <Link to="/musica" className="hover:text-blue-700">
                Música
              </Link>
            </li>
            <li>
              <Link to="/teatro" className="hover:text-blue-700">
                Teatro
              </Link>
            </li>
            <li>
              <Link to="/festivales" className="hover:text-blue-700">
                Festivales
              </Link>
            </li>
            <li>
              <Link to="/deportes" className="hover:text-blue-700">
                Deportes
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <h1 className="text-3xl font-bold mb-2 mt-4">All events</h1>
      {loading && <div>Loading...</div>}
      {error && (
        <div>
          <h1>Error: {error.message}</h1>
        </div>
      )}
      {data && (
        <div className="grid grid-cols-3 gap-4">
          {data.map((event, index) => (
            <div key={index} className="event">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-auto"
              />
              <h2 className="text-lg font-semibold">{event.title}</h2>
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
              <Link to={`/auth`} state={event}>
                <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Buy tickets
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventGeneric;
