const User = require("../../models/Users");
const bcrypt = require("bcrypt");

const [{ pick }, { validateId }] = [
  (util = require("../../utils")),
  util.validateMovie,
];

module.exports = async function (req, res) {
  let [{ userId: id }, { name, email, password }] = [req.params, req.body];
  let { error } = validateId(id);
  if (error) return res.status(400).send(error.details[0].message);

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        name,
        email,
        password: hashedPassword,
      },
    },
    { new: true }
  );
  if (!user) return res.status(400).send("user not found!");

  res.status(201).send(pick(user, ["name", "email"]));
};
