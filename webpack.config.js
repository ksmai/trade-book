switch(process.env.NODE_ENV) {
  case 'development':
  default: // TODO
    module.exports = require('./webpack.dev.js');
}

