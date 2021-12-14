const {Genre} = require("../../models/Genres");

module.exports = async function getGenres(_, res){
    let genres = await Genre.find();

    res.status(200).send(genres);
}

