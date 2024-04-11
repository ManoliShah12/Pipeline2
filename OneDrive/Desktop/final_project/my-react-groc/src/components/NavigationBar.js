// NavigationBar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import "./NavigationBar.css";

const NavigationBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          <Link to="/checkout">Checkout</Link>
        </li>
        <li onClick={() => setShowLogin(!showLogin)}>Login</li>
        <li onClick={() => setShowSignup(!showSignup)}>Sign Up</li>
      </ul>
      {showLogin && <LoginForm />}
      {showSignup && <SignupForm />}
    </nav>
  );
};

export default NavigationBar;
