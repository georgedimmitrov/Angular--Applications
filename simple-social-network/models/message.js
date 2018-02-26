const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Message', messageSchema);