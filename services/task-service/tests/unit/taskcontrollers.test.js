// services/task-service/tests/unit/taskconrollers.test.js
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  tasks,
} = require("../../src/controllers/taskController");

describe("Task Controller", () => {
  beforeEach(() => {
    tasks.length = 0;
  });

  describe("GET /tasks", () => {
    it("should return 200 and ONLY tasks belonging to the user", async () => {
      tasks.push({ id: "1", userId: "123", title: "My Task" });
      tasks.push({ id: "2", userId: "456", title: "Not My Task" });

      const req = { userId: "123" };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await getTasks(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { id: "1", userId: "123", title: "My Task" },
      ]);
    });
  });

  describe("POST /tasks", () => {
    it("should return 201 and create a new task", async () => {
      const req = {
        userId: "123",
        body: { title: "New Task", description: "Task desc" },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await createTask(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(tasks.length).toBe(1);
      expect(tasks[0].title).toBe("New Task");
      expect(tasks[0].userId).toBe("123");
      expect(tasks[0].completed).toBe(false);
    });
  });

  describe("PUT /tasks/:id", () => {
    it("should update an existing task and return 200", async () => {
      tasks.push({
        id: "1",
        userId: "123",
        title: "Old Title",
        completed: false,
      });

      const req = {
        userId: "123",
        params: { id: "1" },
        body: { title: "New Title", completed: true },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await updateTask(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(tasks[0].title).toBe("New Title");
      expect(tasks[0].completed).toBe(true);
    });

    it("should return 404 if the task belongs to someone else (SECURITY TEST)", async () => {
      // Task belongs to user "456"
      tasks.push({ id: "1", userId: "456", title: "Old Title" });

      const req = {
        userId: "123",
        params: { id: "1" },
        body: { title: "Hacked!" },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await updateTask(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(tasks[0].title).toBe("Old Title");
    });
  });

  describe("DELETE /tasks/:id", () => {
    it("should delete a task and return 204", async () => {
      tasks.push({ id: "1", userId: "123", title: "To Delete" });

      const req = { userId: "123", params: { id: "1" } };

      // standard deletes use res.send(), not res.json()! Need a new mock!
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await deleteTask(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(tasks.length).toBe(0);
    });
  });
});
