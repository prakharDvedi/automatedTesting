//stores user profile data

const users = [];

const getProfile = (req, res) => {
  const userId = req.userId;
  const profile = users.find((user) => user.userId === userId);
  if (!profile) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json(profile);
};

const updateProfile = (req, res) => {
  const userId = req.userId;
  const { name, email } = req.body;
  const profile = users.findIndex((user) => user.userId === userId);
  if (profile === -1) {
    const newProfile = { userId, name, email };
    users.push(newProfile);
    return res.status(201).json(newProfile);
  } else {
    users[profile].name = name;
    users[profile].email = email;
    return res.status(200).json(users[profile]);
  }
};

module.exports = { getProfile, updateProfile, users };
