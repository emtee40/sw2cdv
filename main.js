#!/usr/bin/env node

'use strict';

/******************************************************************************/

// Note: you cannot use ecma6 features not offered directly by all node version from within this file,
// because this use of babel (6to5) clobbers require() and only affects future imported scripts.
require("babel/register");

/******************************************************************************/

// exports.foo = require('./src/foo');

/******************************************************************************/

if (require.main === module) {
  require('./src/cli')();
}
