const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root", // Replace with your MySQL password
  database: "foodapp", 
  port: 3306// Ensure this database exists and matches your setup
});

db.connect((err) => {
  if (err) {
    console.error("Database Connection Error:", err);
    process.exit(1); // Exit process if DB connection fails
  } else {
    console.log("Connected to Database");
  }
});

// API Endpoint: Sign Up
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;


  if (!name || !email || !password) {
    return res.status(400).send({ message: "All fields are required" });
  }

  const checkQuery = "SELECT * FROM fooddata WHERE email = ?";
  db.query(checkQuery, [email], (err, results) => {
    if (err) {
      return res.status(500).send({ message: "Database error", error: err });
    }

    if (results.length > 0) {
      return res.status(409).send({ message: "User already exists" });
    }

    const insertQuery = "INSERT INTO fooddata (name, email, password) VALUES (?, ?, ?)";
    db.query(insertQuery, [name, email, password], (err, results) => {
      if (err) {
        return res.status(500).send({ message: "Error inserting user data", error: err });
      }

      res.status(201).send({ message: "User registered successfully" });
    });
  });
});

// API Endpoint: Sign In
app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Email and password are required" });
  }

  const query = "SELECT * FROM fooddata WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) {
      return res.status(500).send({ message: "Database error", error: err });
    }

    if (results.length === 0) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const user = results[0];
    res.status(200).send({
      message: "Login successful",
      user: { name: user.name, email: user.email },
    });
  });
});

// API Endpoint: Place Order
app.post("/place-order", (req, res) => {
  const { firstName, lastName, email, address, cartDetails, totalAmount } = req.body;

  // Validate input
  if (!firstName || !email || !address || !cartDetails || totalAmount === undefined) {
    return res.status(400).send({ message: "All fields are required" });
  }

  // Insert order details into the database
  const query = `
    INSERT INTO orders (first_name, last_name, email, address, cart_details, total_amount) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [firstName, lastName, email, address, JSON.stringify(cartDetails), totalAmount],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send({ message: "Failed to place order", error: err });
      }
      res.status(201).send({ message: "Order placed successfully" });
    }
  );
});


// Start the Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
