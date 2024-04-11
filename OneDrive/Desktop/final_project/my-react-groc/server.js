// server.js
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
// Enable CORS for all routes
app.use(cors());
// Database connection pool
const pool = mysql.createPool({
  host: "database-1.cfmgoacyae6a.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "reactnative",
  database: "login",
});

// Signup endpoint
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user already exists in the database
    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ error: "User with this email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(password);
    // Insert the new user into the database
    await pool.query("INSERT INTO users (email, password) VALUES (?, ?)", [
      email,
      hashedPassword,
    ]);
    // Return success response
    console.log(hashedPassword);
    res.status(201).json({ message: "User signed up successfully." });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  // Check if the request method is POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, password } = req.body;
  try {
    // Retrieve user from the database based on the provided email
    const [userData] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    console.log(userData);
    // Check if user exists
    if (!userData || userData.length === 0) {
      // No user found with the provided email
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Accessing properties of the first (and hopefully only) element from the userData array
    const user = userData[0];
    console.log(user);
    console.log(user.email);
    // Check if the user's email and password fields exist
    if (!user.email || !user.password) {
      // Email or password field missing in user data
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Compare the stored hashed password with the provided password
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch);
    if (passwordMatch) {
      // Passwords match, login successful
      console.log("1", passwordMatch);
      console.log("login successful");
      //res.redirect("/Home.js");
      //res.send("${user} is logged in!");
      return res.status(200).json({ message: "Login successful." });

      //return res.json({ message: "Login successful." });
      // res.redirect("/home");
    } else {
      // Passwords do not match
      res.status(401).json({ error: "Invalid email or password." });
    }
    userData.length == 0;
  } catch (error) {
    // Handle database query error
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});
app.post("/pantry", async (req, res) => {
  const { userId, itemName, quantity } = req.body;
  try {
    await pool.query(
      "INSERT INTO PantryItems (userId, itemName, quantity) VALUES (?, ?, ?)",
      [userId, itemName, quantity]
    );
    res.status(201).json({ message: "Item added to pantry." });
  } catch (error) {
    console.error("Error adding item to pantry:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Endpoint to add item to cart
app.get("/cart", async (req, res) => {
  try {
    // Assuming you have a CartItems table with userId, productId, and quantity columns
    const [cartItems] = await pool.query(
      "SELECT * FROM CartItems WHERE userId = ?",
      [req.user.id]
    );
    res.json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.get("/groceries", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM GroceryItems");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching grocery items:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Endpoint to place an order
app.post("/orders_1", async (req, res) => {
  const { userId, details, status } = req.body;
  try {
    await pool.query(
      "INSERT INTO Orders (userId, details, status) VALUES (?, ?, ?)",
      [userId, details, status]
    );
    res.status(201).json({ message: "Order placed successfully." });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});
// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
