'use strict';

const express = require('express');
const router = express.Router();

const app = require('../../app');

router.post('/', async (req, res) => {
  const authorization = req.headers.authorization;

  // Check if token is specified.
  if (!authorization) {
    res.status(401).send();
    return;
  }

  const token = authorization.substr(7);

  // Delete token.
  try {
    let user = app.get('mongo').collection('users').updateOne({
      token
    }, {
      '$set': {token: null}
    });

    res.send();
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
