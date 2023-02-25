const mongoose = require("mongoose");

const slotTimeSchema = mongoose.Schema({
  time:{
    type: String,
    required: true
  }
});

const SlotTime = mongoose.model("SlotTime", slotTimeSchema);
module.exports =  {SlotTime,slotTimeSchema} ;