const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  countryName: {
    type: String,
    require: true
  },
  locationIndex: {
    type: Number,
    require: true
  },
  usdTolcu: {
    type: Number,
    require: true
  },
  lcuAbbreviation: {
    type: String,
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

module.exports = Country = mongoose.model("countries", countrySchema);