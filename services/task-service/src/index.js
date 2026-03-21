// task-service entry point

const express = require("express");
const app = express();

app.use(express.json());
const authMiddleware = require("./middleware/authMiddleware");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("./controllers/taskconrollers");

app.get("/tasks", authMiddleware, getTasks);
app.post("/tasks", authMiddleware, createTask);
app.put("/tasks/:id", authMiddleware, updateTask);
app.delete("/tasks/:id", authMiddleware, deleteTask);

app.get("/", (req, res) => {
  res.send("Task service is running");
});
// only listen if not imported
if (require.main === module) {
  app.listen(3003, () => {
    console.log("Task service started on port 3003");
  });
}

// export for supertest
module.exports = app;
