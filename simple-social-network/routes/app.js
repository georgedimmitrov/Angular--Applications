var express = require('express');
var router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res, next) => {
  User.findOne({})
    .then((doc) => {
      res.render('node', { email: doc.email });
    })
    .catch((e) => {
      console.log('Error!: ', e);
    });
});

router.post('/', (req, res, next) => {
  const email = req.body.email;
  const user = new User({
    firstName: 'Max',
    lastName: 'Schwarz',
    password: 'secret',
    email
  });

  user.save();

  res.redirect(`/`);
});

module.exports = router;
