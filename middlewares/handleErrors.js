const {logErrors} = require("../utils")


process.on(("uncaughtException" || "unhandledRejection"), (error)=>{
  logErrors(error.message, error)
})
module.exports = function (error, _, res, _1) {
  logErrors(error.message, error)
  res.status(500).send(error.message);
 
};
