const router = require("express").Router();
const {getMovies, addMovie, getMovieById, updateMovieById} = require("../controllers");


router.get("/", getMovies);
router.post("/:genreId", addMovie);
router.get("/:movieId", getMovieById)
router.patch("/:movieId", updateMovieById)




module.exports = router;