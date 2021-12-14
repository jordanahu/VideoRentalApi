const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    uppercase: true,
  },
  names: {
    type: [String],
    required() {
      return !!this.category;
    },
    validate: {
      validator(value) {
        return !!value;
      },
      message: "Must contain at least one name!",
    },
  },
});

exports.genreSchema = genreSchema;
exports.Genre = mongoose.model("genres", genreSchema);
