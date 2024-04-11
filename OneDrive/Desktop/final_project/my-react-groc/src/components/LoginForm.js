// LoginForm.js
import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css"; // Import CSS file
import { useNavigate } from "react-router-dom";

const LoginForm = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin({ email, password });
      navigate("/"); // Redirect on successful login
    } catch (error) {
      setError(error.response?.data?.error || "An unexpected error occurred.");
      console.error("Login error:", error);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      {loginMessage && <p>{loginMessage}</p>} {/* Display login message */}
      {error && <p>{error}</p>}
      <h1 className="heading">Login</h1>
      <input
        className="input-field"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="input-field"
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        required
      />
      <button className="button" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
