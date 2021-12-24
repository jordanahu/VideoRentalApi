const router = require("express").Router();
const asyncWrapper = require("../middlewares/asyncWrapper");
const authorize = require("../middlewares/authorize");
const {
  getMovies,
  addMovie,
  getMovieById,
  updateMovieById,
} = require("../controllers");

router.get("/", asyncWrapper(getMovies));
router.post("/:genreId",authorize, asyncWrapper(addMovie));
router.get("/:movieId", asyncWrapper(getMovieById));
router.patch("/:movieId", asyncWrapper(updateMovieById));

module.exports = router;
