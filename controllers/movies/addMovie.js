const {validateMovie, pick} = require("../../utils");

const {Genre} = require("../../models/Genres");
const Movie = require("../../models/Movies");



module.exports = async function(req, res){
    let {genreId} = req.params;
    let {title, numberInStock, dailyRentalRate} = req.body;
    let {errors} = validateMovie({title, numberInStock, dailyRentalRate});
    if(errors) return res.status(400).send(errors.details[0].message);

    try{
        let genre = await Genre.findById(genreId);
        if(!genre) return res.status(400).send("Cannot find genre");

        let movie = await new Movie({
            title,
            genre:{
                category:genre.category,
                names:genre.names,
            },
            numberInStock,
            dailyRentalRate,
        });

        await movie.save();

        res.status(200).send(pick(movie, ["title", "numberInStock", "dailyRentalRate"]))

    }catch(err){
        res.status(400).send(err.message)
    }

}
