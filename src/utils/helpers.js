const { createHash } = require('crypto');

exports.hash = (input) => {
  return createHash('sha256').update(input).digest('hex');
};

//Todo better random function
exports.randomInt = (seed) => {
  return Math.trunc(Math.random() * Number(seed));
};
