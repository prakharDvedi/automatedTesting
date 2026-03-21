// auth-service entry point

const express = require("express");
const app = express();
const { register, login, verify } = require("./controllers/authcontroller");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/auth/register", register);

app.post("/auth/login", login);

app.get("/auth/verify", verify);

if (require.main === module) {
  app.listen(3001, () => {
    console.log("Auth service started on port 3001");
  });
}

module.exports = app;
