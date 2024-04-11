// SignupForm.js
import React, { useState } from "react";
import axios from "axios";
import "./SignupForm.css"; // Import CSS file

const SignupForm = ({ handleSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup({ email, password });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h1 className="heading">SignUp</h1>
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
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        className="input-field"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button className="button" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
