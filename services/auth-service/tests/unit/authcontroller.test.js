// tests/unit/authController.test.js

const {
  register,
  login,
  verify,
  users,
} = require("../../src/controllers/authcontroller");

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
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await register(mockReq, mockRes);
    expect(users.length).toBe(1);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "User registered successfully",
    });
  });

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
      message: "User already exists",
    });
  });
});

describe("auth controller - LOGIN", () => {
  beforeEach(() => {
    users.length = 0;
  });
  it("should login in user", async () => {
    // setting up the initial condition of user
    users.push({
      id: "123",
      email: "prakhar@gmail.com",
      password: bcrypt.hashSync("abcs3", 10),
    });

    // creating fake request
    const mockReq = {
      body: {
        email: "prakhar@gmail.com",
        password: "abcs3",
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // call the function
    await login(mockReq, mockRes);

    //return 200 ok and a token

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      token: expect.any(String),
    });
  });

  it("should return 400 if invalid ", async () => {
    users.push({
      id: "123",
      email: "prakhar@gmail.com",
      password: bcrypt.hashSync("abcs3", 10), // The *real* password is "abcs3"
    });

    const mockReq = {
      body: {
        email: "prakhar@gmail.com",
        password: "wrongpassword",
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await login(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Invalid credentials",
    });
  });
});
