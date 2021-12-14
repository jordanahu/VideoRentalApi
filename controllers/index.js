const getGenres = require('./genres/getGenres');
const deleteGenre = require('./genres/deleteGenre');
const postGenre = require('./genres/postGenre');
const updateGenre = require('./genres/updateGenre');
const getGenreById = require('./genres/getGenreById');
const getMovies = require('./movies/getMovies');
const addMovie = require('./movies/addMovie');
const getMovieById = require('./movies/getMovieById');
const registerUser = require("./users/registerUser");
const updateMovieById = require("./movies/updateMovieById");
const getUsers = require("./users/getUsers");
const deleteUserById = require("./users/deleteUserById");
const updateUserById = require("./users/updateUserById");
const loginUser = require("./users/loginUser");



module.exports = {
    getGenres,
    deleteGenre,
    postGenre,
    updateGenre,
    getGenreById,
    getMovies,
    addMovie,
    getMovieById,
    registerUser,
    updateMovieById, 
    getUsers,
    deleteUserById,
    updateUserById,
    loginUser,

}