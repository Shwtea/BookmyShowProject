const mongoose = require("mongoose");
const { slotTimeSchema } = require("./slotTime");


const movieSchema = mongoose.Schema({
  movie_name: {
    type: String,
    require: true
  },
  slot_time:[]
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports =  { Movie , movieSchema} ;