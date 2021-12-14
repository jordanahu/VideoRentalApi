const { Genre } = require("../../models/Genres");

module.exports = async function deleteGenre(req, res) {
  let { id } = req.params;
  let deletedGenre = await Genre.findByIdAndRemove(id);

  res.send(deletedGenre);

  res.status(400).send("Invalid ID");
};
