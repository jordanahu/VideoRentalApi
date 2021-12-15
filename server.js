const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const debug = require("debug")("app:start-app");
const mongoose = require("mongoose");
const {logErrors} = require("./utils");
require("dotenv").config();

mongoose.connect(process.env.URI)
.then(()=>debug("Connected to database..."))
.catch((error)=>debug(error));
const handleErrors = require("./middlewares/handleErrors")
const {handleGenres, handleHome, handleMovies, handleUsers} = require("./routes");
app.use(express.json());
app.use(express.urlencoded({extended:true}));

if(app.get("env") == "development"){
    app.use(morgan("tiny"));
    debug("morgan enabled...")
}


app.use(helmet());


app.use("/", handleHome);
app.use("/api/genres", handleGenres);
app.use("/api/movies", handleMovies);
app.use("/api/users", handleUsers);

app.use(handleErrors);
process.on(("uncaughtException" || "unhandledRejection"), (error)=>{
  logErrors(error.message, error)
})


const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>debug(`listening on port ${PORT}...`))






