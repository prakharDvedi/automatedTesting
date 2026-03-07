// tests/unit/authController.test.js

const { email } = require("zod");
const { register, users } = require("../../src/controllers/authController");

const bcrypt = require("bcryptjs");

describe("auth controller - REGISTER", () => {
  beforeEach(() => {
    users.length = 0;
  });

  it("successfully register a new user ", async () => {
    const mockReq = {
      body: {
        email: "prakhar@gmail.com",
        password: "123456",
      },
    };

    it("should retunrn 400 if already exists", async () => {
      // setting up the initial condition of user
      users.push({
        id: "123",
        email: "prakhar@gmail.com",
        password: "abcs3",
      });

      //creating a fake request
      const mockReq = {
        body: {
          email: "prakhar@gmail.com",
          password: "dasjdsa",
        },
      };

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // call the function
      await register(mockReq, mockRes);

      //assert what the controller did ... we dont check by find we expect that the controller noticed this and sent 400

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "already exists",
      });
    });

    await register(mockReq, mockRes);
    expect(users.length).toBe(1);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "User registered successfully",
    });
  });
});
