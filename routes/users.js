const router = require("express").Router();
const {registerUser, getUsers, deleteUserById, updateUserById, loginUser} = require("../controllers");


router.get("/", getUsers);
router.post("/", registerUser);
router.post("/login", loginUser);
router.delete("/:userId", deleteUserById);
router.patch("/:userId", updateUserById);



module.exports = router;