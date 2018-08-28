// this code makes sure there is a jwtPrivateKey for generating a token

// loading the required modules
const config = require('config');

// throws an exception if no jwtPrivateKey is provided from configurations file
module.exports = function() {
  if (!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
  }
}