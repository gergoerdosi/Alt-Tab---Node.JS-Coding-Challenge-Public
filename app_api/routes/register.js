'use strict';

const express = require('express');
const router = express.Router();

const app = require('../../app');
const tokenHelper = require('../helpers/token');

router.post('/', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  // Validate input.
  if (!email || !password) {
    res.status(400).send();
    return;
  }

  // Check if user exists.
  try {
    let user = await app.get('mongo').collection('users').findOne({email});

    if (user) {
      res.status(400).send();
      return;
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }

  // Create token and return it.
  const token = tokenHelper.create();

  try {
    let result = await app.get('mongo').collection('users').insertOne({email, password, name, token});

    res.status(201).json({
      token
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
