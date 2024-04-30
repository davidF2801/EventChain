import React from "react";
import contactphoto from "./images/contact-img.png";

const Contact = () => {
  return (
    <div className="container mx-auto p-8">
      <img src={contactphoto} className="w-full mb-8" alt="Contact" />
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
          <p className="mb-2">Phone: +34 612345678</p>
          <p className="mb-2">Email: info@eventchain.com</p>
          <h2 className="text-xl font-semibold mb-2 mt-4">Location</h2>
          <p className="mb-4">Sabadell Nord Train Station</p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2989.175372418736!2d2.106348214838841!3d41.54498877924807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4978dd66f0cc1%3A0x43ad5e2a94659d59!2sSabadell%20Nord!5e0!3m2!1sen!2ses!4v1619915293117!5m2!1sen!2ses"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">Follow Us</h2>
          <h2 className="text-xl font-semibold mb-2">@itsgorkiwiski</h2>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="text-blue-500 hover:text-blue-700">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-700">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-700">
              <i className="fab fa-youtube fa-2x"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
