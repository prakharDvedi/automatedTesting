const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../../src/index");
const { users } = require("../../src/controllers/userController");

describe("user service integration tests", () => {
  let token;

  // run before every single test
  beforeEach(() => {
    // reset array so tests dont corrupt each other
    users.length = 0;
    // create a fake jwt so our auth middleware lets us in
    token = jwt.sign({ userId: "123" }, "supersecretkey");
  });

  it("should return 404 getting a profile that doesnt exist", async () => {
    // send actual http request testing the router, middleware, and controller
    const response = await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  it("should create profile via put route", async () => {
    const response = await request(app)
      .put("/users/me")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "prakhar", email: "prakhar@gmail.com" });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("prakhar");
  });

  it("should get an existing profile", async () => {
    // manually inject a user first
    users.push({ userId: "123", name: "prakhar", email: "prakhar@gmail.com" });

    const response = await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("prakhar");
  });
});
