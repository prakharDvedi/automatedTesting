// auth-service entry point
// TODO Phase 1: Initialize Express app here
// Endpoints to implement:
//   POST /auth/register
//   POST /auth/login
//   GET  /auth/verify  (JWT verification)

const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const users = [];
const jwt = require("jsonwebtoken");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/auth/register", async (req, res) => {
  const { email, password } = req.body;
  const existingUsers = users.find((user) => user.email === email);
  if (existingUsers) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashed = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now().toString(),
    email: email,
    password: hashed,
  };

  users.push(newUser);

  res.status(201).json({ message: "User registered successfully" });
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const existingUser = users.find((user) => user.email === email);
  if (!existingUser) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  if (existingUser) {
    const isPassValid = await bcrypt.compare(password, existingUser.password);
    if (!isPassValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: existingUser.id }, "supersecretkey", {
      expiresIn: "1h",
    });
    return res.status(200).json({ token: token });
  }
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
