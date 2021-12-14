const { Genre } = require("../../models/Genres");

module.exports = async function (req, res) {
  let { id } = req.params;
  let genre = await Genre.findById(id);
  res.status(200).send(genre);
};
