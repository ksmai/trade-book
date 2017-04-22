let config;

switch(process.env.NODE_ENV) {
  case 'test':
    config = require('./webpack.test');
    break;

  case 'production':
    config = require('./webpack.prod');
    break;

  case 'development':
  default:
    config = require('./webpack.dev');
}

module.exports = config;

