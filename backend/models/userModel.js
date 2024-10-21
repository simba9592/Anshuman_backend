const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: {
    type: String,
    required: true, 
  },
  password: { 
    type: String, 
    required: true, 
  },
  role: {
    type: String, 
    required: true,
  },
  avatar: {
    type: String, 
    default: ""
  }, 
  status: {
    type: Boolean, 
    default: true
  }, 
  createAt: {
    type: Date, 
  }, 
  updateAt: {
    type: Date, 
  }, 
  logInAt: {
    type: Date, 
  },
  permittedNumber: {
    type: Number
  },
  currentNumber: {
    type: Number
  }
});

module.exports = User = mongoose.model("users", userSchema);
