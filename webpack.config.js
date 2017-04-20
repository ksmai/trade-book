let config;

switch(process.env.NODE_ENV) {
  case 'test':
    config = require('./webpack.test.js');
    break;

  case 'development':
  default: // TODO
    config = require('./webpack.dev.js');
}

module.exports = config;

