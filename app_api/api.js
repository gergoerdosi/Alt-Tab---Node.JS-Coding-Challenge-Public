'use strict';

const express = require('express');
const router = express.Router();

router.use('/login', require('./routes/login'));
router.use('/login', require('./routes/logout'));
router.use('/profile', require('./routes/profile'));
router.use('/register', require('./routes/register'));

module.exports = router;
