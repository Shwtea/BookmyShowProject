const mongoose = require("mongoose");
const {movieSchema} = require("./movies")
const cinemaSchema = mongoose.Schema({
  cinema_name: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  movies: [
    {
      movie: movieSchema,
    },
  ], 
});

const Cinema = mongoose.model("Cinema", cinemaSchema);
module.exports =  Cinema ;