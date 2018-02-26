const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongooseUniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  messages: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Message'
  }]
});

userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', userSchema);