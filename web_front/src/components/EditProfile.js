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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userSaved, setUserSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [changingUsername, setChangingUsername] = useState(false);
  const [changingEmail, setChangingEmail] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login";
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8888/users/userInfo", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + isAuthenticated,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData[0]);
        setUsername(jsonData[0].username);
        setEmail(jsonData[0].email);
      } catch (error) {
        setError(true);
        setErrorMessage("Error fetching user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    if (!isAuthenticated) {
      return null;
    }
    fetchData();
  }, [isAuthenticated]);

  async function updateUser(userData) {
    try {
      const response = await fetch("http://localhost:8888/users/updateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + isAuthenticated,
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("User update failed");
      }
      setUserSaved(true);
      setTimeout(() => {
        navigate("/MyProfile");
      }, 500); // Redirigir a la página de perfil después de 0.5 segundos
    } catch (error) {
      setError(true);
      setErrorMessage("Error updating user. Please try again.");
    }
  }

  const handleSaveUser = (e) => {
    e.preventDefault();
    setError(false);
    setErrorMessage("");

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

  const handleChangePassword = (e) => {
    e.preventDefault();
    navigate("/change-password");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      {!userSaved && (
        <div>
          <h2 className="heading">Edit user info</h2>
          <div className="button-cool2">
            <p>Username: {username}</p>
            <button
              className="button"
              onClick={() => setChangingUsername(true)}
            >
              Edit Username
            </button>
            {changingUsername && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Update username logic here
                }}
              >
                <textarea
                  className="form"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </form>
            )}
          </div>
          <div className="button-cool2">
            <p>Email: {email}</p>
            <button className="button" onClick={() => setChangingEmail(true)}>
              Edit Email
            </button>
            {changingEmail && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Update email logic here
                }}
              >
                <textarea
                  className="form"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </form>
            )}
          </div>
          <div className="button-cool2">
            <button
              className="button-cool3"
              onClick={() => setChangingPassword(true)}
            >
              Change Password
            </button>
            {changingPassword && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Update password logic here
                }}
              >
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New Password"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm New Password"
                  />
                </div>
              </form>
            )}
          </div>
          <button className="button-cool" onClick={handleSaveUser}>
            Save user info
          </button>
          {error && <p className="error">{errorMessage}</p>}
        </div>
      )}
      {userSaved && <h2 className="saved">User info edited successfully</h2>}
    </div>
  );
}

export default EditProfile;
