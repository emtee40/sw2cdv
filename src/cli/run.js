'use strict';

/******************************************************************************/

let Q = require('q');

/******************************************************************************/

exports = module.exports = function run(argv) {
  if (argv._[1] === 'chrome') {
    return require('../run').runInChrome();
  }

  return Q.reject('Not a valid target');
};

/******************************************************************************/


