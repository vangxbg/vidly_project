/*** this code handles all the caught errors but only for the requests processing pipeline from express ***/

// loading the required modules
const winston = require('winston');

// logs the errors
module.exports = function(err, req, res, next){
  winston.error(err.message, err); // logging as a type error, including the meta data or stack trace

  // these are just examples of the type of logging that can be done
  // error
  // warn
  // info
  // verbose
  // debug 
  // silly

  res.status(500).send('Something failed.');
}