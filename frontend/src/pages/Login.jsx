import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import "../styles/Signup.css";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [text, setText] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:4000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("login successful");
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("username", data.username);
        setLoginSuccess(true);
      } else {
        setText(data.message || "Login failed , Invalid username or password");
      }
    } catch (error) {
      console.error("error checking username/password:", error);
    }
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="wrapper">
      {loginSuccess || localStorage.getItem("username") ? (
        <Navigate to="/home" replace />
      ) : (
        <>
          <form onSubmit={handleLogin} className="signup-page">
            <div className="head">
              <h1>Fin-Z</h1>
              <p>Track smarter, spend wiser, live better.</p>
            </div>

            <h2>Login</h2>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
              ></input>
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              ></input>
              <FaLock className="icon" />
            </div>
            <div className="button">
              <button type="submit">Login</button>
            </div>

            <div className="login-link">
              <p>
                Don't have an account? <Link to="/">Signup</Link> now!
              </p>
              <p className="red-text">{text}</p>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
