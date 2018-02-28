const express = require('express');
const router = express.Router();

const Message = require('../models/message');

// get all messages from DB
router.get('/', (req, res) => {
  Message.find()
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

// add new message in DB
router.post('/', (req, res) => {
  const message = new Message({
    content: req.body.content
  });

  message.save()
    .then((result) => {
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
});

// update a message
router.patch('/:id', (req, res) => {
  Message.findById(req.params.id)
    .then((message) => {
      if (!message) {
        return res.status(500).json({
          title: 'No message found!',
          error: {message: 'Message not found!'}
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
  Message.findById(req.params.id)
    .then((message) => {
      if (!message) {
        return res.status(500).json({
          title: 'No message found!',
          error: {message: 'Message not found!'}
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
