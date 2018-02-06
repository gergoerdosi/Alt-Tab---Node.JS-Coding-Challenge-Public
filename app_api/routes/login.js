'use strict';

const express = require('express');
const router = express.Router();

const app = require('../../app');
const tokenHelper = require('../helpers/token');

router.post('/', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Validate input.
  if (!email || !password) {
    res.status(400).send();
    return;
  }

  // Check if user exists.
  try {
    const user = await app.get('mongo').collection('users').findOne({
      email,
      password
    });

    if (!user) {
      return res.status(404).send();
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }

  // Create token and return it.
  const token = tokenHelper.create();

  try {
    const result = app.get('mongo').collection('users').updateOne({
      email
    }, {
      '$set': {token}
    });

    res.status(200).json({
      token
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
