const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../../src/index");
const { tasks } = require("../../src/controllers/taskconrollers");

describe("task service integration tests", () => {
  let token;

  // set up before each test
  beforeEach(() => {
    tasks.length = 0; // reset array
    // fake login to get past the authMiddleware
    token = jwt.sign({ userId: "123" }, "supersecretkey");
  });

  it("should create a new task via post", async () => {
    // testing POST /tasks over the actual network
    const response = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "my task", description: "testing" });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe("my task");
  });

  it("should fetch user tasks via get", async () => {
    // manually inject a task first
    tasks.push({ id: "1", userId: "123", title: "my task", completed: false });

    // testing GET /tasks
    const response = await request(app)
      .get("/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toBe("my task");
  });

  it("should update task via put", async () => {
    // manually inject a task first
    tasks.push({ id: "1", userId: "123", title: "old task", completed: false });

    // testing PUT /tasks/:id
    const response = await request(app)
      .put("/tasks/1")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "new task", completed: true });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("new task");
    expect(response.body.completed).toBe(true);
  });

  it("should delete task via delete", async () => {
    // manually inject a task first
    tasks.push({
      id: "1",
      userId: "123",
      title: "to delete",
      completed: false,
    });

    // testing DELETE /tasks/:id
    const response = await request(app)
      .delete("/tasks/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
    expect(tasks.length).toBe(0); // proving it was deleted from the array
  });
});
