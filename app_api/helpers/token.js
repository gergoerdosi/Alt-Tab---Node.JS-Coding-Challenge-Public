'use strict';

const crypto = require('crypto');

exports.create = () => {
  return crypto.randomBytes(64).toString('hex');
};
