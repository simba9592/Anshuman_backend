const mongoose = require("mongoose");

const assumptionSchema = new mongoose.Schema({
  fieldName: {
    type: String,
    require: true
  },
  variable: {
    type: Number,
    require: true
  },
  createAt: {
    type: Date, 
    default: Date.now
  },
  updateAt: {
    type: Date, 
    default: Date.now
  }
});

module.exports = Assumption = mongoose.model("assumptions", assumptionSchema);