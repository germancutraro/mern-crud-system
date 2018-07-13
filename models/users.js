const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 33,
    trim: true
  },
  genre: {
    type: String,
    required: true,
    maxlength: 6,
    trim: true,
    enum: ['Male', 'Female', 'male', 'female']
  },
  age: {
    type: Number,
    min: 1,
    max: 120
  }
});

module.exports = mongoose.model('users', userSchema);



