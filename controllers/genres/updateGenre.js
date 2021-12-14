const { Genre } = require("../../models/Genres");
const {
  validateGenre,
  validateMovie: { validateId },
} = require("../../utils");

module.exports = async function updateGenre(req, res) {
  let [{ id }, { category, names }] = [req.params, req.body];
  let results = validateId(id);
  if (results.errors) return res.status(400).send(results.message);

  let { error } = validateGenre({ category, names });
  if (error) return res.status(400).send(error.details[0].message);

  let genre = await Genre.findByIdAndUpdate(
    id,
    {
      $set: {
        category,
        names,
      },
    },
    { new: true }
  );

  if (!genre) throw new Error("Genre not found!");
  res.status(200).send(genre);
};
