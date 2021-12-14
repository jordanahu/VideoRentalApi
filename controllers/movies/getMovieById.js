const Movie = require("../../models/Movies");
const { validateMovie } = require("../../utils");

module.exports = async function (req, res) {
  let { movieId } = req.params;
  let { errors: idError, message } = validateMovie.validateId(movieId);
  if (idError) return res.status(400).send(message);

  let movie = await Movie.findById(movieId);

  if (!movie) return res.status(404).send("Cannot find movie");

  res.send(movie);
};
