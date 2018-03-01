const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/', (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email
  });

  user.save()
    .then((result) => {
      res.status(201).json({
        message: 'User created',
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

router.post('/signin', (req, res) => {
  User.findOne({ email: req.body.email })
  .then((user) => {
    // User with given email not found -> give false message so ppl cannot figure out who is registered
    if (!user) {
      return res.status(401).json({
        title: 'Login failed!',
        error: {message: 'Invalid login credentials!'}
      });
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: 'Login failed!',
        error: {message: 'Invalid login credentials!'}
      });
    }

    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: 7200 });
    res.status(200).json({
      message: 'Successfully logged in!',
      token,
      userId: user._id
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
