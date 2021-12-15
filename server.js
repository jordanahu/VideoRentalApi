const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const debug = require("debug")("app:start-app");
require("dotenv").config();
const connectToDb = require("./startup/db");
const handleErrors = require("./middlewares/handleErrors");
const processRoutes = require("./startup/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

connectToDb(debug);
processRoutes(app);

if (app.get("env") == "development") {
  app.use(morgan("tiny"));
  debug("morgan enabled...");
}

app.use(handleErrors);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  debug(`listening on port ${PORT}...`);
});
