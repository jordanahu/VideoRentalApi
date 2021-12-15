const {logErrors} = require("../utils")

module.exports = function (error, _, res, _) {
  logErrors(error.message, error)
  res.status(500).send(error.message);
 
};
