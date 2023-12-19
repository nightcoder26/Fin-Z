import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Navigate } from "react-router-dom";
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [text, setText] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleSignUp = async (e) => {
    console.log("signup button clicked");
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("signup successful");
        localStorage.setItem("username", username);
        setSignupSuccess(true);
      } else {
        // alert(data.message || "Signup failed");
        setText(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
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
      {signupSuccess || localStorage.getItem("username") ? (
        <Navigate to="/home" replace />
      ) : (
        <form onSubmit={handleSignUp}>
          <h1>SignUp</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <button type="submit">SignUp</button>
          <div className="login-link">
            <p>
              Have an account already? <Link to="/login">Login</Link>
            </p>
            <p>{text}</p>
          </div>
        </form>
      )}
    </div>
  );
};

export default SignUp;
