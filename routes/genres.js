const router = require("express").Router();
const {getGenres,
    deleteGenre,
    getGenreById,
    postGenre,
    updateGenre} = require("../controllers")


router.get("/", getGenres);
router.get("/:id", getGenreById)
router.post("/", postGenre);
router.delete("/:id", deleteGenre);
router.patch("/:id", updateGenre);



module.exports = router;
