const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const User = require('./user');

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

messageSchema.post('remove', function(message) {
  User.findById(message.user)
    .then((user) => {
      user.messages.pull(message);
      user.save();
    })
    .catch((error) => {
      console.error(error);
    });
});

module.exports = mongoose.model('Message', messageSchema);