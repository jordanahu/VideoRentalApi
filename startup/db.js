const mongoose = require("mongoose");
require("dotenv").config();
let {URI, TEST_URI, NODE_ENV} = process.env;

module.exports = function(debug){
    let testEnv = false;
    if(NODE_ENV == "test") testEnv = true;
   
    mongoose
    .connect(testEnv ? TEST_URI : URI)
    .then(() => debug(testEnv ? "Connected to Test database...": "Connected to database..."))
    .catch((e)=>debug(`There was an error connect to the databse. Details:${e.message}`));

}

