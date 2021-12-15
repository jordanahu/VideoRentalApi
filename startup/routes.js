const { handleGenres, handleHome, handleMovies, handleUsers } = require("../routes");

module.exports = function (app) {
  app.use("/", handleHome);
  app.use("/api/genres", handleGenres);
  app.use("/api/movies", handleMovies);
  app.use("/api/users", handleUsers);
};
