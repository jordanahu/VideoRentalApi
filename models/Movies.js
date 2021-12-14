const mongoose = require("mongoose");

const { genreSchema, Genre } = require("./Genres");

const moviesSchema = new mongoose.Schema({
  title: String,
  genre: genreSchema,
  numberInStock: {
    type: Number,
    min: 0,
    max: 200,
    required: true,
  },
  dailyRentalRate: {
    type: Number,
    min: 0,
    max: 200,
    required: true,
  },
});

const Movie = mongoose.model("Movies", moviesSchema);

module.exports = Movie;
