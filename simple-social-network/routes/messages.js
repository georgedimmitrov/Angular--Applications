const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Message = require('../models/message');
const User = require('../models/user');

// get all messages from DB
router.get('/', (req, res) => {
  Message.find()
    .populate('user', 'firstName')
    .exec()
    .then((messages) => {
      res.status(200).json({
        message: 'Success',
        obj: messages
      });
    })
    .catch((error) => {
      return res.status(500).json({
        title: 'An error occurred',
        error
      });
    });
});

router.use('/', (req, res, next) => {
  jwt.verify(req.query.token, process.env.SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        title: 'Not authenticated',
        error
      });
    }

    next();
  });
});

// add new message in DB
router.post('/', (req, res) => {
  const decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id)
    .then((user) => {
      const message = new Message({
        content: req.body.content,
        user
      });

      message.save()
        .then((result) => {
          user.messages.push(result);
          user.save();

          res.status(201).json({
            message: 'Saved message',
            obj: result
          });
        })
        .catch((error) => {
          return res.status(500).json({
            title: 'An error occurred',
            error
          });
        });
    })
    .catch((error) => {
      return res.status(500).json({
        title: 'An error occurred',
        error
      });
    });
});

// update a message
router.patch('/:id', (req, res) => {
  const decoded = jwt.decode(req.query.token);
  Message.findById(req.params.id)
    .then((message) => {
      if (!message) {
        return res.status(500).json({
          title: 'No message found!',
          error: {message: 'Message not found!'}
        });
      }

      if (message.user !== decoded.user._id) {
        return res.status(401).json({
          title: 'Not authorized!',
          error: {message: 'Cannot delete messages of other users'}
        });
      }

      message.content = req.body.content;
      message.save()
        .then((result) => {
          res.status(200).json({
            message: 'Updated message',
            obj: result
          });
        })
        .catch((error) => {
          return res.status(500).json({
            title: 'An error occurred',
            error
          });
        });
    })
    .catch((error) => {
      return res.status(500).json({
        title: 'An error occurred',
        error
      });
    });
});

router.delete('/:id', (req, res) => {
  const decoded = jwt.decode(req.query.token);
  Message.findById(req.params.id)
    .then((message) => {
      if (!message) {
        return res.status(500).json({
          title: 'No message found!',
          error: {message: 'Message not found!'}
        });
      }

      if (message.user !== decoded.user._id) {
        return res.status(401).json({
          title: 'Not authorized!',
          error: {message: 'Cannot delete messages of other users'}
        });
      }

      message.remove()
        .then((result) => {
          res.status(200).json({
            message: 'Deleted message',
            obj: result
          });
        })
        .catch((error) => {
          return res.status(500).json({
            title: 'An error occurred',
            error
          });
        });
    })
    .catch((error) => {
      return res.status(500).json({
        title: 'An error occurred',
        error
      });
    });
});

module.exports = router;
