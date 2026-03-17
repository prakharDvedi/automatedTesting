const {
  getProfile,
  updateProfile,
  users,
} = require("../../src/controllers/userController");

describe("auth controller - Get", () => {
  beforeEach(() => {
    users.length = 0;
  });
  it("should return 200 if found", async () => {
    users.push({
      name: "testname",
      email: "test@gmail.com",
      userId: "123",
      password: "testpassword",
    });
    const req = {
      userId: "123",
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await getProfile(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(users[0]);
  });

  it("should return 404 if not found", async () => {
    const req = {
      userId: "456",
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await getProfile(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });
});

describe("auth controller - put", () => {
  beforeEach(() => {
    users.length = 0;
  });
  it("should return 200 if found", async () => {
    users.push({
      name: "test",
      email: "test@gmail.com",
      userId: "123",
      password: "testpassword",
    });
    const req = {
      userId: "123",
      body: {
        name: "test",
        email: "test@gmail.com",
        password: "testpassword",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await updateProfile(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(users[0]);
  });
});
