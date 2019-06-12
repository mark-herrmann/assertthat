'use strict';

const fail = require('../fail');

const containing = function (actual) {
  return function (expected) {
    if (arguments.length === 0) {
      throw new Error('Expected is missing.');
    }

    if (actual.includes(expected)) {
      return;
    }

    fail('Expected %s to contain %s.', [ actual, expected ]);
  };
};

containing.negated = function (actual) {
  return function (expected) {
    if (arguments.length === 0) {
      throw new Error('Expected is missing.');
    }

    if (!actual.includes(expected)) {
      return;
    }

    fail('Expected %s not to contain %s.', [ actual, expected ]);
  };
};

module.exports = containing;