const mongoose = require("mongoose");


module.exports = function(debug){
    mongoose
  .connect(process.env.URI)
  .then(() => debug("Connected to database..."))
}