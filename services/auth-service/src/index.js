// auth-service entry point
// TODO Phase 1: Initialize Express app here
// Endpoints to implement:
//   POST /auth/register
//   POST /auth/login
//   GET  /auth/verify  (JWT verification)

const express = require("express");
const app = express();
const { register, login, verify } = require("./controllers/authcontroller");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/auth/register", register);

app.post("/auth/login", login);

app.get("/auth/verify", verify);

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
