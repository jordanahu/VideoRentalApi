const Movie = require("../../models/Movies");
const {validateMovie} = require("../../utils")

module.exports = async function(req, res){
    let {movieId} = req.params;
    let {errors:idError, message} = validateMovie.validateId(movieId);
    if(idError) return res.status(400).send(message)

    let {title,numberInStock, dailyRentalRate } = req.body;
    let {error} = validateMovie({title, numberInStock, dailyRentalRate})
    if(error) return  res.status(400).send(error.details[0].message)
    
    try{
        let movie = await Movie.findById(movieId);

       await movie.set({title,numberInStock,dailyRentalRate});

       movie.dailyRentalRate+=10;
       await movie.save()

       res.send(movie)

    }catch(err){
        res.status(400).send(err.message)
    }
}