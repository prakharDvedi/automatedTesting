// task-service entry point
// TODO Phase 1: Initialize Express app here
// Endpoints to implement:
//   GET    /tasks          (all tasks for authenticated user)
//   POST   /tasks
//   PUT    /tasks/:id
//   DELETE /tasks/:id

const express = require("express");
const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Task service is running");
});

app.listen(3003, () => {
  console.log("Task service started on port 3003");
});
