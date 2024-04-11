import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import CheckoutScreen from "./components/CheckoutScreen";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import PlaceOrder from "./components/PlaceOrder";
import Pantry from "./components/Pantry";
import axios from "axios";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async ({ email, password }) => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      if (response.data.message === "Login successful.") {
        setIsAuthenticated(true); // Set authenticated state to true
      }
    } catch (error) {
      console.error("Login error:", error.response.data.error);
      throw error; // Rethrow the error to be caught in LoginForm
    }
  };
  const handleAddToCart = async (item) => {
    try {
      await axios.post("http://localhost:3001/cart", {
        itemId: item.id,
        quantity: 1, // or a selected quantity if your UI allows selecting it
      });
      // Handle UI update or confirmation message
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <NavigationBar
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
      />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Home handleAddToCart={handleAddToCart} />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/cart"
          element={
            isAuthenticated ? <Cart /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/checkout"
          element={
            isAuthenticated ? (
              <CheckoutScreen />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/place-order"
          element={
            isAuthenticated ? <PlaceOrder /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/pantry"
          element={
            isAuthenticated ? <Pantry /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Home handleAddToCart={handleAddToCart} />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginForm handleLogin={handleLogin} />
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? <SignupForm /> : <Navigate replace to="/" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
