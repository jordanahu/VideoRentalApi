const Joi = require("joi");
const mongoose = require("mongoose");
const fs = require("fs");
const { Readable } = require("stream");
const { promisify } = require("util");

const genreSchema = Joi.object({
  category: Joi.string().required(),
  names: Joi.array().items(Joi.string()),
});

const userSchema = function (nameRequired) {
  return Joi.object({
    name: nameRequired && Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(200).required(),
  });
};

const movieSchema = Joi.object({
  title: Joi.string().required(),
  dailyRentalRate: Joi.number().min(5).max(200).required(),
  numberInStock: Joi.number().min(5).max(200).required(),
});

function validateMovie(movieObj) {
  return movieSchema.validate(movieObj);
}

validateMovie.validateId = function (id) {
  let results = {};
  if (!mongoose.Types.ObjectId.isValid(id)) {
    results.errors = true;
    results.message = "Invalid ID";
  } else {
    (results.errors = false), (results.message = "");
  }

  return results;
};

function validateGenre(genre) {
  return genreSchema.validate(genre);
}

function pick(obj, arr) {
  let finalObj = {};
  for (let key in obj) {
    if (arr.includes(key)) {
      finalObj[key] = obj[key];
    }
  }

  return finalObj;
}

function validateUser(info, nameRequired = true) {
  return userSchema(nameRequired).validate(info);
}

async function logErrors(message, trace) {
  let data = `{message:${message}, trace:${trace}}\n`;
  let saveTo = "C:/Users/JORDAN AHU MAWULI/Desktop/videoRentalApi/error.log";

  let exists = await promisify(fs.exists)(saveTo);
  if (exists) return await promisify(fs.appendFile)(saveTo, data);

  let infoStream = Readable.from([data]);
  let errorFile = fs.createWriteStream(saveTo);
  infoStream.pipe(errorFile);
}
module.exports = {
  validateGenre,
  validateMovie,
  validateUser,
  pick,
  logErrors,
};
