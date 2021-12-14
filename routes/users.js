const router = require("express").Router();
const asyncWrapper = require("../middlewares/asyncWrapper");
const {
  registerUser,
  getUsers,
  deleteUserById,
  updateUserById,
  loginUser,
} = require("../controllers");

router.get("/", asyncWrapper(getUsers));
router.post("/", asyncWrapper(registerUser));
router.post("/login", asyncWrapper(loginUser));
router.delete("/:userId", asyncWrapper(deleteUserById));
router.patch("/:userId", asyncWrapper(updateUserById));

module.exports = router;
