import React from "react";
import Navbar2 from "../components/Navbar2.jsx";
import Sidebar from "../components/Sidebar.jsx";
import "../styles/NewEntry.css";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
const Settings = ({ userId }) => {
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(
        `https://localhost:4000/api/users/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Account deleted successfully");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        navigate("/");
      } else {
        console.error("Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleDeleteButtonClick = () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmation) {
      setDeleteClicked(true);
      handleDeleteAccount();
    }
  };

  const handleUsernameChange = async () => {
    try {
      const response = await fetch(
        `https://localhost:4000/api/users/${userId}/username`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newUsername }),
        }
      );

      if (response.ok) {
        console.log("Username updated successfully");
        localStorage.setItem("username", newUsername);
        setText("Username updated successfully");
      } else {
        console.error("Failed to update username");
      }
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  // Handle password change
  const handlePasswordChange = async () => {
    try {
      const response = await fetch(
        `https://localhost:4000/api/users/${userId}/password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword }),
        }
      );

      if (response.ok) {
        console.log("Password updated successfully");
        setText("Password updated successfully");
      } else {
        console.error("Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <div className="container-1">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="settings">
        <Navbar2 n1="Settings" />
        <div className="settings-content">
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button className="settings-button" onClick={handlePasswordChange}>
            Change Password
          </button>
          <input
            type="text"
            placeholder="New username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <button className="settings-button" onClick={handleUsernameChange}>
            Change username
          </button>
          <button
            className="settings-button delete-button"
            onClick={handleDeleteButtonClick}
          >
            {deleteClicked ? "Deleting..." : "Delete account"}
          </button>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
