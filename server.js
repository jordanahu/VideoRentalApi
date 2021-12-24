const express = require("express");
const app = express();
const morgan = require("morgan");
const debug = require("debug")("app:start-app");
require("dotenv").config();
const connectToDb = require("./startup/db");
const handleErrors = require("./middlewares/handleErrors");
const processRoutes = require("./startup/routes");
const prod = require("./startup/prod");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let {NODE_ENV, PORT} = process.env;

connectToDb(debug);
processRoutes(app);
prod(app);

if (NODE_ENV == "development") {
  app.use(morgan("tiny"));
  debug("morgan enabled...");
}

app.use(handleErrors);

const port = PORT || 3000;
const server =  app.listen(port, () => {
  debug(`listening on port ${port}...`);
});

module.exports = server