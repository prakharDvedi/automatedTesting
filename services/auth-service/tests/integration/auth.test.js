// services/auth-service/tests/integration/auth.test.js
const request = require("supertest");
const app = require("../../src/index");

describe("Auth Service - Integration Tests", () => {
  it("should register a new user successfully", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({ email: "integration@test.com", password: "password123" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "User registered successfully",
    );
  });

  it("should fail to register the same user again", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({ email: "integration@test.com", password: "password123" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "User already exists");
  });

  it("should login the user and return a JWT", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ email: "integration@test.com", password: "password123" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should fail login with wrong password", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ email: "integration@test.com", password: "wrongpassword" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Invalid credentials");
  });
});
