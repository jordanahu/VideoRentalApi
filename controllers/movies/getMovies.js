const Movie = require("../../models/Movies");

module.exports = async function (req, res) {
  let movies = await Movie.find();

  res.status(200).send(movies);
};
