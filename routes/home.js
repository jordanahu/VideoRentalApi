const router = require("express").Router();
const authorize = require("../middlewares/authorize");
const User = require("../models/Users");
const asyncWrapper = require("../middlewares/asyncWrapper");

router.get("/", authorize, asyncWrapper(async (req, res) => {
  let { email } = req.user;
  let { name } = await User.findOne({ email }).select("name -_id");
  console.log("name is ", name);
  res.send(`<h1>WELCOME ${name}, TO JAM'S VIDEO RENTAL API</h1>`);
}));

module.exports = router;
