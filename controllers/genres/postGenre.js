const { Genre } = require("../../models/Genres");
const { validateGenre } = require("../../utils");

module.exports = async function postGenre(req, res) {
  let { category, names } = req.body;
  let genre = { category, names };
  let { error } = validateGenre(genre);
  if (error) return res.status(400).send(error.details[0].message);

  let newGenre = await new Genre(genre);
  await newGenre.save();

  res.status(201).send(newGenre);
};
