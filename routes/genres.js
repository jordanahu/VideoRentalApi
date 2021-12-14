const router = require("express").Router();
const asyncWrapper = require("../middlewares/asyncWrapper");
const {
  getGenres,
  deleteGenre,
  getGenreById,
  postGenre,
  updateGenre,
} = require("../controllers");

router.get("/", asyncWrapper(getGenres));
router.get("/:id", asyncWrapper(getGenreById));
router.post("/", asyncWrapper(postGenre));
router.delete("/:id", asyncWrapper(deleteGenre));
router.patch("/:id", asyncWrapper(updateGenre));


module.exports = router;
