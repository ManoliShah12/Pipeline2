import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // Adjust the path as necessary
import "./index.css"; // If you have a CSS file

// Make sure the element with id 'root' exists in your index.html file
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
