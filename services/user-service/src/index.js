// user-service entry point
// TODO Phase 1: Initialize Express app here
// Endpoints to implement:
//   GET    /users/:id
//   POST   /users
//   PUT    /users/:id
//   DELETE /users/:id

const express = require("express");
const app = express();
const authMiddleware = require("./middleware/authMiddleware");

app.use(express.json());
// Add this to index.js
const { getProfile, updateProfile } = require("./controllers/userController");

app.get("/users/me", authMiddleware, getProfile);
app.put("/users/me", authMiddleware, updateProfile);

app.get("/", (req, res) => {
  res.send("User service is running");
});

app.listen(3002, () => {
  console.log("User service started on port 3002");
});
