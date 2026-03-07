const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const users = [];
const register = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashed = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now().toString(),
    email: email,
    password: hashed,
  };

  users.push(newUser);

  res.status(201).json({ message: "User registered successfully" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = users.find((user) => user.email === email);
  if (!existingUser) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  if (existingUser) {
    const isPassValid = await bcrypt.compare(password, existingUser.password);
    if (!isPassValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: existingUser.id }, "supersecretkey", {
      expiresIn: "1h",
    });
    return res.status(200).json({ token: token });
  }
};

const verify = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "supersecretkey");
    return res
      .status(200)
      .json({ message: "User is authenticated", userId: decoded.userId });
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized" });
  }
};

module.exports = { register, login, verify, users };
