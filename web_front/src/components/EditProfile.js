// NewEvent.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineFileUpload } from "react-icons/md";
import { v4 as uuidv4 } from "uuid"; // Importar uuid
import useRequireAuth from "../authenticate_utils.js";
import Cookies from "js-cookie";

function EditProfile() {
  const isAuthenticated = useRequireAuth();
  const [data, setData] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userSaved, setUserSaved] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [redirectToError, setRedirectToError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login";
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("isAuthenticated:", isAuthenticated);
        const response = await fetch(
          "http://51.21.149.50:8888/users/userInfo",
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + isAuthenticated,
            },
          }
        );
        console.log("Response:", response);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        console.log("User info:", jsonData);
        setData(jsonData[0]);
      } catch (error) {
        setError(error);
        setRedirectToError(true); // Establecer redirectToError a true en caso de error
      } finally {
        setLoading(false);
      }
    };
    if (isAuthenticated == null) {
      return null;
    }
    if (!isAuthenticated) {
      return null;
    }
    fetchData();
  }, [isAuthenticated]);

  async function updateUser(userData) {
    try {
      const response = await fetch(
        "http://51.21.149.50:8888/users/updateUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + isAuthenticated,
          },
          body: JSON.stringify(userData),
        }
      );
      const data = await response.json();
      console.log("User update response:", data);
      if (!response.ok) {
        throw new Error("User update failed");
      }
      console.log("User updated successfully:", userData);
      setUserSaved(true);
    } catch (error) {
      console.error("Error updating user:", error);
      setError(true);
      setErrorMessage("Error updating user. Please try again."); // Establecer un mensaje de error genérico
    }
  }

  const handleSaveUser = (e) => {
    e.preventDefault();

    // Reset error state
    setError(false);
    setErrorMessage("");

    // Validation of fields
    if (!username || !email) {
      setError(true);
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    const userData = {
      username,
      email,
    };

    updateUser(userData);
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (userSaved) {
    Cookies.remove("token");
  }

  return (
    <div className="container">
      {!userSaved && <h2 className="heading">Edit user info</h2>}
      {userSaved && <h2 className="saved">User info edited successfully</h2>}
      {error && <h3 className="failed">{errorMessage}</h3>}{" "}
      {/* Mostrar el mensaje de error */}
      {!userSaved && data && (
        <form className="form">
          <p className="label">{data.username}</p>
          <div className="form-group">
            <input
              className="input"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <p className="label">{data.email}</p>
          <div className="form-group">
            <input
              className="input"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className="button" type="submit" onClick={handleSaveUser}>
            Save user info
          </button>
        </form>
      )}
    </div>
  );
}

export default EditProfile;
