import { set } from "mongoose";
import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [text, setText] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/users/login", {
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
    <div>
      {loginSuccess || localStorage.getItem("username") ? (
        <Navigate to="/home" replace />
      ) : (
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            ></input>
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            ></input>
          </div>
          <button type="submit">Login</button>
          <div className="signup-link">
            <p>
              Don't have an account? <Link to="/">Signup</Link> now!
            </p>
            <p>{text}</p>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
