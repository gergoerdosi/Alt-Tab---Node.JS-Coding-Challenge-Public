'use strict';

const express = require('express');
const router = express.Router();

const app = require('../../app');
const tokenHelper = require('../helpers/token');

router.get('/', async (req, res) => {
  const authorization = req.headers.authorization;

  // Check if token is specified.
  if (!authorization) {
    res.status(401).send();
    return;
  }

  const token = authorization.substr(7);

  // Get user profile.
  try {
    const user = await app.get('mongo').collection('users').findOne({
      token
    });

    res.json({
      email: user.email
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
