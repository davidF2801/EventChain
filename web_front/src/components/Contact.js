import React, { useState } from "react";
import contactphoto from "./images/contact-img.png";
import { CgPhone, CgMail } from "react-icons/cg";
import { FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import { AiOutlineEnvironment } from "react-icons/ai";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    subject: "",
    message: "",
  });

  const { name, surname, email, subject, message } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario por correo
    console.log(formData);
  };

  return (
    <div className="container mx-auto p-8" style={{ maxWidth: "70%" }}>
      <div className="mb-8 relative">
        <img
          src={contactphoto}
          className="w-full rounded-lg shadow-lg"
          alt="Contact"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-white text-center bg-gray-900 bg-opacity-75 rounded-lg"></div>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="flex-1">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
            <p className="mb-4 flex items-center text-blue-500">
              <CgPhone className="mr-2 text-3xl" />
              +34 612345678
            </p>
            <p className="mb-4 flex items-center text-blue-500">
              <CgMail className="mr-2 text-3xl" />
              info@eventchain.com
            </p>
            <p className="mb-4 flex items-center text-blue-500">
              <AiOutlineEnvironment className="mr-2 text-3xl" />
              Sabadell Nord Train Station
            </p>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2989.175372418736!2d2.106348214838841!3d41.54498877924807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4978dd66f0cc1%3A0x43ad5e2a94659d59!2sSabadell%20Nord!5e0!3m2!1sen!2ses!4v1619915293117!5m2!1sen!2ses"
            width="50%"
            height="300"
            style={{ border: 3 }}
            allowFullScreen=""
            loading="lazy"
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>

        <div className="flex-1">
          <div>
            <h2 className="text-xl font-semibold mb-2">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-4xl">
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="border-2 border-gray-300 p-3 w-full md:w-2/3 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="surname"
                    value={surname}
                    onChange={handleChange}
                    placeholder="Your Surname"
                    className="border-2 border-gray-300 p-3 w-full md:w-2/3 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="border-2 border-gray-300 p-3 w-full md:w-2/3 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    value={subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="border-2 border-gray-300 p-3 w-full md:w-2/3 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  value={message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  className="border-2 border-gray-300 p-3 w-full md:w-2/3 rounded-lg focus:outline-none focus:border-blue-500 h-32"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="button-cool bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </form>
          </div>
          <h2 className="text-xl font-semibold mb-2">
            Keep Updated and Follow us
          </h2>

          <div className="mb-8">
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-blue-200">
                <FaLinkedin size="2em" style={{ color: "white" }} />
              </a>
              <a href="#" className="text-white hover:text-blue-200">
                <FaInstagram size="2em" style={{ color: "white" }} />
              </a>
              <a href="#" className="text-white hover:text-blue-200">
                <FaYoutube size="2em" style={{ color: "white" }} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
