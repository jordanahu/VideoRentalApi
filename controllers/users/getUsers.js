const User = require("../../models/Users");

module.exports = async function (req, res) {
  const users = await User.find();

  res.status(200).send(users);
};
